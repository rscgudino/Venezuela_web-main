// Variables para el carrito
let carrito = [];

// Función para agregar productos al carrito
function agregarAlCarrito(nombre, precio) {
    // Verificamos si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.nombre === nombre);
    
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    actualizarCarrito();
}

document.getElementById("purchase-button").addEventListener("click", function() {
    // Ocultar el carrito y mostrar el formulario de pago
    document.querySelector('.shopping-cart').style.display = 'none';
    document.getElementById('metodos-pago').style.display = 'block';
});


// Función para actualizar la visualización del carrito
function actualizarCarrito() {
    // Referencia al contenedor de los productos en el carrito
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // Limpiar contenido previo

    let total = 0;
    
    // Recorrer los productos en el carrito y agregarlos a la tabla
    carrito.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.nombre}</td>
            <td>$${item.precio.toFixed(2)}</td>
            <td>${item.cantidad}</td>
            <td>$${(item.precio * item.cantidad).toFixed(2)}</td>
            <td><button class="remove-item" data-name="${item.nombre}">Eliminar</button></td>
        `;
        cartItems.appendChild(row);
        total += item.precio * item.cantidad;
    });

    // Actualizar el total
    const totalElement = document.getElementById('cart-total');
    totalElement.textContent = `Total: $${total.toFixed(2)}`;

    // Mostrar el botón de compra si hay productos en el carrito
    const purchaseButton = document.getElementById('purchase-button');
    if (carrito.length > 0) {
        purchaseButton.style.display = 'block';
    } else {
        purchaseButton.style.display = 'none';
    }
}

// Función para procesar la compra
document.getElementById('purchase-button').addEventListener('click', () => {
    // Mostrar el formulario de pago
    const paymentMethodsSection = document.getElementById('metodos-pago');
    paymentMethodsSection.style.display = 'block';
});

// Agregar funcionalidad al botón de eliminar productos del carrito
document.getElementById('cart-items').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item')) {
        const productName = e.target.dataset.name;
        carrito = carrito.filter(item => item.nombre !== productName);
        actualizarCarrito();
    }
});

// Agregar eventos a los botones de "Agregar al carrito"
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const productElement = e.target.closest('.product');
        const nombre = productElement.dataset.name;
        const precio = parseFloat(productElement.dataset.price);
        agregarAlCarrito(nombre, precio);
    });
});

document.getElementById("purchase-button").addEventListener("click", function() {
    // Redirige a la página de procesamiento
    window.location.href = "procesando_compra.html";
});
