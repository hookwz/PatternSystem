//1代表已经合并的数组集合，2代表待合并的数组集合
export const myAreaMerge = (objectdata1, objectdata2) => {
  // console.log(objectdata1)
  // console.log(objectdata2)
  let FinalArray;
  //这里获得交集
  let intersectionArray = [];
  for (let i = 0; i < objectdata1.length; i++) {
    for (let j = 0; j < objectdata2.length; j++) {
      if (
        objectdata1[i][0] == objectdata2[j][0] &&
        objectdata1[i][1] == objectdata2[j][1]
      ) {
        intersectionArray.push(objectdata1[i]);
      }
    }
  }
  // console.log(intersectionArray)

  let FullInclusion = 0;
  //这里判断是否是彻底包含关系
  function JudgeArray(data1, data2) {
    for (let i = 0; i < data1.length; i++) {
      if (arrayHasEl(data2, data1[i]) == false) {
        return false;
      }
    }
    return true;
  }

  if (
    JudgeArray(objectdata2, intersectionArray) == true &&
    objectdata2.length == intersectionArray.length
  ) {
    FullInclusion = 1;
  }

  function arrayHasEl(array, ele) {
    for (let el of array) {
      if (el.length == ele.length) {
        for (let index in el) {
          if (el[index] !== ele[index]) {
            break;
          }
          if (index == el.length - 1) {
            return true;
          }
        }
      }
    }
    return false;
  }
  function getInter(intersectionArray) {
    //然后判断应该取得那两个交集点作为跳转点,如果是只有两个点集，则直接返回这两个点作为跳转点，如果有多个，则需要判断，最外侧的两个交点是那两个，特点就是它们有一侧的上或下一个连接点不是交集点
    if (intersectionArray.length == 2) {
      return intersectionArray;
    } else {
      let getIntersectionPoint = [];
      for (let i = 0; i < intersectionArray.length; i++) {
        for (let j = 0; j < objectdata1.length; j++) {
          if (
            JSON.stringify(objectdata1[j]) ==
            JSON.stringify(intersectionArray[i])
          ) {
            if (j != 0 && j != objectdata1.length - 1) {
              if (
                arrayHasEl(intersectionArray, objectdata1[j - 1]) == false ||
                arrayHasEl(intersectionArray, objectdata1[j + 1]) == false
              ) {
                getIntersectionPoint.push(objectdata1[j]);
              }
            } else if (j == 0) {
              if (
                arrayHasEl(
                  intersectionArray,
                  objectdata1[objectdata1.length - 1]
                ) == false ||
                arrayHasEl(intersectionArray, objectdata1[j + 1]) == false
              ) {
                getIntersectionPoint.push(objectdata1[j]);
              }
            } else if (j == objectdata1.length - 1) {
              if (
                arrayHasEl(intersectionArray, objectdata1[j - 1]) == false ||
                arrayHasEl(intersectionArray, objectdata1[0]) == false
              ) {
                getIntersectionPoint.push(objectdata1[j]);
              }
            }
          }
        }
        for (let z = 0; z < objectdata2.length; z++) {
          if (
            JSON.stringify(objectdata2[z]) ==
            JSON.stringify(intersectionArray[i])
          ) {
            if (z != 0 && z != objectdata2.length - 1) {
              if (
                arrayHasEl(intersectionArray, objectdata2[z - 1]) == false ||
                arrayHasEl(intersectionArray, objectdata2[z + 1]) == false
              ) {
                getIntersectionPoint.push(objectdata2[z]);
              }
            } else if (z == 0) {
              if (
                arrayHasEl(
                  intersectionArray,
                  objectdata2[objectdata2.length - 1]
                ) == false ||
                arrayHasEl(intersectionArray, objectdata2[z + 1]) == false
              ) {
                getIntersectionPoint.push(objectdata2[z]);
              }
            } else if (z == objectdata2.length - 1) {
              if (
                arrayHasEl(intersectionArray, objectdata2[z - 1]) == false ||
                arrayHasEl(intersectionArray, objectdata2[0]) == false
              ) {
                getIntersectionPoint.push(objectdata2[z]);
              }
            }
          }
        }
      }
      return getIntersectionPoint;
    }
  }

  //这里的结果是两个点
  let preresult = getInter(intersectionArray);
  // console.log(preresult)
  function unique1(array) {
    let r = [];
    for (let i = 0; i < array.length; i++) {
      for (let j = i + 1; j < array.length; j++) {
        if (JSON.stringify(array[i]) == JSON.stringify(array[j])) {
          j == ++i;
        }
      }
      r.push(array[i]);
    }
    return r;
  }
  let result = unique1(preresult);
  // console.log('跳转的两个点', result)

  function newReverse(array) {
    let newArray = [];
    for (let i = array.length - 1; i >= 0; i--) {
      newArray.push(array[i]);
    }
    return newArray;
  }

  //这里出了一点问题，我们必须按照交集的第一个来检索，然后第二个，不然判断就会出现问题
  function JudgeReverse(data1, data2, intersection) {
    let indexArray1 = [];
    for (let i = 0; i < data1.length; i++) {
      if (JSON.stringify(data1[i]) == JSON.stringify(intersection[0])) {
        indexArray1.push(i);
      }
    }
    for (let i = 0; i < data1.length; i++) {
      if (JSON.stringify(data1[i]) == JSON.stringify(intersection[1])) {
        indexArray1.push(i);
      }
    }

    let indexArray2 = [];
    for (let i = 0; i < data2.length; i++) {
      if (JSON.stringify(data2[i]) == JSON.stringify(intersection[0])) {
        indexArray2.push(i);
      }
    }
    for (let i = 0; i < data2.length; i++) {
      if (JSON.stringify(data2[i]) == JSON.stringify(intersection[1])) {
        indexArray2.push(i);
      }
    }

    // console.log('indexArray1:', indexArray1)
    // console.log('indexArray2:', indexArray2)
    if (
      (indexArray1[0] - indexArray1[1]) * (indexArray2[0] - indexArray2[1]) >
      0
    ) {
      //则将obj2翻转
      // console.log('颠倒obj1')
      let newdata2 = newReverse(data2);
      return [data1, newdata2];
    } else {
      return [data1, data2];
    }
  }

  if (!FullInclusion) {
    //这里判断交集点的顺序是否是相反的，若不是，则需要翻转obj2的数组
    let newobj1, newobj2;
    [newobj1, newobj2] = JudgeReverse(objectdata1, objectdata2, result);

    // console.log('下面运行的obj1和obj2：', newobj1, newobj2)

    FinalArray = [];
    let t;
    let firstjump, twojump;
    for (let i = 0; i < newobj1.length; i++) {
      if (
        JSON.stringify(newobj1[i]) == JSON.stringify(result[0]) ||
        JSON.stringify(newobj1[i]) == JSON.stringify(result[1])
      ) {
        //则跳转到objectdata2的部分
        FinalArray.push(newobj1[i]);
        let anchor = newobj1[i];
        for (let j = 0; j < newobj2.length; j++) {
          if (JSON.stringify(newobj2[j]) == JSON.stringify(anchor)) {
            t++;
            firstjump = j;
            break;
          }
        }
        break;
      } else {
        FinalArray.push(newobj1[i]);
      }
    }
    // console.log(firstjump)
    for (let z = (firstjump + 1) % newobj2.length; z < newobj2.length; z++) {
      if (
        JSON.stringify(newobj2[z]) == JSON.stringify(result[0]) ||
        JSON.stringify(newobj2[z]) == JSON.stringify(result[1])
      ) {
        FinalArray.push(newobj2[z]);
        let newanchor = newobj2[z];
        //再次跳转到1
        for (let j = 0; j < newobj1.length; j++) {
          if (JSON.stringify(newobj1[j]) == JSON.stringify(newanchor)) {
            t++;
            twojump = j;
            break;
          }
        }
        break;
      } else {
        FinalArray.push(newobj2[z]);
        //说明没有到二次跳转的时候,在从头遍历
        if (t != 2 && z == newobj2.length - 1) {
          for (let w = 0; w < firstjump; w++) {
            if (
              JSON.stringify(newobj2[w]) == JSON.stringify(result[0]) ||
              JSON.stringify(newobj2[w]) == JSON.stringify(result[1])
            ) {
              FinalArray.push(newobj2[w]);
              //再次跳转到1，找到1目前的位置
              for (let q = 0; q < newobj1.length; q++) {
                if (JSON.stringify(newobj1[q]) == JSON.stringify(newobj2[w])) {
                  twojump = q;
                  break;
                }
              }
              break;
            } else {
              FinalArray.push(newobj2[w]);
            }
          }
        }
      }
    }
    // console.log(twojump)
    //然后在回到obj1，遍历剩下的即可
    for (let k = twojump + 1; k < newobj1.length; k++) {
      FinalArray.push(newobj1[k]);
    }

    // console.log(FinalArray)
    return FinalArray;
  } else {
    let newRealArray = [];
    let firstIndex, SecondIndex;
    for (let i = 0; i < objectdata1.length; i++) {
      if (objectdata1[i] == result[0]) {
        firstIndex = i;
      } else if (objectdata1[i] == result[1]) {
        SecondIndex = i;
      }
    }
    for (let i = 0; i <= firstIndex; i++) {
      newRealArray.push(objectdata1[i]);
    }
    for (let i = SecondIndex; i < objectdata1.length; i++) {
      newRealArray.push(objectdata1[i]);
    }
    // console.log('完全包含的返回结果:', newRealArray)
    return newRealArray;
  }
};
