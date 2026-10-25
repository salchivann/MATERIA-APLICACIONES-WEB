/* ============================================
   Profesional: bandeja de chats
   ============================================ */

const sesion = pedirSesion("pro");

if (sesion) {
  menu("pro", "msgs.html");

  const yo = sesion.perfil;
  const panel = document.getElementById("panel");
  const contador = document.getElementById("cnt");

  /* Alumnos con los que puedo chatear */
  function contactos() {
    const ids = [];

    DB.citas.forEach(c => {
      if (c.profesional === yo && ids.indexOf(c.alumno) === -1) {
        ids.push(c.alumno);
      }
    });

    DB.mensajes.forEach(m => {
      if (m.profesional === yo && ids.indexOf(m.alumno) === -1) {
        ids.push(m.alumno);
      }
    });

    return ids;
  }

  function mensajesDe(alumno) {
    return DB.mensajes
      .filter(m => m.profesional === yo && m.alumno === alumno)
      .sort((a, b) => {
        if (a.fecha === b.fecha) return a.id - b.id;
        return a.fecha.localeCompare(b.fecha);
      });
  }

  function noLeidosDe(alumno) {
    return DB.mensajes.filter(m =>
      m.profesional === yo &&
      m.alumno === alumno &&
      m.de === "alumno" &&
      !m.leido
    ).length;
  }

  function actualizarContador() {
    const total = DB.mensajes.filter(m =>
      m.profesional === yo && m.de === "alumno" && !m.leido
    ).length;

    contador.textContent = total === 0 ? "" : "(" + total + " sin leer)";
  }

  /* Lista de conversaciones */
  function pintarBandeja() {
    const ids = contactos();

    if (ids.length === 0) {
      panel.innerHTML = `<p class="vacio">No tienes pacientes para chatear.</p>`;
      return;
    }

    panel.innerHTML = `<div class="bandeja">` + ids.map(id => {
      const mensajes = mensajesDe(id);
      const ultimo = mensajes[mensajes.length - 1];
      const noLeidos = noLeidosDe(id);

      const vista = ultimo ? escapar(ultimo.texto) : "Sin mensajes";
      const fecha = ultimo ? fechaBonita(ultimo.fecha) : "";
      const globo = noLeidos > 0 ? `<span class="noleidos">${noLeidos}</span>` : "";

      return `
        <div class="chat-fila" data-id="${id}">
          <div class="avatar">${iniciales(nombreAlumno(id))}</div>
          <div class="datos">
            <div class="nombre">${escapar(nombreAlumno(id))}</div>
            <div class="ultimo">${vista}</div>
          </div>
          <div class="fecha">${fecha}</div>
          ${globo}
        </div>`;
    }).join("") + `</div>`;

    panel.querySelectorAll(".chat-fila").forEach(fila => {
      fila.onclick = function () {
        abrirChat(fila.dataset.id);
      };
    });
  }

  /* Conversación abierta */
  function abrirChat(alumno) {
    /* Marco como leídos los mensajes que me envió */
    DB.mensajes.forEach(m => {
      if (m.profesional === yo && m.alumno === alumno && m.de === "alumno") {
        m.leido = true;
      }
    });
    guardar();
    actualizarContador();

    const mensajes = mensajesDe(alumno);
    let burbujas = "";

    if (mensajes.length === 0) {
      burbujas = `<p class="vacio">Aún no hay mensajes. Escribe el primero.</p>`;
    } else {
      burbujas = mensajes.map(m => {
        const mio = m.de === "pro";

        return `
          <div class="burbuja ${mio ? "burbuja-yo" : "burbuja-otro"}">
            ${escapar(m.texto)}
            <span class="fecha-mini">${fechaBonita(m.fecha)}</span>
          </div>`;
      }).join("");
    }

    panel.innerHTML = `
      <div class="chat-abierto">
        <div class="chat-cabecera">
          <button class="btn-gris btn-chico" id="volver">← Volver</button>
          <strong>${escapar(nombreAlumno(alumno))}</strong>
        </div>
        <div class="burbujas">${burbujas}</div>
        <div class="chat-respuesta">
          <input id="respuesta" placeholder="Escribe tu respuesta...">
          <button class="btn-chico" id="enviar">Enviar</button>
        </div>
      </div>`;

    const caja = document.getElementById("respuesta");

    caja.focus();
    caja.onkeydown = function (evento) {
      if (evento.key === "Enter") enviar();
    };

    document.getElementById("enviar").onclick = enviar;
    document.getElementById("volver").onclick = function () {
      pintarBandeja();
      actualizarContador();
    };

    function enviar() {
      const texto = caja.value.trim();

      if (!texto) {
        aviso("Escribe un mensaje", "err");
        return;
      }

      const mensajes = mensajesDe(alumno);
      const ultimo = mensajes[mensajes.length - 1];

      DB.mensajes.push({
        id: nuevoId(DB.mensajes),
        de: "pro",
        alumno: alumno,
        profesional: yo,
        asunto: ultimo ? ultimo.asunto : "Nuevo mensaje",
        texto: texto,
        fecha: fechaHoy(),
        leido: false
      });

      guardar();
      abrirChat(alumno);
    }
  }

  actualizarContador();
  pintarBandeja();
}
