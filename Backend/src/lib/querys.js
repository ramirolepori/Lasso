let XMLHttpRequest = require("xhr2");
const itm = require("@ibm-functions/iam-token-manager");
const { head } = require("../routes/cows");

function newToken() {
  const m = new itm({
    iamApikey: "QLubklSapRTsmcLP6u-0hGpD-O86sG8KTJxgJt5h6KAG",
  });
  return m
    .getToken()
    .then((token) => console.log("Authorization:", "Bearer", token));
}

function qRequest() {
  const xhr = new XMLHttpRequest();
  let data;
  xhr.open('GET', "https://s3.us-south.cloud-object-storage.appdomain.cloud/data-lake-cos-test/cows.json");
  /*for(let i = 0; i < header.length; i++){
    xhr.setRequestHeader(header[i]["nameHeader"], header[i]["valueHeader"]);
  }*/
  xhr.setRequestHeader("Authorization", newToken());
  xhr.send();
  xhr.responseType = 'JSON';
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
