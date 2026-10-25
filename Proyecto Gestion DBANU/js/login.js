/* ============================================
   Login
   ============================================ */

const sesionActiva = sesionActual();

if (sesionActiva) {
  location.replace(inicioDe(sesionActiva.rol));
}

const formulario = document.getElementById("f");
const usuario = document.getElementById("u");
const clave = document.getElementById("p");

function marcarError(campo, texto) {
  document.getElementById("e-" + campo.id).textContent = texto || "";
}

[usuario, clave].forEach(campo => {
  campo.oninput = () => marcarError(campo, "");
});

formulario.onsubmit = function (evento) {
  evento.preventDefault();

  marcarError(usuario, "");
  marcarError(clave, "");

  let hayError = false;

  if (!usuario.value.trim()) {
    marcarError(usuario, "Escribe tu usuario");
    hayError = true;
  }

  if (!clave.value.trim()) {
    marcarError(clave, "Escribe tu contraseña");
    hayError = true;
  }

  if (hayError) return;

  const sesion = entrar(usuario.value.trim(), clave.value.trim());

  if (!sesion) {
    marcarError(clave, "Usuario o contraseña incorrectos");
    aviso("No se pudo entrar", "err");
    return;
  }

  aviso("Bienvenido/a", "ok");

  setTimeout(function () {
    location.href = inicioDe(sesion.rol);
  }, 300);
};

/* Botones de cuentas de prueba */
document.querySelectorAll("[data-d]").forEach(boton => {
  boton.onclick = function () {
    const cuenta = DB.cuentas.find(c => c.rol === boton.dataset.d);
    if (!cuenta) return;

    usuario.value = cuenta.usuario;
    clave.value = cuenta.clave;

    marcarError(usuario, "");
    marcarError(clave, "");
  };
});
