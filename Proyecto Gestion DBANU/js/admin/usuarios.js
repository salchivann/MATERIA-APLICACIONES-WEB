/* ============================================
   Admin: usuarios
   ============================================ */

const sesion = pedirSesion("admin");

if (sesion) {
  menu("admin", "usuarios.html");

  const editando = document.getElementById("edit");
  const rol = document.getElementById("rol");
  const nombre = document.getElementById("nom");
  const correo = document.getElementById("mail");
  const usuario = document.getElementById("user");
  const clave = document.getElementById("pass");
  const titulo = document.getElementById("tit");
  const formulario = document.getElementById("f");
  const limpiarBtn = document.getElementById("limpiar");
  const area = document.getElementById("area");
  const campoArea = document.getElementById("campo-area");
  const filtroRol = document.getElementById("f-rol");
  const filtroArea = document.getElementById("f-area");
  const buscar = document.getElementById("buscar");

  function listaUsuarios() {
    const lista = [];

    lista.push({
      tipo: "admin",
      id: "admin",
      nombre: "Admin",
      rol: "Admin",
      area: "-",
      cedula: "-",
      correo: "admin@dbanu.com"
    });

    DB.profesionales.forEach(p => {
      lista.push({
        tipo: "pro",
        id: p.id,
        nombre: p.nombre,
        rol: "Profesional",
        area: p.area,
        cedula: "-",
        correo: p.correo
      });
    });

    DB.alumnos.forEach(a => {
      lista.push({
        tipo: "alumno",
        id: a.id,
        nombre: a.nombre,
        rol: "Alumno",
        area: "-",
        cedula: a.cedula,
        correo: a.correo
      });
    });

    return lista;
  }

  function cuentaDe(tipo, id) {
    return DB.cuentas.find(c => c.rol === tipo && c.perfil === id);
  }

  /* Áreas de servicios y áreas que ya tienen los profesionales */
  function areasDisponibles() {
    const areas = DB.servicios.map(s => s.nombre);

    DB.profesionales.forEach(p => {
      (p.area || "").split(" / ").forEach(a => {
        if (areas.indexOf(a) === -1) areas.push(a);
      });
    });

    return areas;
  }

  function llenarAreas(actual) {
    const areas = areasDisponibles();

    if (actual && areas.indexOf(actual) === -1) {
      areas.push(actual);
    }

    area.innerHTML = `<option value="">Elige un área</option>` +
      areas.map(a => `<option>${escapar(a)}</option>`).join("");

    area.value = actual || "";
  }

  function llenarFiltroAreas() {
    const areas = areasDisponibles();

    filtroArea.innerHTML = `<option value="">Todas</option>` +
      areas.map(a => `<option>${escapar(a)}</option>`).join("");
  }

  function mostrarArea() {
    campoArea.style.display = rol.value === "pro" ? "block" : "none";
    errorFormulario("");
  }

  function pintar() {
    const cuerpo = document.getElementById("body");

    let usuarios = listaUsuarios();

    if (filtroRol.value) {
      usuarios = usuarios.filter(u => u.tipo === filtroRol.value);
    }

    if (filtroArea.value) {
      usuarios = usuarios.filter(u =>
        u.tipo === "pro" && (u.area || "").indexOf(filtroArea.value) !== -1
      );
    }

    const texto = buscar.value.trim().toLowerCase();

    if (texto) {
      usuarios = usuarios.filter(u =>
        (u.nombre || "").toLowerCase().indexOf(texto) !== -1 ||
        (u.cedula || "").toLowerCase().indexOf(texto) !== -1
      );
    }

    if (usuarios.length === 0) {
      cuerpo.innerHTML = `<tr><td colspan="7" class="vacio">No hay usuarios que coincidan.</td></tr>`;
      return;
    }

    cuerpo.innerHTML = usuarios.map(u => {
      if (u.tipo === "admin") {
        return `
          <tr>
            <td>${escapar(u.nombre)}</td>
            <td>${escapar(u.rol)}</td>
            <td>-</td>
            <td>-</td>
            <td>${escapar(u.correo)}</td>
            <td>admin</td>
            <td><span class="estado e-ok">Base</span></td>
          </tr>`;
      }

      const cuenta = cuentaDe(u.tipo, u.id);

      return `
        <tr>
          <td>${escapar(u.nombre)}</td>
          <td>${escapar(u.rol)}</td>
          <td>${escapar(u.area)}</td>
          <td>${escapar(u.cedula)}</td>
          <td>${escapar(u.correo)}</td>
          <td>${cuenta ? escapar(cuenta.usuario) : "-"}</td>
          <td>
            <button class="btn-chico" onclick="editar('${u.tipo}','${u.id}')">Editar</button>
            <button class="btn-rojo btn-chico" onclick="eliminar('${u.tipo}','${u.id}')">Borrar</button>
          </td>
        </tr>`;
    }).join("");
  }

  window.editar = function (tipo, id) {
    let perfil = null;

    if (tipo === "pro") perfil = buscarPro(id);
    if (tipo === "alumno") perfil = buscarAlumno(id);

    const cuenta = cuentaDe(tipo, id);

    editando.value = tipo + ":" + id;
    titulo.textContent = "Editar";
    errorFormulario("");
    rol.value = tipo;
    mostrarArea();
    llenarAreas(perfil ? perfil.area : "");
    nombre.value = perfil ? perfil.nombre : "";
    correo.value = perfil ? perfil.correo : "";
    usuario.value = cuenta ? cuenta.usuario : "";
    clave.value = cuenta ? cuenta.clave : "";

    window.scrollTo(0, 0);
  };

  window.eliminar = function (tipo, id) {
    let perfil = null;

    if (tipo === "pro") perfil = buscarPro(id);
    if (tipo === "alumno") perfil = buscarAlumno(id);

    if (!perfil) return;
    if (!confirm("¿Borrar a " + perfil.nombre + "?")) return;

    if (tipo === "pro") {
      DB.profesionales = DB.profesionales.filter(p => p.id !== id);
    }

    if (tipo === "alumno") {
      DB.alumnos = DB.alumnos.filter(a => a.id !== id);
    }

    DB.pacientes = DB.pacientes.filter(p => p.alumno !== id && p.profesional !== id);

    DB.cuentas = DB.cuentas.filter(c => !(c.rol === tipo && c.perfil === id));
    guardar();
    pintar();
    aviso("Borrado", "inf");
  };

  limpiarBtn.onclick = function () {
    editando.value = "";
    titulo.textContent = "Agregar";
    errorFormulario("");
    formulario.reset();
    llenarAreas("");
    mostrarArea();
  };

  formulario.onsubmit = function (evento) {
    evento.preventDefault();
    errorFormulario("");

    if (nombre.value.trim().length < 4) {
      errorFormulario("Escribe nombre y apellido");
      return;
    }

    if (!CORREO.test(correo.value.trim())) {
      errorFormulario("Correo no válido");
      return;
    }

    if (usuario.value.trim().length < 4) {
      errorFormulario("Usuario mínimo 4 letras");
      return;
    }

    if (clave.value.trim().length < 4) {
      errorFormulario("Clave mínima 4 letras");
      return;
    }

    if (rol.value === "pro" && !area.value) {
      errorFormulario("Elige el área del profesional");
      return;
    }

    const usuarioRepetido = DB.cuentas.some(c => {
      if (c.usuario !== usuario.value.trim()) return false;
      if (!editando.value) return true;
      return (c.rol + ":" + c.perfil) !== editando.value;
    });

    if (usuarioRepetido) {
      errorFormulario("Ese usuario ya existe");
      return;
    }

    if (editando.value) {
      const partes = editando.value.split(":");
      const tipoViejo = partes[0];
      const idViejo = partes[1];

      let perfil = null;
      if (tipoViejo === "pro") perfil = buscarPro(idViejo);
      if (tipoViejo === "alumno") perfil = buscarAlumno(idViejo);

      if (perfil) {
        perfil.nombre = nombre.value.trim();
        perfil.correo = correo.value.trim();

        if (tipoViejo === "pro") {
          perfil.area = area.value;
          asignarServicios(perfil);
        }
      }

      const cuenta = cuentaDe(tipoViejo, idViejo);
      if (cuenta) {
        cuenta.usuario = usuario.value.trim();
        cuenta.clave = clave.value.trim();
      }

      aviso("Datos guardados", "ok");
    } else {
      const tipo = rol.value;
      const id = tipo === "pro" ? "p" + Date.now() : "a" + Date.now();

      if (tipo === "pro") {
        const nuevoPro = {
          id: id,
          nombre: nombre.value.trim(),
          area: area.value,
          correo: correo.value.trim(),
          estado: "Activo"
        };

        DB.profesionales.push(nuevoPro);
        asignarServicios(nuevoPro);
      }

      if (tipo === "alumno") {
        DB.alumnos.push({
          id: id,
          nombre: nombre.value.trim(),
          cedula: "0000000000",
          carrera: "Por registrar",
          semestre: "1er",
          correo: correo.value.trim(),
          telefono: ""
        });
      }

      DB.cuentas.push({
        usuario: usuario.value.trim(),
        clave: clave.value.trim(),
        rol: tipo,
        perfil: id
      });

      aviso("Usuario agregado", "ok");
    }

    guardar();
    editando.value = "";
    titulo.textContent = "Agregar";
    formulario.reset();
    llenarAreas("");
    mostrarArea();
    pintar();
  };

  rol.onchange = mostrarArea;
  filtroRol.onchange = pintar;
  filtroArea.onchange = pintar;
  buscar.oninput = pintar;

  llenarAreas("");
  llenarFiltroAreas();
  mostrarArea();
  pintar();
}
