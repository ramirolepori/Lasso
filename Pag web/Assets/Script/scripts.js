function myFunction() {
    var hideButton = document.querySelector(".hideButton");
    hideButton.addEventListener("click", function () {
        document.querySelector("body").classList.toggle("active");
    })
}


function initDetail() {
    // Abrir nuevo tab
    var win = window.open('../../details.html', '_blank');
    // Cambiar el foco al nuevo tab (punto opcional)
    win.focus();
  }
  
  