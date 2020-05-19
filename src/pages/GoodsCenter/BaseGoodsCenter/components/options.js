const productTypeOptions =[{
  key:1,
  value:'普通商品'
},{
  key:2,
  value:'赠品'
}];
const oldStatusOptions =[{
  key:3,
  value:'正常商品'
},{
  key:5,
  value:'淘汰商品'
}];

const procurementTargetOptions =[{
  key:1,
  value:'淮安'
},{
  key:2,
  value:'苏州蔻兔'
}];
const sendTypeOptions =[{
  key:2,
  value:"是"
},{
  key:1,
  value:"否"
}];
const profitsOptions =[{
  key:2,
  value:"食品类"
},{
  key:1,
  value:"非食品类"
}];
const isBeforeSalesOptions =[{
  key:1,
  value:"是"
},{
  key:0,
  value:"否"
}];
const isDirectSalesOptions =[{
  key:1,
  value:"是"
},{
  key:0,
  value:"否"
}];
const batchProcessingStatusOptions =[{
  key:2,
  value:"是"
},{
  key:1,
  value:"否"
}];
const batchProcessingTypeOptions =[{
  key:1,
  value:"生产日期"
},{
  key:2,
  value:"到期日期"
}];
const rangeBaby= [
      {
          "itemName":"0～3 个月",
          "property":"B1"
      },
      {
          "itemName":"3～6 个月",
          "property":"B2"
      },
      {
          "itemName":"6～12 个月",
          "property":"B3"
      },
      {
          "itemName":"1～2 岁",
          "property":"B4"
      },
      {
          "itemName":"2～3 岁",
          "property":"B5"
      },
      {
          "itemName":"3～4 岁",
          "property":"B6"
      },
      {
          "itemName":"4～6 岁",
          "property":"B7"
      },
      {
          "itemName":"6～12 岁",
          "property":"B8"
      },
      {
          "itemName":"12岁以上",
          "property":"B9"
      }]
const rangMa = [
    {
        "itemName":"备孕",
        "property":"M1"
    },
    {
        "itemName":"孕中",
        "property":"M2"
    },
    {
        "itemName":"产后（哺乳期）",
        "property":"M3"
    },
    {
        "itemName":"通用（非孕期）",
        "property":"M4"
    }]
export {
  rangeBaby,rangMa,
  sendTypeOptions,profitsOptions,oldStatusOptions,
  productTypeOptions, procurementTargetOptions, isBeforeSalesOptions,
  isDirectSalesOptions, batchProcessingStatusOptions, batchProcessingTypeOptions
}
