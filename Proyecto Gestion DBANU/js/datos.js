/* ============================================
   Datos de ejemplo
   ============================================ */

const SERVICIOS = [
  { id: "med", nombre: "Medicina General", profesional: "marta" },
  { id: "fisio", nombre: "Fisioterapia", profesional: "luis" },
  { id: "nutri", nombre: "Nutrición", profesional: "marta" },
  { id: "psico", nombre: "Psicología", profesional: "andrea" },
  { id: "tsocial", nombre: "Trabajo Social", profesional: "luis" },
  { id: "cdi", nombre: "CDI Infantil", profesional: "marta" },
  { id: "becasayu", nombre: "Becas y ayudas", profesional: "luis" },
  { id: "gim", nombre: "Gimnasio", profesional: "jorge" }
];

const PROFESIONALES = [
  { id: "andrea", nombre: "Lic. Andrea Paz", area: "Psicología", correo: "andrea@uleam.edu.ec", estado: "Activo" },
  { id: "luis", nombre: "Lic. Luis Mero", area: "Trabajo Social / Fisioterapia / Becas y ayudas", correo: "luis@uleam.edu.ec", estado: "Activo" },
  { id: "marta", nombre: "Dra. Marta Cedeño", area: "Medicina General / Nutrición / CDI Infantil", correo: "marta@uleam.edu.ec", estado: "Activo" },
  { id: "jorge", nombre: "Lic. Jorge Bravo", area: "Gimnasio", correo: "jorge@uleam.edu.ec", estado: "Activo" }
];

const ALUMNOS = [
  {
    id: "camila",
    nombre: "Camila Vega Ramírez",
    cedula: "4455667788",
    carrera: "Arquitectura",
    semestre: "2do",
    correo: "camila@uleam.edu.ec",
    telefono: "0991112233"
  },
  {
    id: "diego",
    nombre: "Diego Loor Bravo",
    cedula: "1122334455",
    carrera: "Software",
    semestre: "4to",
    correo: "diego@uleam.edu.ec",
    telefono: "0984445566"
  }
];

const CUENTAS = [
  { usuario: "estudiante", clave: "estudiante123", rol: "alumno", perfil: "camila" },
  { usuario: "profesional", clave: "profesional123", rol: "pro", perfil: "andrea" },
  { usuario: "admin", clave: "admin123", rol: "admin", perfil: "admin" }
];

const BECAS = [
  { id: "b1", nombre: "Beca Excelencia", cobertura: "100% matrícula", cupos: 5, estado: "Abierta" },
  { id: "b2", nombre: "Beca Socioeconómica", cobertura: "80% matrícula", cupos: 12, estado: "Abierta" },
  { id: "b3", nombre: "Beca Deportiva", cobertura: "60% matrícula", cupos: 8, estado: "Cerrada" }
];

/* Fechas de ejemplo */
function fechaHoy() {
  return new Date().toISOString().split("T")[0];
}

function fechaMas(dias) {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + dias);
  return fecha.toISOString().split("T")[0];
}

const CITAS = [
  { id: 1, alumno: "camila", servicio: "psico", profesional: "andrea", fecha: fechaMas(0), hora: "09:30", motivo: "Estrés por exámenes", estado: "Pendiente", nota: "" },
  { id: 2, alumno: "camila", servicio: "med", profesional: "marta", fecha: fechaMas(-3), hora: "10:15", motivo: "Dolor de garganta", estado: "Atendida", nota: "Reposo por 3 días" },
  { id: 3, alumno: "diego", servicio: "tsocial", profesional: "luis", fecha: fechaMas(1), hora: "11:00", motivo: "Ayuda económica", estado: "Pendiente", nota: "" },
  { id: 4, alumno: "diego", servicio: "psico", profesional: "andrea", fecha: fechaMas(-1), hora: "15:30", motivo: "Ansiedad", estado: "Cancelada", nota: "" }
];

const MENSAJES = [
  { id: 1, de: "pro", alumno: "camila", profesional: "andrea", asunto: "Bienvenida", texto: "Hola, te acompaño durante el semestre.", fecha: fechaMas(-6), leido: true },
  { id: 2, de: "alumno", alumno: "camila", profesional: "andrea", asunto: "Consulta sobre mi cita", texto: "¿Puedo cambiar la hora?", fecha: fechaMas(-2), leido: true },
  { id: 3, de: "pro", alumno: "camila", profesional: "andrea", asunto: "Re: Consulta", texto: "Claro, dime qué hora te sirve.", fecha: fechaMas(-1), leido: false },
  { id: 4, de: "pro", alumno: "camila", profesional: "marta", asunto: "Resultados", texto: "Tus exámenes salieron bien.", fecha: fechaMas(-3), leido: false },
  { id: 5, de: "pro", alumno: "diego", profesional: "luis", asunto: "Documentos", texto: "Trae tu cédula y tus notas.", fecha: fechaMas(-4), leido: false },
  { id: 6, de: "alumno", alumno: "diego", profesional: "luis", asunto: "Re: Documentos", texto: "Los llevo mañana.", fecha: fechaMas(-2), leido: true }
];

