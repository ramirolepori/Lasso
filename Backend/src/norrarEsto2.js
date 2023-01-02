let XMLHttpRequest = require("xhr2");
const itm = require("@ibm-functions/iam-token-manager");
//const { head } = require("../routes/cows");

function newToken() {
  const m = new itm({
    iamApikey: "QLubklSapRTsmcLP6u-0hGpD-O86sG8KTJxgJt5h6KAG",
  });
  return m
    .getToken()
    .then((token) => console.log("Authorization:", "Bearer", token));
}

let archivo = "HOLAHOLA"

const xhr = new XMLHttpRequest();
let data;
xhr.open(
  "PUT",
  "https://s3.us-south.cloud-object-storage.appdomain.cloud/data-lake-cos-test/cows2.csv"
);
/*for(let i = 0; i < header.length; i++){
    xhr.setRequestHeader(header[i]["nameHeader"], header[i]["valueHeader"]);
  }*/
  const token = newToken()
xhr.setRequestHeader("Authorization", token);
xhr.setRequestHeader("token", token);
xhr.setRequestHeader("content-type", "application/json");
console.log(JSON.stringify(archivo));
xhr.send(JSON.stringify(archivo));
xhr.onload = () => {
  if (xhr.readyState == 4 && xhr.status == 200) {
    data = xhr.response;
    console.log(data);
  } else {
    console.log(`Error: ${xhr.status}`);
  }
};
