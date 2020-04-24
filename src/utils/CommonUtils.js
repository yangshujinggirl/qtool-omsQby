import NP from "number-precision";
import { Sessions } from "utils";

const CommonUtils = {
  clearEmptyObj(obj) {
    let newPdSpu = {};
    for (let key in obj) {
      if (obj[key]) {
        newPdSpu[key] = obj[key];
      }
    }
    return newPdSpu;
  },
  formatToUrlPath(val) {
    if (!val) {
      return val;
    }
    if (val.length == 0) {
      return null;
    }
    if( val instanceof Array == true) {//单张图片
      if(val&&val[0].response) {
        let urlPath = val[0].response.result;
        val = urlPath;
      } else {
        val = val[0].path;
      }
    } else {//多张图片
      if(val&&val.response) {
        let urlPath = val.response.result;
        val = urlPath;
      } else {
        val = val.path;
      }
    }

    return val;
  },
  formatToFilelist(url,index) {
    let fileDomain = Sessions.get('fileDomain');
    let fileList;
    if (url) {
      fileList = [{
          uid: `-1/${index}`,
          status: "done",
          path: url,
          url: fileDomain + url,
        },
      ];
    } else {
      fileList = [];
    }
    return fileList;
  },
  /**
   * 数据差值比较，主要终于对 要比较的数据以及原始数据之间的差值的百分比，并返回
   * @param currentValue 当前数据
   * @param oldValue 上周数据
   * @param isUseMinValue 在均大于0的情况下对于要做处理的num1的值是否取最小值，默认是
   * @returns {number} 被比较数据以及原始数据之间的差值对于原始数据的百分比，精确到两位小数
   * 比较逻辑：被比较数据大于原始数据则返回为正值，否则为负值，范围[-100~100]
   */
  dataDifferenceValueComparison(currentValue, oldValue) {
    const a = currentValue == null ? 0 : currentValue;
    const b = oldValue == null ? 0 : oldValue;
    let rate = 0;
    if(b){
      rate = Math.round(NP.divide(NP.minus(a , b), b) * 100);
    }
    return rate;
  },

  /**
   * 格式化Form表单数据操作,并返回格式化后数据
   * @param formRef 表单Form的ref参数
   */
  async paramsFormValues(formRef) {
    const values = await formRef.current.validateFields();
    console.log(values);
    for (let i in values) {
      // 替换搜索条件中字符串的前后空格
      if (typeof values[i] == "string") {
        values[i] = values[i].replace(/^\s+|\s+$/gm, "");
      }
    }
    return values;
  },
};

export default CommonUtils;