/* Notas de nivelación por alumno */
const NIVELACION = [
  { id: 1, alumno: "camila", periodo: "2025-2", materia: "Matemáticas", notaFinal: 9.2 },
  { id: 2, alumno: "camila", periodo: "2025-2", materia: "Física", notaFinal: 8.8 },
  { id: 3, alumno: "camila", periodo: "2025-2", materia: "Lenguaje", notaFinal: 9.5 },
  { id: 4, alumno: "diego", periodo: "2025-2", materia: "Matemáticas", notaFinal: 9.0 },
  { id: 5, alumno: "diego", periodo: "2025-2", materia: "Química", notaFinal: 8.7 },
  { id: 6, alumno: "diego", periodo: "2025-2", materia: "Inglés", notaFinal: 9.3 }
];

const AVISOS = [
  { id: 1, de: "Sistema", asunto: "Nueva postulación", texto: "Camila postuló a una beca.", fecha: fechaMas(-5), leido: false },
  { id: 2, de: "Dra. Marta", asunto: "Solicitud de horario", texto: "Necesito más horas los martes.", fecha: fechaMas(-3), leido: false },
  { id: 3, de: "Sistema", asunto: "Reporte mensual", texto: "El reporte ya está disponible.", fecha: fechaMas(0), leido: true }
];

const POSTULACIONES = [
  { id: 1, alumno: "camila", beca: "b2", motivo: "Ingresos familiares limitados", estado: "En proceso", fecha: fechaMas(-5) }
];

/* ============================================
   Guardar y cargar (localStorage)
   ============================================ */

const CLAVE = "dbanu_datos_simples";
const VERSION_DATOS = 2;

function datosIniciales() {
  return {
    version: VERSION_DATOS,
    servicios: JSON.parse(JSON.stringify(SERVICIOS)),
    profesionales: JSON.parse(JSON.stringify(PROFESIONALES)),
    alumnos: JSON.parse(JSON.stringify(ALUMNOS)),
    cuentas: JSON.parse(JSON.stringify(CUENTAS)),
    becas: JSON.parse(JSON.stringify(BECAS)),
    citas: JSON.parse(JSON.stringify(CITAS)),
    pacientes: [],
    areas_asignadas: true,
    mensajes: JSON.parse(JSON.stringify(MENSAJES)),
    avisos: JSON.parse(JSON.stringify(AVISOS)),
    postulaciones: JSON.parse(JSON.stringify(POSTULACIONES)),
    nivelacion: JSON.parse(JSON.stringify(NIVELACION))
  };
}

/* Corrige los servicios/profesionales base sin borrar citas ni mensajes */
function actualizarDatosBase() {
  SERVICIOS.forEach(base => {
    const actual = DB.servicios.find(s => s.id === base.id);

    if (actual) {
      actual.profesional = base.profesional;
    } else {
      DB.servicios.push(JSON.parse(JSON.stringify(base)));
    }
  });

  PROFESIONALES.forEach(base => {
    const actual = DB.profesionales.find(p => p.id === base.id);

    if (actual) {
      actual.area = base.area;
    } else {
      DB.profesionales.push(JSON.parse(JSON.stringify(base)));
    }
  });
}

/* Deja a cargo del profesional los servicios de su área */
function asignarServicios(profesional) {
  const areas = (profesional.area || "").split(" / ");

  DB.servicios.forEach(servicio => {
    if (areas.indexOf(servicio.nombre) === -1) return;

    servicio.profesional = profesional.id;

    /* Las citas pendientes de esa área pasan al nuevo profesional */
    DB.citas.forEach(cita => {
      if (cita.servicio === servicio.id && cita.estado === "Pendiente") {
        cita.profesional = profesional.id;
      }
    });
  });
}

let DB;

