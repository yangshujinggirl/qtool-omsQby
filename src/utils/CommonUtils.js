
const CommonUtils = {
  clearEmptyObj(obj) {
    let newPdSpu={};
    for(let key in obj) {
      if(obj[key]) {
        newPdSpu[key]=obj[key]
      }
    }
    return newPdSpu;
  },
}

export default CommonUtils;
