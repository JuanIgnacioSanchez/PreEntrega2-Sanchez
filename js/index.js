/* Array de carrito donde se almacenarán los productos que el cliente desee */
let carrito = [];
let carritoLS = localStorage.getItem("carrito");

/* Operador ternario */

/* if (carritoLS) {
  carrito = JSON.parse(carritoLS);
} else {
  carrito = [];
} */

carritoLS ? (carrito = JSON.parse(carritoLS)) : (carrito = []);

/* Array de objetos (productos) */
const productos = [
  { icono: "👚", id: 1, nombre: "CAMISA ELEGANTE", precio: 20_800 },
  { icono: "👕", id: 2, nombre: "REMERA CASUAL", precio: 9_100 },
  { icono: "🎽", id: 3, nombre: "REMERA MUSCULOSA", precio: 6_400 },
  { icono: "👖", id: 4, nombre: "PANTALON DE JEAN", precio: 28_000 },
  { icono: "🎩", id: 5, nombre: "SOMBRERO DE GALA", precio: 19_500 },
  { icono: "👞", id: 6, nombre: "ZAPATOS DE GALA", precio: 65_900 },
  { icono: "🧥", id: 7, nombre: "BUZO OVERSIZE", precio: 25_900 },
  { icono: "👗", id: 8, nombre: "VESTIDO CORTO", precio: 10_500 },
  { icono: "🥿", id: 9, nombre: "SANDALIAS MUJER", precio: 2_900 },
  { icono: "🧢", id: 10, nombre: "GORRO STREET", precio: 6_900 },
  { icono: "👒", id: 11, nombre: "SOMBRERO DE PLAYA", precio: 8_900 },
  { icono: "👙", id: 12, nombre: "TRAJE DE BAÑO", precio: 25_900 },
  { icono: "👜", id: 13, nombre: "CARTERA DE CUERO", precio: 10_500 },
  { icono: "👢", id: 14, nombre: "BOTAS DE GALA", precio: 2_900 },
  { icono: "🕶", id: 15, nombre: "LENTES DE SOL", precio: 6_900 },
];

/* Creamos variables */
const container = document.querySelector("div#container.container");
const numeroContadorCarrito = document.querySelector(".contadorCarrito");
const carritoLSnumero = JSON.parse(localStorage.getItem("carrito"));
const inputSearch = document.querySelector("#input-search");

/* Cards en html */
function cardsHtml(producto) {
  return `<div class="div-card">
  <div class="imagen">
      <h1>${producto.icono}</h1>
  </div>
  <div class="prenda">
      <p>${producto.nombre}</p>
  </div>
  <div class="importe">
      <p>$ ${producto.precio}</p>
  </div>
  <div class="comprar"><button class="button button-outline" id="${producto.id}" codigo="${producto.id}">Agregar al carrito</button></div>
</div>`;
}

/* Funcion para recorrer array y que se generen las cards en html */
function generarCards(array) {
  container.innerHTML = "";
  array.forEach((producto) => {
    container.innerHTML += cardsHtml(producto);
  });
  agregarProductoCarrito();
}

generarCards(productos);

/* Función para buscar el código que ingresó el cliente en el array de productos */
function buscarPrenda(codigo) {
  const prenda = productos.find((producto) => producto.id === parseInt(codigo));
  return prenda;
}

/* Funcion para agregar productos al carrito */
function agregarProductoCarrito() {
  let btnsAgregarAlCarrito = document.querySelectorAll(
    "button.button.button-outline"
  );

  btnsAgregarAlCarrito.forEach((btn) => {
    btn.addEventListener("click", agregarAlCarrito);
  });
}

agregarProductoCarrito();

/* Funcion principal para agregar productos al carrito */
function agregarAlCarrito(e) {
  const idBtn = parseInt(e.target.id);
  const subirProductoAlCarrito = productos.find(
    (producto) => producto.id === idBtn
  );

  if (carrito.some((producto) => producto.id === idBtn)) {
    const index = carrito.findIndex((producto) => producto.id === idBtn);
    carrito[index].cantidad++;
    alert(`✔ Has agregado ${subirProductoAlCarrito.nombre} al carrito ✔`);
  } else {
    subirProductoAlCarrito.cantidad = 1;
    carrito.push(subirProductoAlCarrito);
    alert(`✔ Has agregado ${subirProductoAlCarrito.nombre} al carrito ✔`);
  }
  cantidadCarrito();

  localStorage.setItem("carrito", JSON.stringify(carrito));
}

/* Funcion para aumentar el contador del carrito */
function cantidadCarrito() {
  let cantidadCarrito = carrito.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
  numeroContadorCarrito.innerHTML = cantidadCarrito;
}

/* Funcion para buscar productos */
function buscarProducto() {
  inputSearch.addEventListener("input", () => {
    const productoBuscado = productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(inputSearch.value.toLowerCase())
    );
    generarCards(productoBuscado);
  });
}
buscarProducto();

carritoLSnumero & cantidadCarrito();

/* if (carritoLSnumero) {
  cantidadCarrito();
} */
