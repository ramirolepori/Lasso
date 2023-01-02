let XMLHttpRequest = require("xhr2");

function newToken() {
  //convierto la respuesta en string y la guardo en la variable response
  let response = qRequest(
    "POST",
    "https://iam.cloud.ibm.com/identity/token",
    "string"
  );
  //busco el indice en donde termina el token
  let indice = response.indexOf('"refresh_token":"') - 2;
  //busco el token y lo guardo en la variable token
  let bearer = "Bearer ";
  let token = bearer.concat(response.substring(17, indice));
  //guardo el token en la variable por defecto
  return token;
}

function qRequest(typeQuery, url, responseType, header) {
  const xhr = new XMLHttpRequest();
  let data;
  xhr.open(typeQuery, url);
  xhr.setRequestHeader(header[0]["nameHeader"], header[0]["valueHeader"]);
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
