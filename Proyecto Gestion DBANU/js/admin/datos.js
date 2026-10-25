/* ============================================
   Admin: respaldo de datos en JSON
   ============================================ */

const sesion = pedirSesion("admin");

if (sesion) {
  menu("admin", "datos.html");

  const resumen = document.getElementById("res");
  const archivo = document.getElementById("archivo");
  const estado = document.getElementById("estado");

  function pintarResumen() {
    resumen.innerHTML = `
      <div class="res">
        <span class="num">${DB.alumnos.length}</span>
        <span class="txt">Alumnos</span>
      </div>
      <div class="res">
        <span class="num">${DB.profesionales.length}</span>
        <span class="txt">Profesionales</span>
      </div>
      <div class="res">
        <span class="num">${DB.cuentas.length}</span>
        <span class="txt">Cuentas</span>
      </div>
      <div class="res">
        <span class="num">${DB.citas.length}</span>
        <span class="txt">Citas</span>
      </div>`;
  }

  /* Descargar todo el contenido de DB como archivo JSON */
  document.getElementById("bajar").onclick = function () {
    const texto = JSON.stringify(DB, null, 2);
    const blob = new Blob([texto], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const enlace = document.createElement("a");
    enlace.href = url;
    enlace.download = "dbanu_datos.json";
    enlace.click();

    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000);

    aviso("Respaldo descargado", "ok");
  };

  /* Leer un archivo JSON y reemplazar los datos actuales */
  archivo.onchange = function () {
    const file = archivo.files[0];
    errorFormulario("", "error-datos");

    if (!file) return;

    const lector = new FileReader();

    lector.onload = function () {
      try {
        const datos = JSON.parse(lector.result);

        if (
          !Array.isArray(datos.servicios) ||
          !Array.isArray(datos.profesionales) ||
          !Array.isArray(datos.alumnos) ||
          !Array.isArray(datos.cuentas) ||
          !Array.isArray(datos.citas)
        ) {
          errorFormulario("Ese archivo no es un respaldo de DBANU", "error-datos");
          return;
        }

        const tieneAdmin = datos.cuentas.some(c => c.rol === "admin");

        if (!tieneAdmin) {
          errorFormulario("El archivo no tiene una cuenta de administrador", "error-datos");
          return;
        }

        if (!Array.isArray(datos.mensajes)) datos.mensajes = [];
        if (!Array.isArray(datos.avisos)) datos.avisos = [];
        if (!Array.isArray(datos.becas)) datos.becas = [];
        if (!Array.isArray(datos.postulaciones)) datos.postulaciones = [];
        if (!Array.isArray(datos.nivelacion)) datos.nivelacion = [];
        if (!Array.isArray(datos.pacientes)) datos.pacientes = [];

        DB = datos;
        guardar();
        pintarResumen();
        errorFormulario("", "error-datos");
        estado.textContent = "Datos cargados correctamente.";
        aviso("Datos cargados", "ok");
      } catch (error) {
        errorFormulario("No se pudo leer el archivo", "error-datos");
      }
    };

    lector.readAsText(file);
  };

  /* Volver a los datos de ejemplo */
  document.getElementById("reset").onclick = function () {
    if (!confirm("¿Borrar todos los datos y volver a los de ejemplo?")) return;

    reiniciar();
    pintarResumen();
    errorFormulario("", "error-datos");
    estado.textContent = "";
    aviso("Datos restablecidos", "inf");
  };

  pintarResumen();
}
