export const SimpleInter = (objectdata1, objectdata2) => {
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
  if (intersectionArray.length >= 2) {
    return true;
  } else {
    return false;
  }
};
