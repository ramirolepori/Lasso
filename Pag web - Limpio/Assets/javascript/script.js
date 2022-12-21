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
  };
  