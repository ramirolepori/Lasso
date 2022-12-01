function myFunction() {
    var hideButton = document.querySelector(".hideButton");
    hideButton.addEventListener("click", function () {
        document.querySelector("body").classList.toggle("active");
    })
}