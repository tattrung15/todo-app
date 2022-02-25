const prefix = "app";

class _StorageService {
  constructor() {
    this.localStorage = window.localStorage;
    this.sessionStorage = window.sessionStorage;
  }

  // localStorage
  set(key, value) {
    this.localStorage.setItem(this.generateKey(key), value);
  }

  get(key) {
    return this.localStorage.getItem(this.generateKey(key));
  }

  setObject(key, value) {
    this.localStorage.setItem(this.generateKey(key), JSON.stringify(value));
  }

  getObject(key) {
    return JSON.parse(this.localStorage.getItem(this.generateKey(key)));
  }

  // sessionStorage
  setSession(key, value) {
    this.sessionStorage.setItem(this.generateKey(key), value);
  }

  getSession(key) {
    return this.sessionStorage.getItem(this.generateKey(key));
  }

  setSessionObject(key, value) {
    this.sessionStorage.setItem(this.generateKey(key), JSON.stringify(value));
  }

  getSessionObject(key) {
    return JSON.parse(this.sessionStorage.getItem(this.generateKey(key)));
  }

  generateKey(key) {
    return `${prefix}_${key}`;
  }
}

const StorageService = new _StorageService();
export default StorageService;
