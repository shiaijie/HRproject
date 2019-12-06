import {Injectable} from "@angular/core";
import {environment} from "@env/environment";

// const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserSettingService {
  setting = {};

  private _key = 'hrms-setting';

  constructor() {
    const settingStr = localStorage.getItem(this._key);
    if (settingStr) {
      this.setting = JSON.parse(settingStr);
    }
  }

  getPageSize() {
    return this.getItem(this._key)['pageSize'];
  }

  setPageSize(pageSize) {
    this.setting['pageSize'] = pageSize;
    this.setItem(this._key, this.setting);
  }

  setRefreshToken(refreshToken) {
    this.setting['RefreshToken'] = refreshToken;
    this.setItem(this._key, this.setting);
  }

  getRefreshToken() {
    if (this.getItem(this._key)['RefreshToken']) {
      return this.getItem(this._key)['RefreshToken'];
    } else {
      return '';
    }
  }

  setTabReuse(obj) {
    this.setting['TabReuse'] = {flag: obj.flag, count: obj.count};
    this.setItem(this._key, this.setting);
  }

  getTabReuse() {
    if (this.getItem(this._key)['TabReuse']) {
      return this.getItem(this._key)['TabReuse'];
    } else {
      let obj = {flag: false, count: 3};
      this.setTabReuse(obj);
      return obj;
    }
  }

  public getItem(key: string): object {
    const settingStr = localStorage.getItem(key);
    if (settingStr) {
      return JSON.parse(settingStr);
    }
    return {};
  }

  public setItem(key: string, value: Object): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
