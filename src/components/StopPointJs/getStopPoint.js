export const getStopPoint = data => {
  //这里获取上车点
  let upresult = []
  // console.log(data[0].ownedData[0].stop)
  for (let i = 0; i < data.length; i++) {
    //这里是为了获取到停驻点,对于程序来说，所以载客点是从0到1的时候，下车点是1到0的时候，还有就是速度,如果长时间停留在一个地点，一般是堵车或者红绿灯，也有可能是出租车在某一块区域一直慢行等待乘客
    for (let j = 0; j < data[i].ownedData.length - 1; j++) {
      let midObject = { source: null, target: null }
      let swData = data[i].ownedData[j]
      let nwData = data[i].ownedData[j + 1]
      if (swData['stop'] == '0' && nwData['stop'] == '1') {
        midObject.source = swData
        midObject.target = nwData
        upresult.push(midObject)
      }
    }
  }
  // console.log(upresult)

  //这里获取下车点
  let downresult = []

  for (let i = 0; i < data.length; i++) {
    //这里是为了获取到停驻点,对于程序来说，所以载客点是从0到1的时候，下车点是1到0的时候，还有就是速度,如果长时间停留在一个地点，一般是堵车或者红绿灯，也有可能是出租车在某一块区域一直慢行等待乘客
    for (let j = 0; j < data[i].ownedData.length - 1; j++) {
      let midObject = { source: null, target: null }
      let swData = data[i].ownedData[j]
      let nwData = data[i].ownedData[j + 1]
      if (swData['stop'] == '1' && nwData['stop'] == '0') {
        midObject.source = swData
        midObject.target = nwData
        downresult.push(midObject)
      }
    }
  }
  // console.log(downresult)

  return { upresult, downresult }
}
