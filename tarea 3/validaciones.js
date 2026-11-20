function validarFormulario() {

    let cedula = document.getElementById('cedula').value;
    let nombre = document.getElementById('nombre').value;
    let direccion = document.getElementById('direccion').value;
    let telefono = document.getElementById('telefono').value;
    let correo = document.getElementById('correo').value;

    let hayErrores = false;

    // Limpiar mensajes anteriores
    document.getElementById('errorCedula').textContent = "";
    document.getElementById('errorNombre').textContent = "";
    document.getElementById('errorDireccion').textContent = "";
    document.getElementById('errorTelefono').textContent = "";
    document.getElementById('errorCorreo').textContent = "";


    if (cedula.length == 0) {
        document.getElementById('errorCedula').textContent =
            " La cédula no puede estar vacía.";
        hayErrores = true;
    }
    else if (!/^[0-9]+$/.test(cedula)) {
        document.getElementById('errorCedula').textContent =
            " La cédula solo debe contener números.";
        hayErrores = true;
    }
    else if (cedula.length > 10) {
        document.getElementById('errorCedula').textContent =
            " La cédula no puede ser mayor a 10 dígitos.";
        hayErrores = true;
    }
    else if (cedula.length < 10) {
        document.getElementById('errorCedula').textContent =
            " La cédula debe tener 10 dígitos.";
        hayErrores = true;
    }


   
    if (nombre.length == 0) {
        document.getElementById('errorNombre').textContent =
            " El nombre no puede estar vacío.";
        hayErrores = true;
    }
    else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(nombre)) {
        document.getElementById('errorNombre').textContent =
            " El nombre solo debe contener letras.";
        hayErrores = true;
    }
    else if (nombre.length > 30) {
        document.getElementById('errorNombre').textContent =
            " El nombre no puede superar los 30 caracteres.";
        hayErrores = true;
    }


   
    if (direccion.length == 0) {
        document.getElementById('errorDireccion').textContent =
            " La dirección no puede estar vacía.";
        hayErrores = true;
    }
    else if (direccion.length > 50) {
        document.getElementById('errorDireccion').textContent =
            " La dirección no debe superar los 50 caracteres.";
        hayErrores = true;
    }


   
    if (telefono.length == 0) {
        document.getElementById('errorTelefono').textContent =
            " El teléfono no puede estar vacío.";
        hayErrores = true;
    }
    else if (!/^[0-9]+$/.test(telefono)) {
        document.getElementById('errorTelefono').textContent =
            " El teléfono solo debe contener números.";
        hayErrores = true;
    }
    else if (telefono.length > 10) {
        document.getElementById('errorTelefono').textContent =
            " El teléfono no puede superar los 10 dígitos.";
        hayErrores = true;
    }
    else if (telefono.length < 10) {
        document.getElementById('errorTelefono').textContent =
            " El teléfono debe tener 10 dígitos.";
        hayErrores = true;
    }


   
    if (correo.length == 0) {
        document.getElementById('errorCorreo').textContent =
            " El correo no puede estar vacío.";
        hayErrores = true;
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        document.getElementById('errorCorreo').textContent =
            " Ingrese un correo electrónico válido.";
        hayErrores = true;
    }


  
    if (hayErrores == false) {
        alert("Formulario validado con éxito");
    }
}

