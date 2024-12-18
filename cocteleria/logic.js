
function header() {
    let header = document.createElement("header");
    document.body.appendChild(header);
    header.id = "contentHeader"
    header.innerHTML = `
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Coctelería</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="index.html">Inicio</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">Carrito</a>
                </li>
            </ul>
            <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Buscar" aria-label="Search">
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



function crearTarjetas(array) {
    let sectionCards = document.createElement("section");
    sectionCards.classList.add("container", "pt-4", "text-center", "p-0", "justify-content-start")
    document.body.appendChild(sectionCards);
    let divGrid = document.createElement("div");
    divGrid.classList.add("row", "gap-5", "p-2", "d-flex", "justify-content-center", "row-4")
    sectionCards.appendChild(divGrid);

    array.forEach(function (element) {

        let divCard = document.createElement("div")

        divCard.id = element.idDrink
        divCard.style.width = "18rem"
        divGrid.appendChild(divCard);
        divCard.classList.add("card", "p-0", "shadow");
        let img = document.createElement("img")
        img.src = element.strDrinkThumb;
        img.classList.add("card-img-top")

        let divBody = document.createElement("div")
        divBody.classList.add("card-body")
        let h5 = document.createElement("h5")
        h5.classList.add("card-title", "mb-3");
        h5.textContent = element.strDrink;

        let p = document.createElement("p")
        p.textContent="15.00 €"
        p.classList.add("card-text")
        let hr = document.createElement("hr")
        hr.classList.add("shadow-sm")
        let boton = document.createElement("button")
        boton.textContent = "Añadir al Carrito"
        boton.classList.add("btn", "btn-primary")
        divCard.appendChild(img)
        divCard.appendChild(divBody)
        divBody.appendChild(h5)
        divBody.appendChild(p)

        divBody.appendChild(hr)
        divBody.appendChild(boton)

    });






}