var FileSaver = require("file-saver");

export const saveJson = (data,fn) => {
  function switchData(array) {
    var jsondata = JSON.stringify(Object.assign([], array));
    console.log(jsondata);
    return jsondata;
  }
  var content = switchData(data);
  var blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  FileSaver.saveAs(blob, fn);
};



