const keyPrefix='oms';
const Sessions = {
  // 获取sessionkty
  get(key) {
    return sessionStorage.getItem(`${keyPrefix}_${key}`);
  },
  set(key,value) {
    sessionStorage.setItem(`${keyPrefix}_${key}`,value);
  },
  clear() {
    sessionStorage.clear();
  },
  remove(key) {
    sessionStorage.removeItem(`${keyPrefix}_${key}`);
  }
}

export default Sessions;
