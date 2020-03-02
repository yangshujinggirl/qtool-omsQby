import {omsAjax} from '../Req';

export function GoLoginTApi({username,password}) {
  return omsAjax.post('/login', {
    username,password
  })
}
export function GoLoginOutTApi() {
  return omsAjax.post('/logout')
}
