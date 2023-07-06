/* Consignas de la segunda entrega
1- Declarar variables y objetos necesarios OK
2- Crear funciones y metodos para realizar operaciones matematicas OK
3- Usar entradas con prompts y confirm, salidas con alerts o console.x OK
4- Arrays y metodos de busqueda y filtrado sobre este mismo OK
 */

/* Array de carrito donde se almacenarán los productos que el cliente desee */
const carrito = [];

/* Array de objetos (productos) */
const productos = [
  { icono: "👚", id: 1, nombre: "CAMISA ELEGANTE", precio: 20_800 },
  { icono: "👕", id: 2, nombre: "REMERA CASUAL", precio: 9_100 },
  { icono: "🎽", id: 3, nombre: "REMERA MUSCULOSA", precio: 6_400 },
  { icono: "👖", id: 4, nombre: "JEAN DE GALA", precio: 28_000 },
  { icono: "🎩", id: 5, nombre: "SOMBRERO DE GALA", precio: 19_500 },
  { icono: "👞", id: 6, nombre: "ZAPATOS DE GALA", precio: 65_900 },
  { icono: "🩱", id: 7, nombre: "TRAJE DE BAÑO", precio: 15_400 },
  { icono: "🥿", id: 8, nombre: "SANDALIAS", precio: 30_900 },
  { icono: "👟", id: 9, nombre: "ZAPATILLAS RUNNING", precio: 38_000 },
];

/*  Función para sumar todos los precios de los productos ingresados al carrito */
function sumarPreciosCarrito() {
  const subtotal = carrito.reduce(
    (acumulador, producto) => acumulador + producto.precio,
    0
  );
  return subtotal;
}

/* Función para buscar el código que ingresó el cliente en el array de productos */
function buscarPrenda(codigo) {
  const prenda = productos.find((producto) => producto.id === parseInt(codigo));
  return prenda;
}

/* Programa con todas las funciones craedas */
function comprarProducto() {
  let codigo = parseInt(
    prompt(
      "Completa el cuadro de texto con el número correspondiente de la prenda que desea comprar."
    )
  );
  let productoElegido = buscarPrenda(codigo);
  if (codigo !== undefined && codigo < 10 && codigo > 0) {
    carrito.push(productoElegido);
    alert(`✔ Se ha agregado ${productoElegido.nombre} al carrito ✔`);
    const agregarProducto = confirm(
      "¿Deseas agregar otro producto al carrito?"
    );
    if (agregarProducto === true) {
      comprarProducto();
    } else {
      console.table(carrito);
      console.log("El total de su carrito es de 💲" + sumarPreciosCarrito());
    }
  } else {
    alert(
      "❌ El código que ingresó no existe, recargue la página para volver a correr el programa. ❌"
    );
  }
}
