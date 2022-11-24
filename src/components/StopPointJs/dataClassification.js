export const dataClassification = data => {
  //按照车辆id进行分类，并按照时间进行排序
  let resultArray = []
  //先获取到id集合
  let idArray = []
  for (let i = 0; i < data.length; i++) {
    if (idArray.indexOf(data[i].id) == -1) {
      idArray.push(data[i].id)
    }
  }
  console.log(idArray)
  for (let i = 0; i < idArray.length; i++) {
    let midObject = { id: idArray[i], ownedData: [] }
    for (let j = 0; j < data.length; j++) {
      if (data[j].id == idArray[i]) {
        midObject.ownedData.push(data[j])
      }
    }
    resultArray.push(midObject)
  }
  console.log(resultArray)
  //然后将它按照时间进行排序
  function compare(obj1, obj2) {
    let val1 = obj1.time
    let val2 = obj2.time
    if (val1 < val2) {
      return -1
    } else if (val1 > val2) {
      return 1
    } else {
      return 0
    }
  }
  for (let i = 0; i < resultArray.length; i++) {
    resultArray[i].ownedData.sort(compare)
  }
  console.log(resultArray)
  return resultArray
}
