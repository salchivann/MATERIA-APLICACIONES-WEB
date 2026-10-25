/* ============================================
   Profesional: pacientes
   ============================================ */

const sesion = pedirSesion("pro");

if (sesion) {
  menu("pro", "pacientes.html");

  const yo = sesion.perfil;
  const formulario = document.getElementById("f");
  const nombre = document.getElementById("nom");
  const cedula = document.getElementById("ced");
  const carrera = document.getElementById("car");
  const semestre = document.getElementById("sem");
  const correo = document.getElementById("mail");
  const telefono = document.getElementById("tel");
  const cuerpo = document.getElementById("body");
  const buscar = document.getElementById("buscar");

  /* Pinta la lista de pacientes del profesional */
  function pintar() {
    const misCitas = DB.citas.filter(c => c.profesional === yo);
    const ids = [];
    const texto = buscar.value.trim().toLowerCase();

    /* Pacientes que ya tienen citas conmigo */
    misCitas.forEach(c => {
      if (ids.indexOf(c.alumno) === -1) {
        ids.push(c.alumno);
      }
    });

    /* Pacientes que agregué manualmente */
    DB.pacientes.forEach(p => {
      if (p.profesional === yo && ids.indexOf(p.alumno) === -1) {
        ids.push(p.alumno);
      }
    });

    let lista = ids.map(id => {
      const alumno = buscarAlumno(id);

      if (!alumno) return null;

      const citasAlumno = misCitas.filter(c => c.alumno === id);
      const atendidas = citasAlumno.filter(c => c.estado === "Atendida");
      const ultima = atendidas.slice().sort((a, b) => b.fecha.localeCompare(a.fecha))[0];

      return {
        alumno: alumno,
        total: citasAlumno.length,
        ultima: ultima ? fechaBonita(ultima.fecha) : "Sin atención"
      };
    }).filter(item => item !== null);

    /* Buscar por nombre o cédula */
    if (texto) {
      lista = lista.filter(item =>
        (item.alumno.nombre || "").toLowerCase().indexOf(texto) !== -1 ||
        (item.alumno.cedula || "").toLowerCase().indexOf(texto) !== -1
      );
    }

    lista.sort((a, b) => a.alumno.nombre.localeCompare(b.alumno.nombre));

    if (lista.length === 0) {
      cuerpo.innerHTML = `<tr><td colspan="7" class="vacio">${texto ? "No hay pacientes que coincidan." : "Aún no tienes pacientes."}</td></tr>`;
      return;
    }

    cuerpo.innerHTML = lista.map(item => `
      <tr>
        <td>${escapar(item.alumno.nombre)}</td>
        <td>${escapar(item.alumno.cedula)}</td>
        <td>${escapar(item.alumno.carrera)}</td>
        <td>${escapar(item.alumno.correo)}</td>
        <td>${escapar(item.alumno.telefono)}</td>
        <td>${item.total}</td>
        <td>${escapar(item.ultima)}</td>
      </tr>`).join("");
  }

  /* Agregar un paciente nuevo */
  formulario.onsubmit = function (evento) {
    evento.preventDefault();

    const textoNombre = nombre.value.trim();
    const textoCedula = cedula.value.trim();
    const textoCorreo = correo.value.trim();

    if (textoNombre.length < 4) {
      aviso("Escribe nombre y apellido", "err");
      return;
    }

    if (!CORREO.test(textoCorreo)) {
      aviso("Correo no válido", "err");
      return;
    }

    const correoRepetido = DB.alumnos.some(a =>
      a.correo.toLowerCase() === textoCorreo.toLowerCase()
    );

    if (correoRepetido) {
      aviso("Ese correo ya está registrado", "err");
      return;
    }

    const cedulaRepetida = textoCedula !== "" && DB.alumnos.some(a =>
      a.cedula === textoCedula
    );

    if (cedulaRepetida) {
      aviso("Esa cédula ya está registrada", "err");
      return;
    }

    const id = "a" + Date.now();

    DB.alumnos.push({
      id: id,
      nombre: textoNombre,
      cedula: textoCedula || "0000000000",
      carrera: carrera.value.trim() || "Por registrar",
      semestre: semestre.value,
      correo: textoCorreo,
      telefono: telefono.value.trim()
    });

    DB.pacientes.push({
      profesional: yo,
      alumno: id
    });

    guardar();
    formulario.reset();
    pintar();
    aviso("Paciente agregado", "ok");
  };

  buscar.addEventListener("input", pintar);

  pintar();
}
