function agregarEventoClickOpcionPerfil() {
  // Seleccionamos los elementos del DOM que necesitamos
  const opcionPerfil = document.querySelector('.opcion-perfil');
  const listaOpciones = document.querySelector('.lista-opciones');
  // Creamos una variable para almacenar el estado actual del menú (si está mostrado o oculto)
  let menuMostrado = false;

  // Asignamos un manejador de evento al elemento opcionPerfil para que se ejecute al hacer clic
  opcionPerfil.addEventListener('click', () => {
    // Si el menú está mostrado, ocultamos el menú
    if (menuMostrado) {
      listaOpciones.style.display = 'none';
    }
    // Si el menú está oculto, mostramos el menú
    else {
      listaOpciones.style.display = 'block';
    }
    // Cambiamos el valor de la variable menuMostrado para reflejar el nuevo estado del menú
    menuMostrado = !menuMostrado;
  });
}

//Seccion para cargar los datos de la tabla del historial de alertas en funcion al json////////////////////
function cargarDatosJSON() {
  // Crea una nueva instancia de XMLHttpRequest
  const xhr = new XMLHttpRequest();
  // Abre una nueva solicitud HTTP GET hacia el archivo JSON
  xhr.open("GET", "http://localhost:3000/registroGanado.json");
  // Especifica qué hacer cuando se recibe la respuesta del servidor
  xhr.onload = function () {
    // Si la solicitud fue exitosa (código HTTP 200)
    if (xhr.status === 200) {
      // Parsea el contenido de la respuesta como un objeto JavaScript
      const datos = JSON.parse(xhr.responseText);
      // Recorre cada entrada del objeto y crea una fila en la tabla con sus valores
      for (const key in datos) {
        const entrada = datos[key];
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <th>${key}</th>
            <td>${entrada.idSensor}</td>
            <td>${key}</td>
            <td>${entrada.ubicaciones[entrada.ubicaciones.length - 1].long}</td>
            <td>${entrada.ubicaciones[entrada.ubicaciones.length - 1].lat}</td>
            <td>${entrada.ubicaciones[entrada.ubicaciones.length - 1].dateTime.toString().replaceAll("T", " ").split(".", 1)}</td>
            <td><button type="button" class="btn btn-info"
            onclick="window.open('testDelete.html','_blank')">Consultar</button></td>
          `;
        document.getElementById("tabla-historial-alertas").appendChild(fila);
      }
      // Muestra la primera página al cargar la página
      mostrarPagina(0, document.getElementById("tabla-historial-alertas"));
      crearBotonesPaginacion(0, document.getElementById("tabla-historial-alertas"), document.getElementById("pagination"));
      filtradoTablas();
    }
  };
  // Envía la solicitud
  xhr.send();
}

//LA FUNCION DE FILTRADO FUNCIONA, PERO PARA MANEJAR MUCHAS ENTRADAS ES MUY LERDA
function filtradoTablas() {
  const tablaFiltrado = document.getElementById("tabla-historial-alertas");
  const busquedaFiltrado = document.getElementById("busqueda-historial-alertas");
 if (location.pathname == '/Pag%20web%20-%20Limpio/index.html') {
    busquedaFiltrado.addEventListener("input", () => {
      const txt = busquedaFiltrado.value.toLowerCase().trim();
      if (txt == '') {
        mostrarPagina(0, document.getElementById("tabla-historial-alertas"));
      } else {
        for (let i = 1; i < tablaFiltrado.rows.length; i++) {
          const columna = tablaFiltrado.rows[i].cells[1].textContent.toLowerCase();
          if (columna.indexOf(txt) > -1) {
            tablaFiltrado.rows[i].style.display = "";
          } else {
            tablaFiltrado.rows[i].style.display = "none";
          }
        }
      }
    });
  }
}

//Seccion de paginacion de tabla historial alertas  
// Función que muestra una página determinada
function mostrarPagina(paginaActual, tabla) {
  // Establece el número de filas por página (modifica este valor según tus necesidades)
  const filasPorPagina = 10;
  // Oculta todas las filas de la tabla
  for (let i = 0; i < tabla.rows.length; i++) {
    tabla.rows[i].style.display = "none";
  }
  // Muestra solo las filas de la página actual
  for (let i = paginaActual * filasPorPagina; i < (paginaActual + 1) * filasPorPagina; i++) {
    if (tabla.rows[i]) {
      tabla.rows[i].style.display = "table-row";
    }
  }
}

// Crea y muestra los botones de página
function crearBotonesPaginacion(paginaActual, tabla, contenedor) {
  // Establece el número de filas por página (modifica este valor según tus necesidades)
  const filasPorPagina = 10;
  // Calcula el número total de páginas
  const numeroTotalPaginas = Math.ceil(tabla.rows.length / filasPorPagina);
  //Primero elimina todos los botones ya existentes en caso que existan.
  while (document.getElementById("btn-paginacion")) {
    document.getElementById("btn-paginacion").parentNode.removeChild(document.getElementById("btn-paginacion"));
  }
  //Luego creamos los botones
  for (let i = 0; i < numeroTotalPaginas; i++) {
    const botonPagina = document.createElement("button");
    botonPagina.setAttribute("id", "btn-paginacion");
    botonPagina.classList.add("boton-paginacion");
    botonPagina.innerText = i + 1;
    botonPagina.addEventListener("click", function () {
      mostrarPagina(i, tabla);
      //El siguiente codigo es para solo mostrar los 3 botones proximos al boton de la pagina activa
      console.log(contenedor.children.length);
      for (let i = 0; i < contenedor.children.length; i++) {
        contenedor.children[i].style.display = "none";
      }
      // Muestra los 3 botones previos y siguientes al botón seleccionado
      if (paginaActual > 0) {
        for (let i = paginaActual - 3; i <= paginaActual; i++) {
          if (i >= 0) {
            contenedor.children[i].style.display = "inline-block";
          }
        }
      }
      if (paginaActual < numeroTotalPaginas - 1) {
        for (let i = paginaActual + 1; i <= paginaActual + 3; i++) {
          if (i < numeroTotalPaginas) {
            contenedor.children[i].style.display = "inline-block";
          }
        }
      }
      // Muestra el botón seleccionado
      contenedor.children[paginaActual].style.display = "inline-block";
      //Funcionalidad para enviar cantidad de entradas en la tabla de paginacion.
      const numeroTotalFilas = tabla.rows.length;
      document.getElementById("txt-cant-filas").innerHTML = `Mostrando 10 de ${numeroTotalFilas - 1} entradas`;
    });
    /*botonPagina.addEventListener("click", function () {
      crearBotonesPaginacion(i, tabla, contenedor);
    });*/
    contenedor.appendChild(botonPagina);
  }
  setBotonPrimeroUltimoPaginacion(tabla);
  //El siguiente codigo es para solo mostrar los 3 botones proximos al boton de la pagina activa
  for (let i = 0; i < contenedor.children.length; i++) {
    contenedor.children[i].style.display = "none";
  }
  // Muestra los 3 botones previos y siguientes al botón seleccionado
  if (paginaActual > 0) {
    for (let i = paginaActual - 3; i <= paginaActual; i++) {
      if (i >= 0) {
        contenedor.children[i].style.display = "inline-block";
      }
    }
  }
  if (paginaActual < numeroTotalPaginas - 1) {
    for (let i = paginaActual + 1; i <= paginaActual + 3; i++) {
      if (i < numeroTotalPaginas) {
        contenedor.children[i].style.display = "inline-block";
      }
    }
  }
  // Muestra el botón seleccionado
  contenedor.children[paginaActual].style.display = "inline-block";
  //Funcionalidad para enviar cantidad de entradas en la tabla de paginacion.
  const numeroTotalFilas = tabla.rows.length;
  document.getElementById("txt-cant-filas").innerHTML = `Mostrando 10 de ${numeroTotalFilas - 1} entradas`;
}


////Funcion para setear por unica vez los botones de primera y ultima pagina/////////////////////////////
function setBotonPrimeroUltimoPaginacion(tabla) {
  // Establece el número de filas por página (modifica este valor según tus necesidades)
  const filasPorPagina = 10;
  // Calcula el número total de páginas
  const numeroTotalPaginas = Math.ceil(tabla.rows.length / filasPorPagina);
  //Funcionalidad botones primera y ultima pagina
  const primerPaginaBoton = document.getElementById("primeraPagina");
  primerPaginaBoton.addEventListener("click", function () {
    mostrarPagina(0, tabla);
    //La llamada a funcion debajo hay que corregirla, crea una cantidad excesiva de botones cada vez
    crearBotonesPaginacion(0, tabla, document.getElementById("pagination"));
  });
  const ultimaPaginaBoton = document.getElementById("ultimaPagina");
  ultimaPaginaBoton.addEventListener("click", function () {
    mostrarPagina(numeroTotalPaginas - 1, tabla);
    crearBotonesPaginacion(numeroTotalPaginas - 1, tabla, document.getElementById("pagination"));
  });
}


document.addEventListener("DOMContentLoaded", function () {
  cargarDatosJSON();
  agregarEventoClickOpcionPerfil();
  wait(1000);
});

window.onload = () => {  
  // Muestra la primera página al cargar la página
  //mostrarPagina(0, document.getElementById("tabla-historial-alertas"));
  //crearBotonesPaginacion(0, document.getElementById("tabla-historial-alertas"), document.getElementById("pagination"));
  //setBotonPrimeroUltimoPaginacion(document.getElementById("tabla-historial-alertas"));
};

function wait(ms) {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}
