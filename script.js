const btnCarrito = document.querySelector("#btnCarrito");
const sidebar = document.querySelector(".sidebar");
let Divcotizacion = document.querySelector("#Divcotizacion");
let divImagenesOk = document.querySelector("#divImagenesOk");

btnCarrito.addEventListener("click", (e) => {
  sidebar.classList.toggle("active");
});

let productos = [
  {
    id: 1,
    nombre: "El gran mueble gran",
    precio: 1500,
    stock: 3,
    imagen: "./img/mueble1.png",
  },
  {
    id: 2,
    nombre: "Este jugador es de madera!",
    precio: 2300,
    stock: 2,
    imagen: "./img/mueble2.png",
  },
  {
    id: 3,
    nombre: "Pensa en la heladera, el mueble ya lo tenes",
    precio: 1000,
    stock: 20,
    imagen: "./img/mueble3.png",
  },
  {
    id: 4,
    nombre: "Mueble 2.0 Pro",
    precio: 5000,
    stock: 1,
    imagen: "./img/mueble4.png",
  }


];
// -----------------------

setInterval(()=>{
  fetch("https://criptoya.com/api/dolar") 
  .then(response=> response.json())
  .then(datos=> {
      let {oficial, blue} = datos
      Divcotizacion.innerHTML = `
          <div class="cajaDolar">
            <h2 class="my-1 mx-1 cajaDolar">Cotización del dolar en el local</h2>
            <h3 class="dolarHoy mx-1 my-1">Dolar oficial: ${oficial}</h3>
            <h3 class="dolarHoy mx-1 my-1">Dolar en nuestra página: ${blue}</h3>
            <p class="my-1">El valor de nuestros productos dolarizado se ajusta a las fluctuaciones del mercado local</p>
          </div>
          `

  })

},3000)

const caja = document.querySelector(".caja");

// localStorage con operador avanzado
let carrito = JSON.parse(localStorage.getItem('carrito')) ?? [];

function mostrarCards() {
    const cardsMap = productos.map((element) => {
      const { imagen, nombre, precio, id, stock } = element;
      if (stock >= 1) {
        return `<div class="cajita mx-2 my-3">
          <div>
            <img class="imgComic" src="${imagen}">
          </div>
          <div class="card-body">
            <h3>${nombre}</h3>
            <p>$${precio}</p>
            <p class="card-text">Stock: ${stock}</p>
            <button class="btn btn-secondary" id="agregar${id}">Agregar</button>
          </div>
      </div>`;
      } else {
        return `<div class="cajita">
        <div>
          <img class="imgComic card-img-top" src="${imagen}">
        </div>
        <div>
          <h3 class="card-title">${nombre}</h3>
          <p>$${precio}</p>
          <p>Stock: ${stock}</p>
          <button class="btn btn-secondary" disabled="true" id="agregar${id}">Agregar</button>
        </div>
      </div>`;
      }
    });
    caja.innerHTML = cardsMap.join("");
  
    escucharBotonAgregar();
  
}

function escucharBotonAgregar() {
productos.forEach((producto, index) => {
document
  .querySelector(`#agregar${producto.id}`)
  .addEventListener("click", () => {
    enviarAlCarrito(producto);
  });
});
}

function enviarAlCarrito(producto) {
    const existe = carrito.some((element) => element.id === producto.id);
    productos.map((element) => {
      if (element.id === producto.id) {
        element.stock--;
        return element;
      }
    });
  
    const productoAlCarrito = { ...producto, cantidad: 1 };

    delete productoAlCarrito.stock;

    if (existe) {
      carrito.map((element) => {
        if (element.id === producto.id) {
          element.cantidad++;
          return element;
        
        }
      });
    } else {
      carrito.push(productoAlCarrito);
    //   localStorage
      localStorage.setItem('carrito', JSON.stringify(carrito))
      
    }
    mostrarCards();
    pintarCarrito();
}

