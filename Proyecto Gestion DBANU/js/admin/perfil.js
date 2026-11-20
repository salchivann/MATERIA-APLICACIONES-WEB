/* ============================================
   Admin: perfil y datos del sistema
   ============================================ */

const sesion = pedirSesion("admin");

if (sesion) {
  menu("admin", "perfil.html");

  document.getElementById("res").innerHTML = `
    <div class="res">
      <span class="num">${DB.alumnos.length}</span>
      <span class="txt">Alumnos</span>
    </div>
    <div class="res">
      <span class="num">${DB.profesionales.length}</span>
      <span class="txt">Profesionales</span>
    </div>
    <div class="res">
      <span class="num">${DB.servicios.length}</span>
      <span class="txt">Servicios</span>
    </div>
    <div class="res">
      <span class="num">${DB.citas.length}</span>
      <span class="txt">Citas</span>
    </div>`;

  document.getElementById("reset").onclick = function () {
    if (!confirm("¿Restablecer todos los datos?")) return;

    reiniciar();
    aviso("Datos restablecidos", "inf");

    setTimeout(function () {
      location.reload();
    }, 400);
  };
}
