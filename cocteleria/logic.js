
function header() {
    let header = document.createElement("header");
    document.body.appendChild(header);
    header.id = "contentHeader"
    header.innerHTML = `
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container">
            <a class="navbar-brand p-2 " href="#">Coctelería</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse container" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 align-items-lg-center ms-4">
                    <li class="nav-item ms-4 me-4 ms-sm-2">
                        <a class="nav-link active ms-sm-1 me-4 me-sm-0" aria-current="page" href="index.html">Inicio</a>
                    </li>
                    <li class="nav-item ">
                        <div class="d-flex align-items-center">
                            <button class="btn btn-light bg-transparent border-0 " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">Ver Carrito</button>
                            <i class="fa-solid fa-cart-shopping "></i>
                        </div>
                        
                    </li>
                    
                </ul>
                <form class="d-flex " role="search">
                    <input class="form-control me-2 ms-sm-4" type="search" placeholder="Buscar" aria-label="Search" style="width: 250px";>
                    <button class="btn btn-outline-success" type="submit">Buscar</button>
                </form>
            </div>
        </div>
    </nav>
    
    `
}
header();


function accederAPI() {
    const url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Rum"
    fetch(url)
        .then((resp) => resp.json())
        .then((resp) => crearTarjetas(resp.drinks))
}
accederAPI();


function addProductoCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("productos")) || [];

    let productoExistente = carrito.find(item => item.id === producto.id);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        producto.cantidad = 1;
        carrito.push(producto);
    }

    localStorage.setItem("productos", JSON.stringify(carrito));
    actualizarCarrito();
}

function crearTarjetas(array) {
    
    let sectionCards = document.createElement("section");
    sectionCards.classList.add("container", "pt-4", "text-center", "p-0", "justify-content-start");
    document.body.appendChild(sectionCards);

    let divGrid = document.createElement("div");
    divGrid.classList.add("row", "gap-5", "p-2", "d-flex", "justify-content-center", "row-4");
    sectionCards.appendChild(divGrid);

    array.forEach(function (element) {
        let divCard = document.createElement("div");
        divCard.id = element.idDrink;
        divCard.style.width = "18rem";
        divGrid.appendChild(divCard);
        divCard.classList.add("card", "p-0", "shadow");

        let img = document.createElement("img");
        img.src = element.strDrinkThumb;
        img.classList.add("card-img-top");

        let divBody = document.createElement("div");
        divBody.classList.add("card-body");

        let h5 = document.createElement("h5");
        h5.classList.add("card-title", "mb-3");
        h5.textContent = element.strDrink;

        let p = document.createElement("p");
        p.textContent = "15.00 €"; 
        p.classList.add("card-text");

        let hr = document.createElement("hr");
        hr.classList.add("shadow-sm");

        let boton = document.createElement("button");
        boton.textContent = "Añadir al Carrito";
        boton.classList.add("btn", "btn-info");
        boton.addEventListener("click", function () {
            const producto = {
                id: element.idDrink,
                nombre: element.strDrink,
                imagen: element.strDrinkThumb,
                precio: 15.0,
            };
            addProductoCarrito(producto);
        });

        divCard.appendChild(img);
        divCard.appendChild(divBody);
        divBody.appendChild(h5);
        divBody.appendChild(p);
        divBody.appendChild(hr);
        divBody.appendChild(boton);
    });
}

function actualizarCarrito() {
    let carrito = JSON.parse(localStorage.getItem("productos")) || [];
    let productosCarrito = document.getElementById("productosCarrito");
    let totalCarrito = document.getElementById("totalCarrito");

    productosCarrito.innerHTML = "";

    let total = 0;

    carrito.forEach((producto, index) => {
        total += producto.precio * producto.cantidad; 

        let productoDiv = document.createElement("div");
        productoDiv.classList.add("d-flex", "justify-content-between", "align-items-center", "mb-2");

        productoDiv.innerHTML = `
            <div class="d-flex align-items-center ms-1" style="width: 180px;">
                <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: 50px; object-fit: cover;" class="me-3 rounded">
                <span class="fw-light ">${producto.nombre}</span>
            </div>
            <div>
                <span>${producto.precio.toFixed(2)} € x ${producto.cantidad}</span>
                <button class="btn btn-danger btn-sm ms-3" data-index="${index}">Eliminar</button>
            </div>
        `;

        productosCarrito.appendChild(productoDiv);
    });

    totalCarrito.textContent = total.toFixed(2);

    productosCarrito.querySelectorAll(".btn-danger").forEach((boton) => {
        boton.addEventListener("click", function () {
            let index = this.getAttribute("data-index");
            eliminarProductoCarrito(index);
        });
    });
}

function eliminarProductoCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem("productos")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("productos", JSON.stringify(carrito));
    actualizarCarrito();
}

document.querySelector("[data-bs-target='#offcanvasWithBothOptions']").addEventListener("click", actualizarCarrito);

function generarFactura() {
    const { jsPDF } = window.jspdf; 
    const doc = new jsPDF(); 

    let carrito = JSON.parse(localStorage.getItem("productos")) || [];
    
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Factura de Pedido', 20, 20);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Coctelería Nayara', 20, 30);
    doc.text('Dirección: Calle Diaz Pimienta 10', 20, 35);
    doc.text('Teléfono: 123-456-789', 20, 40);
    doc.text('Correo: contacto@cocteleria.com', 20, 45);

    const fecha = new Date().toLocaleDateString();
    doc.text('Fecha: ' + fecha, 150, 30);

    doc.setDrawColor(0);
    doc.line(20, 50, 190, 50); 

    doc.setFontSize(12);
    doc.text('Producto', 20, 60);
    doc.text('Cantidad', 120, 60);
    doc.text('Precio Unitario', 150, 60);
    doc.text('Total', 180, 60);

    doc.line(20, 62, 190, 62); 

    let y = 65;
    let totalPedido = 0;

    carrito.forEach(producto => {
        doc.text(producto.nombre, 20, y);
        doc.text(producto.cantidad.toString(), 120, y);
        doc.text(`${producto.precio.toFixed(2)} €`, 150, y);
        let totalProducto = producto.precio * producto.cantidad;
        doc.text(`${totalProducto.toFixed(2)} €`, 180, y);

        totalPedido += totalProducto;
        y += 10; 
    });

    doc.line(20, y, 190, y); 

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Total del Pedido: ' + totalPedido.toFixed(2) + ' €', 120, y + 10, { align: 'right' });

    doc.save('factura_pedido.pdf');
}


function panelCarrito() {
    let divPanel = document.createElement("div");
    document.body.appendChild(divPanel);
    divPanel.innerHTML = `
        <div class="offcanvas offcanvas-end" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Carrito de Compras</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div id="productosCarrito"></div>
                <hr>
                <h5>Total: <span id="totalCarrito">0.00</span> €</h5>
                <button class="btn btn-primary mt-3" type="button" onclick="generarFactura()">Generar Factura</button>
            </div>
        </div>
    `;
}
panelCarrito();