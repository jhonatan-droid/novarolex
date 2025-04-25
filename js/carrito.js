// 1. Declarar las variables
let carrito = [];
const itemsContainer = document.getElementById('items');
const carritoContainer = document.getElementById('carrito');
const totalElement = document.getElementById('total');
const vaciarCarritoButton = document.getElementById('boton-vaciar');

// 2. Declarar las funciones

// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
    const existe = carrito.some(item => item.id === producto.id);
    if (existe) {
        const index = carrito.findIndex(item => item.id === producto.id);
        carrito[index].cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    guardarCarritoEnLocalStorage();
    renderizarCarrito();
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    guardarCarritoEnLocalStorage();
    renderizarCarrito();
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    guardarCarritoEnLocalStorage();
    renderizarCarrito();
}

// Función para calcular el total de los productos en el carrito
function calcularTotal() {
    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    totalElement.textContent = total.toFixed(2);
}

// Función para renderizar el carrito en la página
function renderizarCarrito() {
    carritoContainer.innerHTML = '';
    carrito.forEach(item => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex align-items-center';

        // Agregar imagen del producto
        const img = document.createElement('img');
        img.src = item.imagen;
        img.alt = item.nombre;
        img.style.width = '120px';
        img.style.height = '120px';
        img.style.marginRight = '10px';

        // Agregar detalles del producto
        const details = document.createElement('div');
        details.innerHTML = `
            <strong>${item.nombre}</strong><br>
            Cantidad: ${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}
        `;

        // Botón para eliminar el producto
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.className = 'btn btn-danger btn-sm ms-auto';
        botonEliminar.onclick = () => eliminarDelCarrito(item.id);

        li.appendChild(img);
        li.appendChild(details);
        li.appendChild(botonEliminar);
        carritoContainer.appendChild(li);
    });
    calcularTotal();
}

// 3. Obtener el contador del almacenamiento local
let contadorVisitas = localStorage.getItem('contadorVisitas');

// 4. Si no hay visitas almacenadas, inicializa a 0
if (!contadorVisitas) {
    contadorVisitas = 0;
}

// 5. Incrementa el contador
contadorVisitas++;

// 6. Guarda el nuevo contador en el almacenamiento local
localStorage.setItem('contadorVisitas', contadorVisitas);

// 7. Muestra el contador en la página
document.addEventListener('DOMContentLoaded', () => {
    const contadorVisitasElement = document.getElementById('contador-visitas');
    contadorVisitasElement.textContent = `Número de visitas: ${contadorVisitas}`;
});

// 8. Borrar carrito
vaciarCarritoButton.addEventListener('click', vaciarCarrito);

// 9. Calcular el total de los productos
function calcularTotal() {
    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    totalElement.textContent = total.toFixed(2);
}

// 10. Vaciar todos los elementos del carrito
function vaciarCarrito() {
    carrito = [];
    guardarCarritoEnLocalStorage();
    renderizarCarrito();
}

// 11. Guardar en localStorage el carrito
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// 12. Cargar del localStorage al carrito
function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        renderizarCarrito();
    }
}

// 13. Eventos para los clicks
document.addEventListener('DOMContentLoaded', () => {
    // Agregar eventos a los botones "Agregar"
    itemsContainer.addEventListener('click', e => {
        if (e.target.tagName === 'BUTTON') {
            const marcador = e.target.getAttribute('marcador');
            const producto = productos.find(p => p.id == marcador);
            agregarAlCarrito(producto);
        }
    });

    cargarCarritoDesdeLocalStorage();
});

// 14. Inicio para llamar las funciones
const productos = [
    { 
        id: 1, 
        nombre: 'Reloj Casio Edifice Cronógrafo Hombre EFV-550P-1AVUEF', 
        precio: 250000, 
        imagen: './img/CASIO_Hombre.jpg' 
    },
    { 
        id: 2, 
        nombre: 'Invicta Sea Spider Chronograph Quartz Blue Dial', 
        precio: 290000, 
        imagen: './img/INVICTA_Azul.jpg' 
    },
    { 
        id: 3, 
        nombre: 'Invicta Bolt Chronograph Quartz Black Dial', 
        precio: 310000, 
        imagen: './img/INVICTA_Negro.jpg' 
    },
    { 
        id: 4, 
        nombre: 'Reloj Michael Kors 6403 para Dama Dorado', 
        precio: 180000, 
        imagen: './img/KORS_Dama.jpg' 
    },
    { 
        id: 5, 
        nombre: 'Reloj G-SHOCK GA-2100SKE-7A Carbono/Resina Hombre Transparente', 
        precio: 270000, 
        imagen: './img/Reloj_Transparente.jpg' 
    },
    { 
        id: 6, 
        nombre: "Invicta Men's Pro Diver Quartz Stainless Steel Two Tone Watch 26972", 
        precio: 290000, 
        imagen: './img/INVICTA_Metalico.jpg' 
    }
];


