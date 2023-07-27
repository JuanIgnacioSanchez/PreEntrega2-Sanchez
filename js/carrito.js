const containerCarrito = document.querySelector("table.containerCarrito");
const numeroContadorCarrito = document.querySelector(".contadorCarrito");
const tableCarrito = document.querySelector(".table-carrito");
const carritoLSnumero = JSON.parse(localStorage.getItem("carrito"));
const carritoDeLS = JSON.parse(localStorage.getItem("carrito"));
const numeroTotalCarrito = document.querySelector("#numero-total-carrito");
const botonesQuitarProducto = document.querySelectorAll("td.quitarProducto");

/* Funcion para aumentar el contador de productos en el carrito */
function cantidadCarrito() {
  let cantidadCarrito = carritoDeLS.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
  numeroContadorCarrito.innerHTML = cantidadCarrito;
}

/* Tabla de productos */
function tableHtml(producto) {
  return `<tr>
    <td class="icono-producto">${producto.icono}</td>
    <td class="cantidad-producto">${producto.cantidad}</td>
    <td class="nombre-producto">${producto.nombre}</td>
    <td class="precio-producto">$${producto.precio}</td>
    <td class="quitar-producto">
      <button class="quitarProducto" type="button" id="${parseInt(
        producto.id
      )}">❌</button>
    </td>
  </tr>`;
}

/* Funcion para mostrar productos en el carrito controlando el DOM */
function generarFilasCarrito(array) {
  containerCarrito.innerHTML = "";
  array.forEach((producto) => {
    containerCarrito.innerHTML += tableHtml(producto);
  });
}

/*  Función para sumar todos los precios de los productos ingresados al carrito */
function sumarPreciosCarrito(array) {
  const total = array.reduce(
    (acumulador, producto) => acumulador + producto.precio * producto.cantidad,
    0
  );
  return total;
}

/* Funcion para modificar el DOM y mostrar el total del carrito */
function mostrarTotalCarrito() {
  numeroTotalCarrito.innerHTML = "";
  numeroTotalCarrito.innerHTML += sumarPreciosCarrito(carritoDeLS);
}

/* Funcion para quitar productos del carrito */
function eliminarProductoDelCarrito(event) {
  const btn = event.target;
  if (btn.classList.contains("quitarProducto")) {
    const productoId = parseInt(btn.id);
    const index = carritoDeLS.findIndex(
      (item) => parseInt(item.id) === productoId
    );

    if (index !== -1) {
      carritoDeLS[
        index
      ].cantidad -= 1; /* Resta uno a la cantidad del producto */
      if (carritoDeLS[index].cantidad <= 0) {
        carritoDeLS.splice(
          index,
          1
        ); /* Si la cantidad llega a cero o menos, se elimina el producto del carrito */

        // Actualizar el almacenamiento local con el carrito actualizado
        localStorage.setItem("carrito", JSON.stringify(carritoDeLS));
      }

      // Vuelve a generar la lista de productos en el carrito después de actualizar la cantidad o eliminar el producto
      generarFilasCarrito(carritoDeLS);
      // Actualiza el total del carrito después de eliminar o actualizar la cantidad del producto
      mostrarTotalCarrito();
      // Actualiza el contador de productos en el carrito después de eliminar o actualizar la cantidad del producto
      cantidadCarrito();
    }
  }
}

/* Agregar el evento click a los botones de eliminar productos */
document.addEventListener("click", eliminarProductoDelCarrito);

/* carritoLSnumero & cantidadCarrito(); */

if (carritoLSnumero) {
  cantidadCarrito();
}

if (carritoDeLS) {
  generarFilasCarrito(carritoDeLS);
  mostrarTotalCarrito();
}
