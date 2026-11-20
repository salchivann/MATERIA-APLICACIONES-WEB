/* ============================================
   Alumno: mis citas
   ============================================ */

const sesion = pedirSesion("alumno");

if (sesion) {
  menu("alumno", "citas.html");

  const yo = sesion.perfil;

  function pintar() {
    const citas = DB.citas
      .filter(c => c.alumno === yo)
      .sort((a, b) => (b.fecha + b.hora).localeCompare(a.fecha + a.hora));

    const cuerpo = document.getElementById("body");

    if (citas.length === 0) {
      cuerpo.innerHTML = `<tr><td colspan="7" class="vacio">No tienes citas.</td></tr>`;
      return;
    }

    cuerpo.innerHTML = citas.map(c => {
      const boton = c.estado === "Pendiente"
        ? `<button class="btn-rojo btn-chico" onclick="cancelar(${c.id})">Cancelar</button>`
        : "";

      return `
        <tr>
          <td>${fechaBonita(c.fecha)}</td>
          <td>${escapar(c.hora)}</td>
          <td>${escapar(nombreServicio(c.servicio))}</td>
          <td>${escapar(nombrePro(c.profesional))}</td>
          <td>${escapar(c.motivo)}</td>
          <td><span class="estado ${estadoClase(c.estado)}">${c.estado}</span></td>
          <td>${boton}</td>
        </tr>`;
    }).join("");
  }

  window.cancelar = function (id) {
    const cita = DB.citas.find(c => c.id == id);

    if (!cita || cita.alumno !== yo || cita.estado !== "Pendiente") return;
    if (!confirm("¿Cancelar esta cita?")) return;

    cita.estado = "Cancelada";
    guardar();
    pintar();
    aviso("Cita cancelada", "inf");
  };

  pintar();
}
