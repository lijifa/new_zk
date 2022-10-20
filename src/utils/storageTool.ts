// 设置数据本地缓存
import dayjs from 'dayjs';
// const expired = 30

// dayjs是一个只有2kb 的时间插件
// dayjs().unix() 获取的是秒所以 expired  设置为s 

export function setStorageItems (key:string, value:any, expired = -1) {
  const writeTime = dayjs().unix(); // 存入时间
  const Obj = { value, writeTime, expired}
  localStorage.setItem(key, JSON.stringify(Obj));
}

export function getStorageItems (keys:string){
  const dataJson = localStorage.getItem(keys)
  if(dataJson === null || typeof dataJson === 'undefined'){
    return false
  }
  const data = JSON.parse(dataJson)
  const readTime = dayjs().unix();
  if(data.expired > 0 && (readTime - data.writeTime) > data.expired){
    // 数据过期 清除数据
    localStorage.removeItem(keys);
    return false
  }else{
    return data.value
  }
}

export function removeStorageItem(keys:string){
  localStorage.removeItem(keys);
  return true
}

export function clearStorageAll(){
  localStorage.clear()
  return true
}