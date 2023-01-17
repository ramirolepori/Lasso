

const xhr = new XMLHttpRequest();

// Abre una nueva solicitud HTTP GET hacia el archivo JSON
xhr.open("GET", "./boceto-vaca.json");

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    console.log(data);
  }
};
xhr.send();
