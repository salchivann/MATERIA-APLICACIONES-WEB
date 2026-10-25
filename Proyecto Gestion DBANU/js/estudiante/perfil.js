/* ============================================
   Alumno: perfil
   ============================================ */

const sesion = pedirSesion("alumno");

if (sesion) {
  menu("alumno", "perfil.html");

  const yo = buscarAlumno(sesion.perfil);
  const formulario = document.getElementById("f");
  const nombre = document.getElementById("nom");
  const cedula = document.getElementById("ced");
  const carrera = document.getElementById("car");
  const correo = document.getElementById("mail");
  const telefono = document.getElementById("tel");

  nombre.value = yo.nombre;
  cedula.value = yo.cedula;
  carrera.value = yo.carrera + " · " + yo.semestre + " semestre";
  correo.value = yo.correo;
  telefono.value = yo.telefono;

  formulario.onsubmit = function (evento) {
    evento.preventDefault();

    if (!CORREO.test(correo.value.trim())) {
      aviso("Correo no válido", "err");
      return;
    }

    const soloNumeros = telefono.value.replace(/\D/g, "");
    if (soloNumeros.length < 7 || soloNumeros.length > 15) {
      aviso("Teléfono no válido", "err");
      return;
    }

    yo.correo = correo.value.trim();
    yo.telefono = telefono.value.trim();

    guardar();
    aviso("Datos guardados", "ok");
  };
}
