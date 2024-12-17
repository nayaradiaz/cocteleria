
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



function crearTarjetas() {
    const url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Rum"
    fetch(url)
        .then((resp) => resp.json())
        .then((resp) => decir(resp.drinks))
}
crearTarjetas();

function decir(array) {
    array.forEach(((element) => console.log(element)))






}