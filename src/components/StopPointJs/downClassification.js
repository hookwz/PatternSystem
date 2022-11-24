export const downClassification = data => {
  let result = []
  let idArray = []
  //仍然先是获取id
  //   console.log(data)
  for (let i = 0; i < data.length; i++) {
    if (idArray.indexOf(data[i].source.id) == -1) {
      idArray.push(data[i].source.id)
    }
  }
  //这里就不一定所有车这天都会有人上车，也有一直都没有能打到人的出租车用户
  //   console.log(idArray)
  for (let i = 0; i < idArray.length; i++) {
    let midObject = { id: idArray[i], downPoint: [] }
    for (let j = 0; j < data.length; j++) {
      if (data[j].source.id == idArray[i]) {
        midObject.downPoint.push(data[j])
      }
    }
    result.push(midObject)
  }
  //   console.log(result)

  return result
}
