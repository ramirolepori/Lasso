let XMLHttpRequest = require("xhr2");
const itm = require("@ibm-functions/iam-token-manager");

const m = new itm({
  iamApikey: "QLubklSapRTsmcLP6u-0hGpD-O86sG8KTJxgJt5h6KAG",
});

async function qRequestLake(typeQuery, valueName, archivo = "") {
  const xhr = new XMLHttpRequest();
  let data;
  xhr.open(
    typeQuery,
    "https://s3.us-south.cloud-object-storage.appdomain.cloud/data-lake-cos-test/" +
      valueName
  );
  xhr.setRequestHeader("Authorization", "Bearer " + (await m.getToken()));
  xhr.send(JSON.stringify(archivo));
  if (xhr.readyState === XMLHttpRequest.DONE) {
    return xhr;
  }

  let res;
  const p = new Promise((r) => (res = r));
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      res(xhr);
    }
  };
  return p;
}

module.exports = {
  qRequestLake: qRequestLake,
};
