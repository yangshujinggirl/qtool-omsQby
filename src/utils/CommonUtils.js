import NP from 'number-precision'

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
    /**
     * 数据差值比较，主要终于对 要比较的数据以及原始数据之间的差值的百分比，并返回
     * @param compareValue 要被比较的数据
     * @param originValue 原始数据
     * @returns {number} 被比较数据以及原始数据之间的差值对于原始数据的百分比，精确到两位小数
     * 比较逻辑：被比较数据大于原始数据则返回为正值，否则为负值，范围[-100~100]
     */
    dataDifferenceValueComparison(compareValue, originValue) {
        const a = compareValue == null ? 0 : compareValue;
        const b = originValue == null ? 0 : originValue;
        //初始化比例信息
        let rate = 0;
        if (a > 0 && b > 0) {
            rate = NP.round(NP.divide(NP.times(NP.minus(a, b), 100), b), 2);
        } else {
            if (b <= 0) {
                rate = (a > 0) ? 100 : 0
            } else {
                rate = 0
            }
        }
        return rate
    }
}

export default CommonUtils;
