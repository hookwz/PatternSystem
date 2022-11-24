export const getStopList = data => {
  let List = [];
  for (let i = 0; i < data.length; i++) {
    let midName = { id: null, list: [] };
    midName.id = data[i].id;
    for (let j = 0; j < data[i].ownedData.length - 1; j++) {
      // let midObject = { source: null, target: null }
      let mid = [];
      let swData = data[i].ownedData[j];
      let nwData = data[i].ownedData[j + 1];
      if (
        (swData["stop"] == "0" && nwData["stop"] == "1") ||
        (swData["stop"] == "1" && nwData["stop"] == "0")
      ) {
        if (swData["stop"] == "0" && nwData["stop"] == "1") {
          mid.push("上车点");
        } else if (swData["stop"] == "1" && nwData["stop"] == "0") {
          mid.push("下车点");
        }
        mid.push(swData);
        mid.push(nwData);
        midName.list.push(mid);
      }
    }
    List.push(midName);
  }
  return List;
};
