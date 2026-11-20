/* ============================================
   Profesional: mis citas
   ============================================ */

const sesion = pedirSesion("pro");

if (sesion) {
  menu("pro", "citas.html");

  const yo = sesion.perfil;

  function pintar() {
    const citas = DB.citas
      .filter(c => c.profesional === yo)
      .sort((a, b) => (b.fecha + b.hora).localeCompare(a.fecha + a.hora));

    const cuerpo = document.getElementById("body");

    if (citas.length === 0) {
      cuerpo.innerHTML = `<tr><td colspan="7" class="vacio">No tienes citas.</td></tr>`;
      return;
    }

    cuerpo.innerHTML = citas.map(c => {
      let acciones = "";

      if (c.estado === "Pendiente") {
        acciones = `
          <button class="btn-chico" onclick="atender(${c.id})">Atender</button>
          <button class="btn-rojo btn-chico" onclick="cancelar(${c.id})">Cancelar</button>`;
      }

      return `
        <tr>
          <td>${fechaBonita(c.fecha)}</td>
          <td>${escapar(c.hora)}</td>
          <td>${escapar(nombreAlumno(c.alumno))}</td>
          <td>${escapar(c.motivo)}</td>
          <td><span class="estado ${estadoClase(c.estado)}">${c.estado}</span></td>
          <td>${c.nota ? escapar(c.nota) : "-"}</td>
          <td>${acciones}</td>
        </tr>`;
    }).join("");
  }

  window.atender = function (id) {
    const cita = DB.citas.find(c => c.id == id);

    if (!cita || cita.profesional !== yo || cita.estado !== "Pendiente") return;

    const nota = prompt("Nota de atención (opcional):");
    if (nota === null) return;

    cita.estado = "Atendida";
    cita.nota = nota.trim();
    guardar();
    pintar();
    aviso("Cita atendida", "ok");
  };

  window.cancelar = function (id) {
    const cita = DB.citas.find(c => c.id == id);

    if (!cita || cita.profesional !== yo || cita.estado !== "Pendiente") return;
    if (!confirm("¿Cancelar esta cita?")) return;

    cita.estado = "Cancelada";
    guardar();
    pintar();
    aviso("Cita cancelada", "inf");
  };

  pintar();
}
