/* ============================================
   Alumno: inicio
   ============================================ */

const sesion = pedirSesion("alumno");

if (sesion) {
  menu("alumno", "inicio.html");

  const yo = sesion.perfil;
  const misCitas = DB.citas.filter(c => c.alumno === yo);
  const pendientes = misCitas.filter(c => c.estado === "Pendiente");
  const atendidas = misCitas.filter(c => c.estado === "Atendida");
  const postulaciones = DB.postulaciones.filter(p => p.alumno === yo);

  document.getElementById("saludo").textContent = "Hola, " + nombreAlumno(yo);

  document.getElementById("res").innerHTML = `
    <div class="res">
      <span class="num">${pendientes.length}</span>
      <span class="txt">Pendientes</span>
    </div>
    <div class="res">
      <span class="num">${atendidas.length}</span>
      <span class="txt">Atendidas</span>
    </div>
    <div class="res">
      <span class="num">${postulaciones.length}</span>
      <span class="txt">Postulaciones</span>
    </div>`;

  const proximas = pendientes
    .filter(c => c.fecha >= fechaHoy())
    .sort((a, b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora));

  const contenedor = document.getElementById("prox");

  if (proximas.length === 0) {
    contenedor.innerHTML = `<p class="vacio">No tienes citas próximas.</p>`;
  } else {
    contenedor.innerHTML = `
      <div class="tabla">
        <table>
          <thead>
            <tr><th>Fecha</th><th>Hora</th><th>Servicio</th><th>Estado</th></tr>
          </thead>
          <tbody>
            ${proximas.map(c => `
              <tr>
                <td>${fechaBonita(c.fecha)}</td>
                <td>${escapar(c.hora)}</td>
                <td>${escapar(nombreServicio(c.servicio))}</td>
                <td><span class="estado e-proc">${c.estado}</span></td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div>`;
  }
}