try {
  DB = JSON.parse(localStorage.getItem(CLAVE)) || datosIniciales();

  if (!DB.nivelacion) {
    DB.nivelacion = JSON.parse(JSON.stringify(NIVELACION));
  }

  if (!DB.pacientes) {
    DB.pacientes = [];
  }

  if (DB.version !== VERSION_DATOS) {
    actualizarDatosBase();
    DB.version = VERSION_DATOS;
    guardar();
  }

  /* Una sola vez: asigna servicios a profesionales creados desde admin */
  if (!DB.areas_asignadas) {
    DB.profesionales.forEach(p => {
      if (/^p\d+$/.test(p.id)) {
        asignarServicios(p);
      }
    });

    DB.areas_asignadas = true;
    guardar();
  }
} catch (error) {
  DB = datosIniciales();
}

function guardar() {
  localStorage.setItem(CLAVE, JSON.stringify(DB));
}

function reiniciar() {
  DB = datosIniciales();
  guardar();
}

/* ============================================
   Buscar datos por id
   ============================================ */

function buscarServicio(id) {
  return DB.servicios.find(s => s.id === id);
}

function buscarPro(id) {
  return DB.profesionales.find(p => p.id === id);
}

function buscarAlumno(id) {
  return DB.alumnos.find(a => a.id === id);
}

function buscarBeca(id) {
  return DB.becas.find(b => b.id === id);
}

function nombreServicio(id) {
  const servicio = buscarServicio(id);
  return servicio ? servicio.nombre : "-";
}

function nombrePro(id) {
  const pro = buscarPro(id);
  return pro ? pro.nombre : "-";
}

function nombreAlumno(id) {
  const alumno = buscarAlumno(id);
  return alumno ? alumno.nombre : "-";
}

function nombreBeca(id) {
  const beca = buscarBeca(id);
  return beca ? beca.nombre : "-";
}

function nuevoId(lista) {
  let maximo = 0;
  lista.forEach(x => {
    if (x.id > maximo) maximo = x.id;
  });
  return maximo + 1;
}

/* ============================================
   Sesión
   ============================================ */

const CLAVE_SESION = "dbanu_sesion_simple";

function entrar(usuario, clave) {
  const cuenta = DB.cuentas.find(c => c.usuario === usuario && c.clave === clave);
  if (!cuenta) return null;

  const sesion = {
    usuario: cuenta.usuario,
    rol: cuenta.rol,
    perfil: cuenta.perfil
  };

  localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
  return sesion;
}

function sesionActual() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_SESION));
  } catch (error) {
    return null;
  }
}

function salir() {
  localStorage.removeItem(CLAVE_SESION);
}

function inicioDe(rol) {
  if (rol === "alumno") return "estudiante/inicio.html";
  if (rol === "pro") return "profesional/inicio.html";
  return "admin/registros.html";
}

function nombreSesion() {
  const sesion = sesionActual();
  if (!sesion) return "";

  if (sesion.rol === "alumno") return nombreAlumno(sesion.perfil);
  if (sesion.rol === "pro") return nombrePro(sesion.perfil);
  return "Admin";
}

function pedirSesion(rolEsperado) {
  const sesion = sesionActual();

  if (!sesion) {
    location.replace("../index.html");
    return null;
  }

  if (rolEsperado && sesion.rol !== rolEsperado) {
    location.replace("../" + inicioDe(sesion.rol));
    return null;
  }

  return sesion;
}

/* ============================================
   Textos y fechas
   ============================================ */

