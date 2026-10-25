/* ============================================
   Admin: becas y postulaciones
   ============================================ */

const sesion = pedirSesion("admin");

if (sesion) {
  menu("admin", "becas.html");

  function pintar() {
    /* Tabla de becas */
    document.getElementById("b").innerHTML = DB.becas.map(beca => {
      const cantidad = DB.postulaciones.filter(p => p.beca === beca.id).length;
      const clase = beca.estado === "Abierta" ? "e-ok" : "e-no";

      return `
        <tr>
          <td>${escapar(beca.nombre)}</td>
          <td>${escapar(beca.cobertura)}</td>
          <td>${beca.cupos}</td>
          <td><span class="estado ${clase}">${escapar(beca.estado)}</span></td>
          <td>${cantidad}</td>
        </tr>`;
    }).join("");

    /* Lista de postulaciones */
    const contenedor = document.getElementById("p");

    if (DB.postulaciones.length === 0) {
      contenedor.innerHTML = `<p class="vacio">No hay postulaciones.</p>`;
      return;
    }

    const ordenadas = DB.postulaciones.slice().sort((a, b) => {
      return b.fecha.localeCompare(a.fecha);
    });

    contenedor.innerHTML = ordenadas.map(p => {
      let botones = "";

      if (p.estado === "En proceso") {
        botones = `
          <button class="btn-chico" onclick="resolver(${p.id}, 'Aprobada')">Aprobar</button>
          <button class="btn-rojo btn-chico" onclick="resolver(${p.id}, 'Rechazada')">Rechazar</button>`;
      }

      let clase = "e-proc";

      if (p.estado === "Aprobada") clase = "e-ok";
      if (p.estado === "Rechazada") clase = "e-no";

      return `
        <div class="item">
          <div class="mini">
            <strong>${escapar(nombreAlumno(p.alumno))}</strong>
            · ${escapar(nombreBeca(p.beca))}
            · ${fechaBonita(p.fecha)}
          </div>
          <p>${escapar(p.motivo)}</p>
          ${p.documentos && p.documentos.length ? `<div class="mini">${p.documentos.length} documentos adjuntos</div>` : ""}
          <div>
            <span class="estado ${clase}">${escapar(p.estado)}</span>
            ${botones}
          </div>
        </div>`;
    }).join("");
  }

  window.resolver = function (id, estado) {
    const postulacion = DB.postulaciones.find(p => p.id == id);

    if (!postulacion) return;

    postulacion.estado = estado;
    guardar();
    pintar();
    aviso("Postulación " + estado.toLowerCase(), "inf");
  };

  pintar();
}
