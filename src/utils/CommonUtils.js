import NP from 'number-precision';
import {Sessions} from 'utils';

const CommonUtils = {
    clearEmptyObj(obj) {
        let newPdSpu = {};
        for (let key in obj) {
            if (obj[key] != null) {
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
        if (val instanceof Array == true) {
            //单张图片
            if (val && val[0].response) {
                let urlPath = val[0].response.result;
                val = urlPath;
            } else {
                val = val[0].path;
            }
        } else {
            //多张图片
            if (val && val.response) {
                let urlPath = val.response.result;
                val = urlPath;
            } else {
                val = val.path;
            }
        }

        return val;
    },
    formatToFilelist(url, index) {
        let fileDomain = Sessions.get('fileDomain');
        let fileList;
        if (url) {
            fileList = [
                {
                    uid: `-1/${index}`,
                    status: 'done',
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
        if (b) {
            rate = Math.round(NP.divide(NP.minus(a, b), b) * 100);
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
            if (typeof values[i] == 'string') {
                values[i] = values[i].replace(/^\s+|\s+$/gm, '');
            }
        }
        return values;
    },
    //给list添加key值
    addKey(list, keyStr = null) {
        if (list && list.length > 0) {
            list.map((item, index) => {
                item.key = keyStr ? keyStr : index;
                if (item.constructor == Array) {
                    this.addKey(item);
                }
            });
            return list;
        } else {
            return [];
        }
    },
    //解析url参数
    getUrlParams(url) {
        const str = url.substr(1).split('&');
        const obj = {};
        str.map((item) => {
            const arr = item.split('=');
            obj[arr[0]] = arr[1];
        });
        return obj;
    },

    /**
     * 文件下载响应处理,针对于response成功状态
     * @param responseBlob 响应的数据体，blob类型
     * @param fileName 文件下载名称（全名称，包括后缀）
     * @returns {boolean} 执行流程是否成功，但是成功并不代表下载成功，true为成功
     */
    downLoadFileResponseDispose(responseBlob, fileName) {
        let r = new FileReader();
        r.onload = function () {
            const link = document.createElement('a');
            link.style.display = 'none';
            link.href = URL.createObjectURL(responseBlob);
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
        r.readAsText(responseBlob);
        return true;
    },
    /**
     * 字符串转arraybuffer
     * @param s 字符串
     * @return {ArrayBuffer} 转换后的ArrayBuffer
     */
    stringToArrayBuffer(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    },
};

export default CommonUtils;
