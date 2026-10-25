/* ============================================
   Admin: configuración avanzada
   ============================================ */

const sesion = pedirSesion("admin");

if (sesion) {
  menu("admin", "configuracion.html");

  const formulario = document.getElementById("config");

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    aviso("Vista de demostración: los cambios no se guardan todavía", "inf");
  });
}
