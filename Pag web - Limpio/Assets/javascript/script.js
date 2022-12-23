window.onload = () => {
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

  //Seccion de filtrado en la tabla de historial de alertas/////////////////////////////////
  const tablaFiltrado = document.getElementById("tabla-historial-alertas");
  const busquedaFiltrado = document.getElementById("busqueda-historial-alertas");

  busquedaFiltrado.addEventListener("input", () => {

    const txt = busquedaFiltrado.value.toLowerCase();
    if (txt == '') {
      mostrarPagina(0);
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
  ////////////////////////////////////////////////////////////////////////////////////////////

  //Seccion de paginacion de tabla historial alertas
  // Selecciona la tabla y el contenedor de los botones de página
  const tablaPaginacion = document.getElementById("tabla-historial-alertas");
  const contenedorBotonesPagina = document.getElementById("pagination");

  // Establece el número de filas por página (modifica este valor según tus necesidades)
  const filasPorPagina = 10;

  // Calcula el número total de páginas
  const numeroTotalPaginas = Math.ceil(tablaPaginacion.rows.length / filasPorPagina);

  // Función que muestra una página determinada
  function mostrarPagina(paginaActual) {
    // Oculta todas las filas de la tabla
    for (let i = 0; i < tablaPaginacion.rows.length; i++) {
      tablaPaginacion.rows[i].style.display = "none";
    }

    // Muestra solo las filas de la página actual
    for (let i = paginaActual * filasPorPagina; i < (paginaActual + 1) * filasPorPagina; i++) {
      if (tablaPaginacion.rows[i]) {
        tablaPaginacion.rows[i].style.display = "table-row";
      }
    }
  }

  // Crea y muestra los botones de página
  for (let i = 0; i < numeroTotalPaginas; i++) {
    const botonPagina = document.createElement("button");
    botonPagina.classList.add("boton-paginacion");
    botonPagina.innerText = i + 1;
    botonPagina.addEventListener("click", function () {
      mostrarPagina(i);
    });
    contenedorBotonesPagina.appendChild(botonPagina);
  }

  // Muestra la primera página al cargar la página
  mostrarPagina(0);

  //Funcionalidad botones primera y ultima pagina
  document.getElementById("primeraPagina").addEventListener("click", function () {
    mostrarPagina(0);
  });

  document.getElementById("ultimaPagina").addEventListener("click", function () {
    mostrarPagina(numeroTotalPaginas - 1);
  });


  //Funcionalidad para enviar cantidad de entradas en la tabla de paginacion.
  const numeroTotalFilas = tablaPaginacion.rows.length;
  document.getElementById("txt-cant-filas").innerHTML = `Mostrando 10 de ${numeroTotalFilas - 1} entradas`;


  ////////////////////////////////////////////////////////////////////////////
};
