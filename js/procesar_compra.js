// Función para actualizar el mensaje después de un retraso
function mostrarMensaje(mensaje, tiempo) {
    return new Promise(resolve => {
        setTimeout(() => {
            document.getElementById('mensaje').textContent = mensaje;
            resolve();
        }, tiempo);
    });
}

// Función que maneja el flujo de mensajes
async function procesarCompra() {
    try {
        // Simulación de procesamiento de compra
        await mostrarMensaje("Procesando su compra...", 0);
        await mostrarMensaje("Esperando 5 segundos...", 5000); // Espera 5 segundos
        await mostrarMensaje("Su pedido está siendo preparado...", 5000); // Espera otros 5 segundos
        await mostrarMensaje("Pedido enviado. ¡Muchas gracias!", 0); // Mensaje final
    } catch (error) {
        // En caso de error, mostrar mensaje de error
        document.getElementById('mensaje').textContent = "Hubo un error al procesar su compra. Intente nuevamente.";
        console.error("Error en el procesamiento de la compra:", error);
    }
}

// Función para manejar la selección del método de pago
document.getElementById('form-pago').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevenir el envío del formulario

    const metodoPagoSeleccionado = document.querySelector('input[name="metodo_pago"]:checked');
    
    if (metodoPagoSeleccionado) {
        const metodoPago = metodoPagoSeleccionado.value;
        console.log(`Método de pago seleccionado: ${metodoPago}`);

        // Ocultar la selección de métodos de pago y mostrar la sección de datos de envío
        document.getElementById('metodos-pago').style.display = 'none';
        document.getElementById('datos-envio').style.display = 'block'; // Mostrar la sección de dirección y correo
    } else {
        alert('Por favor, seleccione un método de pago.');
    }
});

// Función para manejar la confirmación de la dirección de envío
document.getElementById('form-envio').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevenir el envío del formulario

    const email = document.getElementById('email').value;
    const direccion = document.getElementById('direccion').value;

    if (email && direccion) {
        console.log(`Correo electrónico: ${email}`);
        console.log(`Dirección: ${direccion}`);

        // Ocultar el formulario de dirección
        document.getElementById('datos-envio').style.display = 'none';

        // Mostrar el conteo de procesamiento
        document.getElementById('contador').style.display = 'block';

        // Iniciar el conteo regresivo
        iniciarConteo();
    } else {
        alert('Por favor, ingrese su correo electrónico y dirección de envío.');
    }
});

// Función para iniciar el conteo regresivo
function iniciarConteo() {
    let tiempoRestante = 10; // Tiempo en segundos
    const tiempoElemento = document.getElementById('tiempo-restante');

    const intervalo = setInterval(() => {
        if (tiempoRestante > 0) {
            tiempoElemento.textContent = `Tiempo restante: ${tiempoRestante} segundos`;
            tiempoRestante--;
        } else {
            clearInterval(intervalo);
            finalizarProceso();
        }
    }, 1000);
}

// Función que finaliza el proceso y muestra el botón de regreso
function finalizarProceso() {
    // Cambiar el mensaje
    document.getElementById('contador-mensaje').textContent = "Compra procesada con éxito.";
    
    // Mostrar el botón de regreso a la página de inicio
    document.getElementById('boton-regreso').style.display = 'block';
}
