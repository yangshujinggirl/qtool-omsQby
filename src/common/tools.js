//全局防抖
export function deBounce(func,wait){
    let timer = null;
    return function(...args){
        clearTimeout(timer)
        timer=setTimeout(()=>{
            func(...args)
        },wait)
    }
}