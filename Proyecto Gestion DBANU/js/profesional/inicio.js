/* ============================================
   Profesional: inicio
   ============================================ */

const sesion = pedirSesion("pro");

if (sesion) {
  menu("pro", "inicio.html");

  const yo = sesion.perfil;
  const misCitas = DB.citas.filter(c => c.profesional === yo);
  const pendientes = misCitas.filter(c => c.estado === "Pendiente");
  const atendidas = misCitas.filter(c => c.estado === "Atendida");
  const citasHoy = misCitas.filter(c => c.fecha === fechaHoy() && c.estado !== "Cancelada");

  document.getElementById("saludo").textContent = "Hola, " + nombrePro(yo);

  document.getElementById("res").innerHTML = `
    <div class="res">
      <span class="num">${citasHoy.length}</span>
      <span class="txt">Citas hoy</span>
    </div>
    <div class="res">
      <span class="num">${pendientes.length}</span>
      <span class="txt">Pendientes</span>
    </div>
    <div class="res">
      <span class="num">${atendidas.length}</span>
      <span class="txt">Atendidas</span>
    </div>`;

  const contenedor = document.getElementById("hoy");

  if (citasHoy.length === 0) {
    contenedor.innerHTML = `<p class="vacio">No tienes citas para hoy.</p>`;
  } else {
    const ordenadas = citasHoy.sort((a, b) => a.hora.localeCompare(b.hora));

    contenedor.innerHTML = `
      <div class="tabla">
        <table>
          <thead>
            <tr><th>Hora</th><th>Paciente</th><th>Motivo</th><th>Estado</th></tr>
          </thead>
          <tbody>
            ${ordenadas.map(c => `
              <tr>
                <td>${escapar(c.hora)}</td>
                <td>${escapar(nombreAlumno(c.alumno))}</td>
                <td>${escapar(c.motivo)}</td>
                <td><span class="estado ${estadoClase(c.estado)}">${c.estado}</span></td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div>`;
  }
}
