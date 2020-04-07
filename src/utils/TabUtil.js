import Sessions from './Sessions';
const TabUtil = {
  //tab初始化数据，
  initTabPanne(values) {
    let tabPane = JSON.parse(Sessions.get('tabPane'));
    let selectPane = JSON.parse(Sessions.get('selectPane'));
    if(!tabPane) {
      tabPane=[];
      tabPane.push(values);
    }
    if(tabPane.length==1) {
      tabPane.map((el,index) => el.closable=false);
      selectPane = tabPane[0].key
    }
    Sessions.set('tabPane',JSON.stringify(tabPane));
    Sessions.set('selectPane',JSON.stringify(selectPane));
    return { tabPane, selectPane };
  },
  //新增tab
  addTabPanne(values) {
    let tabPane = JSON.parse(Sessions.get('tabPane'));
    let selectPane = values.key;
    let index = tabPane.findIndex((value,index,arr) => {
      return values.key == value.key
    })
    tabPane.push({})
    let addIndex;
    let num=1;//0添加，1删除
    //一级查询 去重处理
    if(index=='-1') {
      addIndex = -1;
      num = 0;
    } else {
      addIndex = index;
      num = 1;
    }
    //二级查询。存在二级直接替换，不存在，就直接添加
    if(values.parentKey) {
      let isExistIndex = tabPane.findIndex((item,index,arr) => {
        return values.parentKey == item.parentKey
      })
      if(isExistIndex == '-1') {
        addIndex = tabPane.findIndex((item,index,arr) => {
          return item.key == values.parentKey
        });
        addIndex++;
        num = 0;
      } else {
        addIndex = isExistIndex;
        num = 1;
      };
    };
    tabPane.splice(addIndex,num,values);
    tabPane.splice(-1,1);
    if(tabPane.length>1) {
      tabPane.map((el,index) => el.closable=true)
    }
    Sessions.set('tabPane',JSON.stringify(tabPane));
    Sessions.set('selectPane',JSON.stringify(selectPane));
    return { tabPane, selectPane};
  },
  //删除tab
  deleteTabPane(targetKey) {
    let tabPane = JSON.parse(Sessions.get('tabPane'));
    let selectPane = JSON.parse(Sessions.get('selectPane'));
    let index = tabPane.findIndex((value,index,arr) => {
      return targetKey == value.key
    })
    tabPane.splice(index,1);
    if( selectPane == targetKey ) {
      index--;
      selectPane = tabPane[index].key
    }
    if(tabPane.length==1) {
      tabPane.map((el,index) => el.closable=false);
      selectPane = tabPane[0].key;
    }
    Sessions.set('tabPane',JSON.stringify(tabPane));
    Sessions.set('selectPane',JSON.stringify(selectPane));
    return { tabPane, selectPane};
  },
  //切换tab
  toggleTabPane(targetKey) {
    Sessions.set('selectPane',JSON.stringify(targetKey));
    return targetKey
  },
  // 获取url里面的参数
  getSearchParts(key) {
    const url = decodeURI(window.location.pathname + window.location.search + window.location.hash);
    const arys = url.split('?');
    const paramsd = {};
    for (let i = 0; i < arys.length; i += 1) {
      if (i > 0) {
        const pars = arys[i].split('&');
        for (let j = 0; j < pars.length; j += 1) {
          paramsd[pars[j].split('=')[0]] = pars[j].split('=')[1];
        }
      }
    }
    const value = paramsd[key];
    return value;
  }
}

export default TabUtil;
