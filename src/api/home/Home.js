import Req from '../Req';

// export function GetMenuApi(values) {
//   values = JSON.stringify(values)
//   return Req.post('/webrest.htm', {
//     code:'qerp.web.bs.menu',
//   })
// }
export function GetMenuApi(values) {
  values = JSON.stringify(values)
  return Req.post('/sysMenu/getMenus',{
    term:'oms',
    ...values
  })
}
