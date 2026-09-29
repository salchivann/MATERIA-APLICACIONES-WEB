function validar() {
let numero1 = document.getElementById('numero1').value.trim();
let numero2 = document.getElementById('numero2').value.trim();

let hayErrores = false;

document.getElementById('errorNumero1').textContent = "";
document.getElementById('errorNumero2').textContent = "";

if (numero1.length === 0) {
    document.getElementById('errorNumero1').textContent =
        "El campo no puede estar vacío.";
    hayErrores = true;
}

if (numero2.length === 0) {
    document.getElementById('errorNumero2').textContent =
        "El campo no puede estar vacío.";
    hayErrores = true;
}


if (hayErrores) {
    return;
}

numero1 = Number(numero1);
numero2 = Number(numero2);


let contenedor = document.getElementById('resultados');

contenedor.innerHTML = "<h3>Resultados de las 5 iteraciones:</h3>";

for (let i = 1; i <= 5; i++) {
    let resultadoTexto = "";

    if (i === 1) {
        resultadoTexto = `1. Suma: ${numero1} + ${numero2} = ${suma(numero1, numero2)}`;
    } 
    else if (i === 2) {
        resultadoTexto = `2. Resta: ${numero1} - ${numero2} = ${resta(numero1, numero2)}`;
    } 
    else if (i === 3) {
        resultadoTexto = `3. Multiplicación: ${numero1} * ${numero2} = ${multiplicacion(numero1, numero2)}`;
    } 
    else if (i === 4) {
        resultadoTexto = `4. División: ${numero1} / ${numero2} = ${division(numero1, numero2)}`;
    } 
    else if (i === 5) {
        resultadoTexto = `5. Módulo: ${numero1} % ${numero2} = ${porcentaje(numero1, numero2)}`;
    }

    contenedor.innerHTML += `<p>${resultadoTexto}</p>`;
}

}
    function suma(numero1, numero2) {
        return numero1 + numero2;
    }

    function resta(numero1, numero2) {
        return numero1 - numero2;
    }

    function multiplicacion(numero1, numero2) {
        return numero1 * numero2;
    }

    function division(numero1, numero2) {
        if (numero2 === 0) {
        return "No se puede dividir entre cero";
        }

        return numero1 / numero2;
    }

    function porcentaje(numero1, numero2) {
        if (numero2 === 0) {
        return "No se puede calcular el módulo entre cero";
        }
        return numero1 % numero2;
}