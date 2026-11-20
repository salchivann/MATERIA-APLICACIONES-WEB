/* ============================================
   Alumno: nivelación (notas finales)
   ============================================ */

const sesion = pedirSesion("alumno");

if (sesion) {
  menu("alumno", "nivelacion.html");

  const yo = sesion.perfil;
  const notas = DB.nivelacion
    .filter(n => n.alumno === yo)
    .sort((a, b) => {
      if (a.periodo === b.periodo) return a.materia.localeCompare(b.materia);
      return b.periodo.localeCompare(a.periodo);
    });

  const contenedor = document.getElementById("notas");

  if (notas.length === 0) {
    contenedor.innerHTML = `<p class="vacio">No hay notas registradas para tu cuenta.</p>`;
  } else {
    contenedor.innerHTML = `
      <div class="tabla">
        <table>
          <thead>
            <tr><th>Periodo lectivo</th><th>Materia</th><th>Nota final</th></tr>
          </thead>
          <tbody>
            ${notas.map(n => `
              <tr>
                <td>${escapar(n.periodo)}</td>
                <td>${escapar(n.materia)}</td>
                <td>${Number(n.notaFinal).toFixed(1)}</td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div>`;
  }
}
