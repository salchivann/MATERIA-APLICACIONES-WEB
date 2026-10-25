/* ============================================
   Alumno: agendar cita
   ============================================ */

const sesion = pedirSesion("alumno");

if (sesion) {
  menu("alumno", "agendar.html");

  const yo = sesion.perfil;
  const servicio = document.getElementById("ser");
  const fecha = document.getElementById("fec");
  const hora = document.getElementById("hor");
  const motivo = document.getElementById("mot");

  const HORAS = ["08:00", "08:45", "09:30", "10:15", "11:00", "11:45", "14:00", "14:45", "15:30", "16:15"];

  /* Llenar los desplegables */
  DB.servicios.forEach(s => {
    servicio.innerHTML += `<option value="${s.id}">${escapar(s.nombre)}</option>`;
  });

  HORAS.forEach(h => {
    hora.innerHTML += `<option value="${h}">${h}</option>`;
  });

  fecha.min = fechaHoy();

  function marcarError(campo, texto) {
    document.getElementById("e-" + campo.id).textContent = texto || "";
  }

  [servicio, fecha, hora, motivo].forEach(campo => {
    campo.oninput = () => marcarError(campo, "");
    campo.onchange = () => marcarError(campo, "");
  });

  document.getElementById("f").onsubmit = function (evento) {
    evento.preventDefault();

    marcarError(servicio, "");
    marcarError(fecha, "");
    marcarError(hora, "");
    marcarError(motivo, "");

    let hayError = false;

    if (!servicio.value) {
      marcarError(servicio, "Elige un servicio");
      hayError = true;
    }

    if (!fecha.value) {
      marcarError(fecha, "Elige una fecha");
      hayError = true;
    }

    if (fecha.value && fecha.value < fechaHoy()) {
      marcarError(fecha, "La fecha ya pasó");
      hayError = true;
    }

    if (!hora.value) {
      marcarError(hora, "Elige una hora");
      hayError = true;
    }

    if (motivo.value.trim().length < 5) {
      marcarError(motivo, "Escribe al menos 5 letras");
      hayError = true;
    }

    if (hayError) {
      aviso("Revisa los campos", "err");
      return;
    }

    const profesional = buscarServicio(servicio.value).profesional;

    const ocupada = DB.citas.some(c =>
      c.profesional === profesional &&
      c.fecha === fecha.value &&
      c.hora === hora.value &&
      c.estado !== "Cancelada"
    );

    if (ocupada) {
      marcarError(hora, "Esa hora ya está ocupada");
      aviso("Revisa los campos", "err");
      return;
    }

    DB.citas.push({
      id: nuevoId(DB.citas),
      alumno: yo,
      servicio: servicio.value,
      profesional: profesional,
      fecha: fecha.value,
      hora: hora.value,
      motivo: motivo.value.trim(),
      estado: "Pendiente",
      nota: ""
    });

    guardar();
    aviso("Cita agendada", "ok");

    setTimeout(function () {
      location.href = "citas.html";
    }, 400);
  };
}