function pintarCarrito() {

    sidebar.innerHTML = "";
    carrito.forEach((element) => {
      sidebar.innerHTML += `
      <div class="cajita mx-1 my-2" style="width: 20rem;">
        <img src="${element.imagen}" class="card-img-top imgComicShop" alt="imagen mueble">
        <div class="card-body">
          <h5 class="card-title">${element.nombre}</h5>
          <p class="card-text">${element.precio}</p>
          <p class="card-text">${element.cantidad}</p>
          <a href="#" class="btnBorrar btn btn-dark mx-1 my-1" id="${element.id}">Eliminar</a>
        </div>
      </div>`


    });
  borrarProducto();
}
  
function borrarProducto() {

    let btnBorrar = document.querySelectorAll(".btnBorrar");
    btnBorrar.forEach((element) => {
      element.addEventListener("click", (e) => {

        let id = parseInt(e.target.id);

        let prod = carrito.find((element) => element.id === id);
        let cantidad = prod.cantidad;
  
    
        carrito = carrito.filter((element) => element.id !== id);

        let prodCarrito = productos.find((element) => element.id === id);
        
        prodCarrito.stock += cantidad;

        pintarCarrito();
        Toastify({
            text: "Producto Eliminado",
            duration: 3000,
            destination: "#",
            newWindow: true,
            close: true,
            gravity: "top", 
            position: "left", 
            stopOnFocus: true, 
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function(){} 
          }).showToast();
        mostrarCards();
      });
    });
    
}

function finalizarTransaccion (){
    let btnPagar= document.querySelector("#btnPagar");
    btnPagar.addEventListener("click", (e)=>{
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Transacción finalizada, te enmublizaste',
            showConfirmButton: false,
            timer: 1500
        })
    })
    
}

setInterval(()=>{
  fetch("jsonDesafíoFinal.json")
    .then(response=>response.json())
    .then(datos=>{
      divImagenesOk.innerHTML ="" 
    datos.forEach((dato)=>{
      let {img} = dato
      divImagenesOk.innerHTML =`
      <div>
        <h1 class="mx-5">Super Ofertas</h1>
      </div>
      <div class="imgBox mx-5 my-3" style="width: 7rem;">
        <div> 
          <img src="${img}" class="imgAbajoTamano" alt="imagen mueble">
        </div>  
      </div>
      <div class="imgBox mx-5 my-3" style="width: 7rem;">
        <div> 
          <img src="${img}" class="imgAbajoTamano" alt="imagen mueble">
        </div>  
      </div>
      <div class="imgBox mx-5 my-3" style="width: 7rem;">
        <div> 
          <img src="${img}" class="imgAbajoTamano" alt="imagen mueble">
        </div>  
      </div>
      <div class="imgBox mx-5 my-3" style="width: 7rem;">
      <div> 
        <img src="${img}" class="imgAbajoTamano" alt="imagen mueble">
      </div>  
      </div>
      <div class="imgBox mx-5 my-3" style="width: 7rem;">
      <div> 
        <img src="${img}" class="imgAbajoTamano" alt="imagen mueble">
      </div>  
      </div>
      <div class="imgBox mx-5 my-3" style="width: 7rem;">
      <div> 
        <img src="${img}" class="imgAbajoTamano" alt="imagen mueble">
      </div>  
      </div>
      <div class="imgBox mx-5 my-3" style="width: 7rem;">
      <div> 
        <img src="${img}" class="imgAbajoTamano" alt="imagen mueble">
      </div>  
      </div>
    `
      
    })
  })
},3000)  

// sidebar.innerHTML = "";
// carrito.forEach((element) => {
//   sidebar.innerHTML = `
//   <div class="cajita mx-1 my-2" style="width: 20rem;">
//     <img src="${element.imagen}" class="card-img-top imgComicShop" alt="imagen mueble">
//     <div class="card-body">
//       <h5 class="card-title">${element.nombre}</h5>
//       <p class="card-text">${element.precio}</p>
//       <p class="card-text">${element.cantidad}</p>
//       <a href="#" class="btnBorrar btn btn-dark mx-1 my-1" id="${element.id}">Eliminar</a>
//     </div>
//   </div>`


  
mostrarCards();
finalizarTransaccion()