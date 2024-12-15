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

// Carrito de compras
let cart = [];

const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const floatingCartIcon = document.getElementById('floating-cart-icon');

// Función para actualizar el carrito
function updateCart() {
    // Limpiar los artículos actuales en el carrito
    cartItemsContainer.innerHTML = '';
    let total = 0;

    // Iterar sobre el carrito para agregar los artículos al HTML
    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price}</td>
            <td>${item.quantity}</td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td><button class="remove-item" data-name="${item.name}">Eliminar</button></td>
        `;
        cartItemsContainer.appendChild(row);
        total += item.price * item.quantity;
    });

    // Mostrar el total en el carrito
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;

    // Mostrar el ícono flotante si el carrito no está vacío
    if (cart.length > 0) {
        floatingCartIcon.style.display = 'block';
    } else {
        floatingCartIcon.style.display = 'none';
    }
}

// Función para agregar al carrito
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const product = button.closest('.product');
        const name = product.getAttribute('data-name');
        const price = parseFloat(product.getAttribute('data-price'));

        // Verificar si el producto ya está en el carrito
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        // Actualizar el carrito
        updateCart();
    });
});

// Función para eliminar un producto del carrito
cartItemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item')) {
        const name = e.target.getAttribute('data-name');
        cart = cart.filter(item => item.name !== name);
        updateCart();
    }
});

// Redirigir al carrito cuando se hace clic en el ícono flotante
floatingCartIcon.addEventListener('click', () => {
    window.location.href = '#carrito';
});

// Inicializar el carrito
updateCart();


document.addEventListener('DOMContentLoaded', function() {
    const botonAgregar = document.getElementById('agregar-al-carrito');
    const iconoCarrito = document.getElementById('icono-carrito');

    // Función para mostrar el ícono del carrito con una animación
    function mostrarIconoCarrito() {
        iconoCarrito.style.display = 'block'; // Mostrar el ícono
        iconoCarrito.style.opacity = 1; // Hacerlo visible
    }

    // Agregar un evento al botón para simular agregar al carrito
    botonAgregar.addEventListener('click', function() {
        // Aquí puedes agregar la lógica para agregar el producto al carrito

        // Mostrar el ícono del carrito con animación
        mostrarIconoCarrito();

        // Luego de unos segundos (puedes ajustar el tiempo), ocultar el ícono
        setTimeout(function() {
            iconoCarrito.style.opacity = 0; // Desaparecer el ícono
            setTimeout(function() {
                iconoCarrito.style.display = 'none'; // Ocultar completamente el ícono
            }, 300); // Esperar que la animación de desvanecimiento termine
        }, 3000); // El ícono desaparece después de 3 segundos
    });

    // Asegurarnos de que el ícono se desplace con el usuario
    window.addEventListener('scroll', function() {
        // Aquí puedes agregar lógica si deseas que el ícono cambie o se mantenga fijo
        // al hacer scroll, por ejemplo, cambiando su posición.
    });
});
