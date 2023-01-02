let XMLHttpRequest = require("xhr2");
const { head } = require("../routes/cows");

function newToken() {
  //convierto la respuesta en string y la guardo en la variable response
  let response = qRequest(
    "POST",
    "https://iam.cloud.ibm.com/identity/token",
    "string"
  );
  console.log(response);
  //busco el indice en donde termina el token
  let indice = response.indexOf('"refresh_token":"') - 2;
  //busco el token y lo guardo en la variable token
  let bearer = "Bearer ";
  let token = bearer.concat(response.substring(17, indice));
  //guardo el token en la variable por defecto
  return token;
}

function qRequest(typeQuery, url, responseType, header = []) {
  const xhr = new XMLHttpRequest();
  let data;
  xhr.open(typeQuery, url);
  for(let i = 0; i < header.length; i++){
    xhr.setRequestHeader(header[i]["nameHeader"], header[i]["valueHeader"]);
  }
  xhr.send();
  xhr.responseType = responseType;
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      data = xhr.response;
      console.log(data);
    } else {
      console.log(`Error: ${xhr.status}`);
    }
  };

  return data;
}

module.exports = {
  qRequest: qRequest,
  newToken: newToken,
};
