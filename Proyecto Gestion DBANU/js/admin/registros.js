

const sesion = pedirSesion("admin");

if (sesion) {
  menu("admin", "registros.html");

  const filtro = document.getElementById("f");
  const filtroServicio = document.getElementById("s");

  filtroServicio.innerHTML = `<option value="">Todos</option>` +
    DB.servicios.map(s => `<option value="${s.id}">${escapar(s.nombre)}</option>`).join("");

  function pintar() {
    const res = document.getElementById("res");
    res.innerHTML = `
      <div class="res">
        <span class="num">${DB.citas.length}</span>
        <span class="txt">Citas</span>
      </div>
      <div class="res">
        <span class="num">${DB.citas.filter(c => c.estado === "Pendiente").length}</span>
        <span class="txt">Pendientes</span>
      </div>
      <div class="res">
        <span class="num">${DB.citas.filter(c => c.estado === "Atendida").length}</span>
        <span class="txt">Atendidas</span>
      </div>
      <div class="res">
        <span class="num">${DB.alumnos.length}</span>
        <span class="txt">Alumnos</span>
      </div>`;

    let citas = DB.citas.slice();

    if (filtro.value) {
      citas = citas.filter(c => c.estado === filtro.value);
    }

    if (filtroServicio.value) {
      citas = citas.filter(c => c.servicio === filtroServicio.value);
    }

    citas.sort((a, b) => (b.fecha + b.hora).localeCompare(a.fecha + a.hora));

    const cuerpo = document.getElementById("body");

    if (citas.length === 0) {
      cuerpo.innerHTML = `<tr><td colspan="6" class="vacio">No hay citas.</td></tr>`;
      return;
    }

    cuerpo.innerHTML = citas.map(c => `
      <tr>
        <td>${fechaBonita(c.fecha)}</td>
        <td>${escapar(c.hora)}</td>
        <td>${escapar(nombreAlumno(c.alumno))}</td>
        <td>${escapar(nombreServicio(c.servicio))}</td>
        <td>${escapar(nombrePro(c.profesional))}</td>
        <td><span class="estado ${estadoClase(c.estado)}">${c.estado}</span></td>
      </tr>`).join("");
  }

  filtro.onchange = pintar;
  filtroServicio.onchange = pintar;

  pintar();
}
