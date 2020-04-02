import {omsAjax} from '../Req';

export function GetMenuApi(values) {
  values = JSON.stringify(values)
  return omsAjax.post('/sysMenu/getMenus',{
    term:'oms',
    ...values
  })
}
