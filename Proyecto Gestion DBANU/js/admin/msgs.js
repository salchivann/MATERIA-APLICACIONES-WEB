/* ============================================
   Admin: buzón de avisos
   ============================================ */

const sesion = pedirSesion("admin");

if (sesion) {
  menu("admin", "msgs.html");

  const lista = document.getElementById("lista");
  const contador = document.getElementById("cnt");

  function pintar() {
    const avisos = DB.avisos.slice().sort((a, b) => {
      if (a.fecha === b.fecha) return b.id - a.id;
      return b.fecha.localeCompare(a.fecha);
    });

    const sinLeer = avisos.filter(a => !a.leido).length;

    if (sinLeer === 0) {
      contador.textContent = "";
    } else {
      contador.textContent = "(" + sinLeer + " sin leer)";
    }

    if (avisos.length === 0) {
      lista.innerHTML = `<p class="vacio">No hay avisos.</p>`;
      return;
    }

    lista.innerHTML = avisos.map(a => `
      <div class="msg ${a.leido ? "" : "nuevo"}" data-id="${a.id}">
        <span class="punto"></span>
        <div class="avatar">${iniciales(a.de)}</div>
        <div class="msg-cuerpo">
          <div class="msg-top">
            <span class="msg-rem">${escapar(a.de)}</span>
            <span class="msg-fecha">${fechaBonita(a.fecha)}</span>
          </div>
          <div class="msg-asunto">${escapar(a.asunto)}</div>
          <div class="msg-txt">${escapar(a.texto)}</div>
        </div>
      </div>`).join("");

    lista.querySelectorAll(".msg").forEach(fila => {
      fila.onclick = function () {
        const aviso = DB.avisos.find(x => x.id == fila.dataset.id);

        if (!aviso || aviso.leido) return;

        aviso.leido = true;
        guardar();
        pintar();
      };
    });
  }

  pintar();
}
