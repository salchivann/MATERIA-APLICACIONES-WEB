/* ============================================
   Admin: servicios
   ============================================ */

const sesion = pedirSesion("admin");

if (sesion) {
  menu("admin", "servicios.html");

  const editando = document.getElementById("edit");
  const nombre = document.getElementById("nom");
  const profesional = document.getElementById("pro");
  const titulo = document.getElementById("tit");
  const formulario = document.getElementById("f");
  const limpiarBtn = document.getElementById("limpiar");

  function llenarProfesionales() {
    profesional.innerHTML = DB.profesionales.map(p => {
      return `<option value="${p.id}">${escapar(p.nombre)}</option>`;
    }).join("");
  }

  function pintar() {
    const cuerpo = document.getElementById("body");

    if (DB.servicios.length === 0) {
      cuerpo.innerHTML = `<tr><td colspan="4" class="vacio">No hay servicios.</td></tr>`;
      return;
    }

    cuerpo.innerHTML = DB.servicios.map(s => {
      const cantidadCitas = DB.citas.filter(c => c.servicio === s.id).length;

      return `
        <tr>
          <td>${escapar(s.nombre)}</td>
          <td>${escapar(nombrePro(s.profesional))}</td>
          <td>${cantidadCitas}</td>
          <td>
            <button class="btn-chico" onclick="editar('${s.id}')">Editar</button>
            <button class="btn-rojo btn-chico" onclick="eliminar('${s.id}')">Borrar</button>
          </td>
        </tr>`;
    }).join("");
  }

  window.editar = function (id) {
    const servicio = buscarServicio(id);
    if (!servicio) return;

    editando.value = id;
    titulo.textContent = "Editar";
    errorFormulario("");
    errorFormulario("", "error-lista");
    nombre.value = servicio.nombre;
    profesional.value = servicio.profesional;

    window.scrollTo(0, 0);
  };

  window.eliminar = function (id) {
    const servicio = buscarServicio(id);
    if (!servicio) return;

    errorFormulario("", "error-lista");

    if (DB.citas.some(c => c.servicio === id)) {
      errorFormulario("No se puede borrar: tiene citas", "error-lista");
      return;
    }

    if (!confirm("¿Borrar el servicio " + servicio.nombre + "?")) return;

    DB.servicios = DB.servicios.filter(s => s.id !== id);
    guardar();
    pintar();
    aviso("Servicio borrado", "inf");
  };

  limpiarBtn.onclick = function () {
    editando.value = "";
    titulo.textContent = "Agregar";
    errorFormulario("");
    formulario.reset();
  };

  formulario.onsubmit = function (evento) {
    evento.preventDefault();
    errorFormulario("");
    errorFormulario("", "error-lista");

    const nombreNuevo = nombre.value.trim();

    if (nombreNuevo.length < 3) {
      errorFormulario("El nombre es muy corto");
      return;
    }

    const repetido = DB.servicios.some(s => {
      if (s.nombre.toLowerCase() !== nombreNuevo.toLowerCase()) return false;
      if (!editando.value) return true;
      return s.id !== editando.value;
    });

    if (repetido) {
      errorFormulario("Ese servicio ya existe");
      return;
    }

    if (!profesional.value) {
      errorFormulario("Elige un encargado");
      return;
    }

    if (editando.value) {
      const servicio = buscarServicio(editando.value);

      if (servicio) {
        servicio.nombre = nombreNuevo;
        servicio.profesional = profesional.value;
      }

      aviso("Servicio guardado", "ok");
    } else {
      DB.servicios.push({
        id: "s" + Date.now(),
        nombre: nombreNuevo,
        profesional: profesional.value
      });

      aviso("Servicio agregado", "ok");
    }

    guardar();
    editando.value = "";
    titulo.textContent = "Agregar";
    formulario.reset();
    llenarProfesionales();
    pintar();
  };

  llenarProfesionales();
  pintar();
}
