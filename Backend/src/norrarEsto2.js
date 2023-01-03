let XMLHttpRequest = require("xhr2");
const itm = require("@ibm-functions/iam-token-manager");
//const { head } = require("../routes/cows");
  
  const m = new itm({
    iamApikey: "QLubklSapRTsmcLP6u-0hGpD-O86sG8KTJxgJt5h6KAG",
  });


 async function qRequestLake(typeQuery, valueName) {
  let archivo = "HOLAHOLA";

  const xhr = new XMLHttpRequest();
  let data;
  xhr.open(
    typeQuery,
    "https://s3.us-south.cloud-object-storage.appdomain.cloud/data-lake-cos-test/" + valueName
  );
  xhr.setRequestHeader("Authorization", "Bearer " + await m.getToken());
  xhr.send(JSON.stringify(archivo));
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      data = xhr.response;
      console.log(data);
    } else {
      console.log(`Error: ${xhr.status}`);
    }
  };
}

qRequestLake('GET','cows.json');
