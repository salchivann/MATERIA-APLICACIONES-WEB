/* ============================================
   Alumno: becas
   ============================================ */

const sesion = pedirSesion("alumno");

if (sesion) {
  menu("alumno", "becas.html");

  const yo = sesion.perfil;
  let becaElegida = null;

  function pintar() {
    const misPostulaciones = DB.postulaciones.filter(p => p.alumno === yo);

    /* Becas disponibles */
    document.getElementById("lista").innerHTML = DB.becas.map(beca => {
      const yaPostule = misPostulaciones.some(p => p.beca === beca.id);
      let boton = "";

      if (yaPostule) {
        boton = `<span class="estado e-proc">Ya postulado</span>`;
      } else if (beca.estado !== "Abierta") {
        boton = `<span class="estado e-no">Cerrada</span>`;
      } else {
        boton = `<button class="btn-chico" onclick="abrirPostulacion('${beca.id}')">Postular</button>`;
      }

      return `
        <div class="item">
          <div class="mini">${escapar(beca.cobertura)} · ${beca.cupos} cupos · ${escapar(beca.estado)}</div>
          <strong>${escapar(beca.nombre)}</strong>
          <div style="margin-top:5px">${boton}</div>
        </div>`;
    }).join("");

    /* Mis postulaciones */
    const contenedor = document.getElementById("mis");

    if (misPostulaciones.length === 0) {
      contenedor.innerHTML = `<p class="vacio">Aún no te has postulado.</p>`;
    } else {
      contenedor.innerHTML = misPostulaciones.map(p => `
        <div class="item">
          <div class="mini">Postulada el ${fechaBonita(p.fecha)}</div>
          <strong>${escapar(nombreBeca(p.beca))}</strong>
          <p>${escapar(p.motivo)}</p>
          ${p.documentos && p.documentos.length ? `<div class="mini">${p.documentos.length} documentos adjuntos</div>` : ""}
          <span class="estado e-proc">${escapar(p.estado)}</span>
        </div>`).join("");
    }
  }

  /* Abre el formulario de postulación */
  window.abrirPostulacion = function (becaId) {
    const beca = buscarBeca(becaId);

    if (!beca || beca.estado !== "Abierta") return;
    if (DB.postulaciones.some(p => p.alumno === yo && p.beca === becaId)) return;

    becaElegida = beca;

    document.getElementById("m-beca-nombre").textContent = beca.nombre;
    document.getElementById("m-beca-detalle").textContent = beca.cobertura + " · " + beca.cupos + " cupos";
    document.getElementById("m-motivo").value = "";
    document.getElementById("e-motivo").textContent = "";
    document.getElementById("e-docs").textContent = "";

    document.querySelectorAll(".doc-check").forEach(casilla => {
      casilla.checked = false;
    });

    document.getElementById("modal-postular").classList.add("abierto");
    document.body.style.overflow = "hidden";
    document.getElementById("m-motivo").focus();
  };

  /* Cierra el formulario */
  window.cerrarPostulacion = function () {
    document.getElementById("modal-postular").classList.remove("abierto");
    document.body.style.overflow = "";
    becaElegida = null;
  };

  /* Envía la postulación */
  document.getElementById("f-postular").addEventListener("submit", function (evento) {
    evento.preventDefault();

    if (!becaElegida) return;

    const motivo = document.getElementById("m-motivo").value.trim();
    const casillas = document.querySelectorAll(".doc-check");
    let todasMarcadas = true;

    casillas.forEach(casilla => {
      if (!casilla.checked) todasMarcadas = false;
    });

    document.getElementById("e-motivo").textContent = "";
    document.getElementById("e-docs").textContent = "";

    if (motivo.length < 5) {
      document.getElementById("e-motivo").textContent = "Escribe un motivo de al menos 5 letras.";
      document.getElementById("m-motivo").focus();
      return;
    }

    if (!todasMarcadas) {
      document.getElementById("e-docs").textContent = "Marca todos los documentos que adjuntas.";
      return;
    }

    const becaId = becaElegida.id;

    if (DB.postulaciones.some(p => p.alumno === yo && p.beca === becaId)) {
      aviso("Ya te postulaste a esta beca", "err");
      cerrarPostulacion();
      pintar();
      return;
    }

    const documentos = [];

    casillas.forEach(casilla => {
      documentos.push(casilla.value);
    });

    DB.postulaciones.push({
      id: nuevoId(DB.postulaciones),
      alumno: yo,
      beca: becaId,
      motivo: motivo,
      documentos: documentos,
      estado: "En proceso",
      fecha: fechaHoy()
    });

    guardar();
    cerrarPostulacion();
    pintar();
    aviso("Postulación enviada", "ok");
  });

  /* Cerrar al hacer clic fuera de la ventana */
  document.getElementById("modal-postular").addEventListener("click", function (evento) {
    if (evento.target === this) cerrarPostulacion();
  });

  /* Cerrar con la tecla Escape */
  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape" && document.getElementById("modal-postular").classList.contains("abierto")) {
      cerrarPostulacion();
    }
  });

  pintar();
}
