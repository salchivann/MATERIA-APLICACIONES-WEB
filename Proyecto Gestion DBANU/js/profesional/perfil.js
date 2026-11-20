/* ============================================
   Profesional: perfil y citas agendadas
   ============================================ */

const sesion = pedirSesion("pro");

if (sesion) {
  menu("pro", "perfil.html");

  const yo = buscarPro(sesion.perfil);
  const formulario = document.getElementById("f");
  const nombre = document.getElementById("nom");
  const area = document.getElementById("area");
  const correo = document.getElementById("mail");

  nombre.value = yo.nombre;
  area.value = yo.area;
  correo.value = yo.correo;

  formulario.onsubmit = function (evento) {
    evento.preventDefault();

    if (!CORREO.test(correo.value.trim())) {
      aviso("Correo no válido", "err");
      return;
    }

    yo.correo = correo.value.trim();
    guardar();
    aviso("Datos guardados", "ok");
  };

  /* Citas que los alumnos agendaron con este profesional */
  function pintarCitas() {
    const citas = DB.citas
      .filter(c => c.profesional === yo.id)
      .sort((a, b) => (b.fecha + b.hora).localeCompare(a.fecha + a.hora));

    const cuerpo = document.getElementById("citas");

    if (citas.length === 0) {
      cuerpo.innerHTML = `<tr><td colspan="5" class="vacio">No tienes citas agendadas.</td></tr>`;
      return;
    }

    cuerpo.innerHTML = citas.map(c => `
      <tr>
        <td>${fechaBonita(c.fecha)}</td>
        <td>${escapar(c.hora)}</td>
        <td>${escapar(nombreAlumno(c.alumno))}</td>
        <td>${escapar(nombreServicio(c.servicio))}</td>
        <td><span class="estado ${estadoClase(c.estado)}">${c.estado}</span></td>
      </tr>`).join("");
  }

  pintarCitas();
}
