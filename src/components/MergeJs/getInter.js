export const getInter = (objectdata1, objectdata2) => {
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
            if (j != 0 || j != objectdata1.length - 1) {
              if (
                arrayHasEl(intersectionArray, objectdata1[j - 1]) == false ||
                arrayHasEl(objectdata1[j + 1]) == false
              ) {
                getIntersectionPoint.push(objectdata1[j]);
              }
            } else if (j == 0) {
              if (
                arrayHasEl(
                  intersectionArray,
                  objectdata1[objectdata1.length - 1]
                ) == false ||
                arrayHasEl(objectdata1[j + 1]) == false
              ) {
                getIntersectionPoint.push(objectdata1[j]);
              }
            } else {
              if (
                arrayHasEl(intersectionArray, objectdata1[j - 1]) == false ||
                arrayHasEl(objectdata1[0]) == false
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
            if (z != 0 || z != objectdata2.length - 1) {
              if (
                arrayHasEl(intersectionArray, objectdata2[z - 1]) == false ||
                arrayHasEl(objectdata2[z + 1]) == false
              ) {
                getIntersectionPoint.push(objectdata2[z]);
              }
            } else if (z == 0) {
              if (
                arrayHasEl(
                  intersectionArray,
                  objectdata2[objectdata2.length - 1]
                ) == false ||
                arrayHasEl(objectdata2[z + 1]) == false
              ) {
                getIntersectionPoint.push(objectdata2[z]);
              }
            } else {
              if (
                arrayHasEl(intersectionArray, objectdata2[z - 1]) == false ||
                arrayHasEl(objectdata2[0]) == false
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
  let Final = [];
  // if (intersectionArray[0] == intersectionArray[intersectionArray.length - 1]) {
  //   for (let i = 0; i < intersectionArray.length - 1; i++) {
  //     Final.push(intersectionArray[i]);
  //   }
  // }
  return Final;
};
