import NP from 'number-precision'
import { Sessions } from 'utils';



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
  formatToUrlPath(val) {
    if(val&&val[0].response) {
      let urlPath = val[0].response.result;
      val = urlPath;
    } else {
      val = val[0].path;
    }
    return val;
  },
  formatToFilelist(url) {
    let fileDomain = Sessions.get('fileDomain');
    let fileList;
    if (url) {
      fileList = [{
          uid: "-1",
          status: "done",
          path:url,
          url: fileDomain + url
        }];
    } else {
      fileList = []
    }
    return fileList;
  },
    /**
     * 数据差值比较，主要终于对 要比较的数据以及原始数据之间的差值的百分比，并返回
     * @param compareValue 要被比较的数据
     * @param originValue 原始数据
     * @param isUseMinValue 在均大于0的情况下对于要做处理的num1的值是否取最小值，默认是
     * @returns {number} 被比较数据以及原始数据之间的差值对于原始数据的百分比，精确到两位小数
     * 比较逻辑：被比较数据大于原始数据则返回为正值，否则为负值，范围[-100~100]
     */
    dataDifferenceValueComparison(compareValue, originValue,isUseMinValue = true) {
        const a = compareValue == null ? 0 : compareValue;
        const b = originValue == null ? 0 : originValue;
        //初始化比例信息
        let rate = 0;
        if (a > 0 && b > 0) {
            rate = NP.round(NP.divide(NP.times(isUseMinValue ? NP.minus(a, b) : a, 100), b), 2);
        } else {
            if (b <= 0) {
                rate = (a > 0) ? 100 : 0
            } else {
                rate = 0
            }
        }
        return rate
    },

    /**
     * 格式化Form表单数据操作,并返回格式化后数据
     * @param formRef 表单Form的ref参数
     */
    async paramsFormValues(formRef) {
        const values = await formRef.current.validateFields();
        console.log(values)
        for (let i in values) {
            // 替换搜索条件中字符串的前后空格
            if (typeof values[i] == "string") {
                values[i] = values[i].replace(/^\s+|\s+$/gm, "");
            }
        }
        return values;
    }
};

export default CommonUtils;
