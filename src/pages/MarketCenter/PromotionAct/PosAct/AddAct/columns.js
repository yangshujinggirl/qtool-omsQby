const columnsCreat =(form,validator,changeProportion,dataSource)=>{
    return [{
        title: '活动预算',
        dataIndex: 'budget',
        width:'20%',
        render:(text,record,index) => {
          const { getFieldDecorator } =form;
          let chldrnDom = <FormItem>
                  {getFieldDecorator(`bearers[${index}].budget`,{
                    initialValue:record.budget,
                    rules:[{pattern:/^\d+(\.\d{1,2})?$/,message:'请输入数字'}]
                  })(
                    <Input
                      suffix="万元"
                      maxLength='15'
                      placeholder="请输入活动预算"
                      autoComplete="off"/>
                  )}
                </FormItem>
          const obj = {
            children: chldrnDom,
            props: {},
          };
          if (index === 0) {
            obj.props.rowSpan = dataSource.length;
          } else {
            obj.props.rowSpan = 0;
          }
          return obj;
        }
      },{
        title: '承担方',
        dataIndex: 'bearerStr',
        width:'10%',
      },{
        title: '*承担比例',
        dataIndex: 'ratio',
        width:'30%',
        render:(text,record,index) => {
          const { getFieldDecorator } =form;
          return <FormItem>
                  {getFieldDecorator(`bearers[${index}].proportion`,{
                    initialValue:record.proportion,
                    rules:[{ required: true, message: '请输入承担比例'},{
                      pattern:/^\d+$/,message:'请输入正整数'
                    },{
                      validator:validator
                    }],
                    onChange:changeProportion
                  })(
                    <Input
                      suffix="%"
                      maxLength='15'
                      placeholder="请输入承担比例"
                      autoComplete="off"/>
                  )}
                </FormItem>
        }
      },{
        title: '备注说明',
        dataIndex: 'remark',
        width:'40%',
        render:(text,record,index) => {
          const { getFieldDecorator } =form;
          return <FormItem>
                  {getFieldDecorator(`bearers[${index}].remark`,{
                    initialValue:record.remark,
                  })(
                    <Input
                      maxLength='30'
                      placeholder="请输入备注说明"
                      autoComplete="off"/>
                  )}
                </FormItem>
        }
      },
    ]
  }
  export default columnsCreat