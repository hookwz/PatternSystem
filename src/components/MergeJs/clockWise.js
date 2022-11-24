export const clockWise = (data, intersection) => {
  //首先我们需要获取两个数组中的交集有多少个点
  //   let intersectionArray = []
  //   for (let i = 0; i < data1.length; i++) {
  //     for (let j = 0; j < data2.length; j++) {
  //       if (data1[i][0] == data2[j][0] && data1[i][1] == data2[j][1]) {
  //         intersectionArray.push([data1[i][0], data1[i][1]])
  //       }
  //     }
  //   }
  //   console.log(intersectionArray)

  //在处理传入的时候要避免两个数组的第一个值为交集点的值
  //先采用博神的思路
  //取得数组的前三个点
  // console.log('应用的交集点', intersection)
  let one = data[0];
  let two = data[1];
  let three = data[2];
  function diffSet(data1, data2, data3) {
    return (
      (data2[0] - data1[0]) * (data3[1] - data1[1]) -
      (data2[1] - data1[1]) * (data3[0] - data1[0])
    );
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

  function Moveup(data, intersection) {
    let kdata;
    while (true) {
      if (arrayHasEl(intersection, data[0]) == false) {
        break;
      } else {
        kdata = data.shift();
        data.push(kdata);
      }
    }
    return data;
  }
  //为什么那种方法会有错，因为我使用了sort，倒置了本身数组的顺序都发生了改变，倒置之前的数组绘制也发生了变化
  function JudgeArray(data1, data2) {
    for (let i = 0; i < data1.length; i++) {
      if (arrayHasEl(data2, data1[i]) == false) {
        return false;
      }
    }
    return true;
  }

  function newReverse(array) {
    let newArray = [];
    for (let i = array.length - 1; i >= 0; i--) {
      newArray.push(array[i]);
    }
    return newArray;
  }

  let result = diffSet(one, two, three);
  // console.log(result)
  if (result > 0) {
    if (
      JudgeArray(data, intersection) == true &&
      data.length == intersection.length
    ) {
      return data;
    } else {
      //为逆时针,采用js函数倒置数组,这里不能采用reverse api，因为这样会导致原本的真实数组也直接倒置
      let newdata = newReverse(data);
      let finaldata = Moveup(newdata, intersection);
      // console.log('逆')
      // console.log(finaldata)
      return finaldata;
    }
  } else {
    if (
      JudgeArray(data, intersection) == true &&
      data.length == intersection.length
    ) {
      return data;
    } else {
      let finaldata = Moveup(data, intersection);
      // console.log('顺')
      // console.log(finaldata)
      return finaldata;
    }
  }
};