function escapar(texto) {
  return String(texto == null ? "" : texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function iniciales(nombre) {
  const limpio = String(nombre || "").replace(/^(Lic\.|Dra\.|Dr\.)\s*/i, "");
  const partes = limpio.trim().split(/\s+/);
  const primera = (partes[0] || "")[0] || "";
  const segunda = (partes[1] || "")[0] || "";
  return (primera + segunda).toUpperCase();
}

function fechaBonita(fecha) {
  if (!fecha) return "-";

  const partes = fecha.split("-");
  const meses = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

  return Number(partes[2]) + " " + meses[Number(partes[1]) - 1] + " " + partes[0];
}

function estadoClase(estado) {
  if (estado === "Pendiente") return "e-pend";
  if (estado === "Atendida") return "e-ok";
  if (estado === "Cancelada") return "e-no";
  return "e-proc";
}

function aviso(texto, tipo) {
  let caja = document.getElementById("aviso");

  if (!caja) {
    caja = document.createElement("div");
    caja.id = "aviso";
    document.body.appendChild(caja);
  }

  caja.textContent = texto;
  caja.className = tipo || "";
  caja.style.display = "block";

  clearTimeout(caja.reloj);
  caja.reloj = setTimeout(() => {
    caja.style.display = "none";
  }, 2000);
}

/* Muestra un error pequeño debajo de un formulario */
function errorFormulario(texto, id) {
  const caja = document.getElementById(id || "error-formulario");

  if (!caja) return;

  caja.textContent = texto || "";
}

/* ============================================
   Menú lateral
   ============================================ */

const MENUS = {
  alumno: [
    { texto: "Inicio", href: "inicio.html" },
    { texto: "Mis citas", href: "citas.html" },
    { texto: "Agendar", href: "agendar.html" },
    { texto: "Becas", href: "becas.html" },
    { texto: "Nivelación", href: "nivelacion.html" },
    { texto: "Mensajes", href: "msgs.html" },
    { texto: "Perfil", href: "perfil.html" }
  ],
  pro: [
    { texto: "Inicio", href: "inicio.html" },
    { texto: "Mis citas", href: "citas.html" },
    { texto: "Pacientes", href: "pacientes.html" },
    { texto: "Mensajes", href: "msgs.html" },
    { texto: "Perfil", href: "perfil.html" }
  ],
  admin: [
    { texto: "Registros", href: "registros.html" },
    { texto: "Usuarios", href: "usuarios.html" },
    { texto: "Servicios", href: "servicios.html" },
    { texto: "Becas", href: "becas.html" },
    { texto: "Mensajes", href: "msgs.html" },
    { texto: "Datos", href: "datos.html" },
    { texto: "Configuración", href: "configuracion.html" },
    { texto: "Perfil", href: "perfil.html" }
  ]
};

const NOMBRE_ROL = {
  alumno: "Estudiante",
  pro: "Profesional",
  admin: "Administrador"
};

function fechaTexto() {
  const texto = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });

  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function mensajesSinLeer(sesion) {
  if (!sesion) return 0;

  if (sesion.rol === "admin") {
    return DB.avisos.filter(a => !a.leido).length;
  }

  return DB.mensajes.filter(m => {
    if (m.leido) return false;

    if (sesion.rol === "alumno") {
      return m.alumno === sesion.perfil && m.de === "pro";
    }

    return m.profesional === sesion.perfil && m.de === "alumno";
  }).length;
}

function menu(rol, pagina) {
  const sesion = sesionActual();
  const sinLeer = mensajesSinLeer(sesion);
  const nombre = nombreSesion();

  const enlaces = MENUS[rol].map(enlace => {
    const activo = enlace.href === pagina ? "activo" : "";

    const contador = enlace.href === "msgs.html" && sinLeer > 0
      ? `<span class="menu-badge">${sinLeer}</span>`
      : "";

    return `
      <a href="${enlace.href}" class="${activo}">
        <span>${enlace.texto}</span>
        ${contador}
      </a>`;
  }).join("");

  const aside = document.createElement("aside");
  aside.className = "menu";

  aside.innerHTML = `
    <div class="menu-marca">
      <div class="menu-logo">
        <img src="../img/logo.png" alt="logo">
      </div>
      <h2>DBANU</h2>
    </div>

    <nav class="menu-links">${enlaces}</nav>

    <div class="menu-bot">
      <button id="ayuda">Ayuda</button>
      <button id="salir">Salir</button>
    </div>

    <span class="menu-flecha">‹</span>`;

  const app = document.querySelector(".app");

  if (app) {
    app.prepend(aside);
  } else {
    document.body.prepend(aside);
  }

  const contenido = document.querySelector(".contenido");

  if (contenido) {
    contenido.insertAdjacentHTML("afterbegin", `
      <header class="topbar">
        <div class="topbar-titulo">
          <h2>${fechaTexto()}</h2>
          <p>Resumen del día</p>
        </div>

        <div class="buscador">
          <svg class="icono-buscar" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
            <circle cx="11" cy="11" r="7"></circle>
            <path d="m20 20-4-4"></path>
          </svg>
          <input placeholder="Buscar">
        </div>

        <div class="topbar-user">
          <a class="campana" href="msgs.html" title="Mensajes">
            <svg class="icono-campana" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"></path>
              <path d="M10 21h4"></path>
            </svg>
            ${sinLeer > 0 ? `<b class="campana-badge">${sinLeer}</b>` : ""}
          </a>

          <div class="mini-avatar">${iniciales(nombre)}</div>

          <div class="topbar-datos">
            <strong>${escapar(nombre)}</strong>
            <small>${NOMBRE_ROL[rol]}</small>
          </div>
        </div>
      </header>`);
  }

  document.getElementById("ayuda").onclick = function () {
    aviso("Elige una opción del menú para continuar", "inf");
  };

  document.getElementById("salir").onclick = function () {
    salir();
    location.href = "../index.html";
  };
}

/* Formato de correo */
const CORREO = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
