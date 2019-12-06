import { SettingsService, _HttpClient } from '@delon/theme';
import { Component, OnDestroy, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { SocialService, SocialOpenType, ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { ReuseTabService } from '@delon/abc';
import { environment } from '@env/environment';
import { StartupService } from '@core';
import {UserSettingService} from "@core/service/user.setting.service";
import {HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [SocialService],
})
export class UserLoginComponent implements OnDestroy {


  constructor(
    private fb: FormBuilder,
    modalSrv: NzModalService,
    private router: Router,
    private settingsService: SettingsService,
    private socialService: SocialService,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private startupSrv: StartupService,
    public http: _HttpClient,
    public msg: NzMessageService,
    private userSetting: UserSettingService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      jobCode: [null, [Validators.required, Validators.maxLength(32)]],
      password: [null, [Validators.required, Validators.maxLength(20), Validators.minLength(6)]],
      password_mail: [null, [Validators.required, Validators.maxLength(20), Validators.minLength(6)]],
      mail: [null, [Validators.email]],
      //remember: [true]
    });
  }

  // #region fields

  get jobCode() {
    return this.form.controls.jobCode;
  }
  get password() {
    return this.form.controls.password;
  }
  get mobile() {
    return this.form.controls.mobile;
  }
/*  get captcha() {
    return this.form.controls.captcha;
  }*/
  form: FormGroup;
  error = '';
  type = 0;

  // #region get captcha

  count = 0;
  interval$: any;

  // #endregion

/*  switch(ret: any) {
    this.type = ret.index;
  }*/

// 手机号验证码
/*  getCaptcha() {
    if (this.mobile.invalid) {
      this.mobile.markAsDirty({ onlySelf: true });
      this.mobile.updateValueAndValidity({ onlySelf: true });
      return;
    }
    this.count = 59;
    this.interval$ = setInterval(() => {
      this.count -= 1;
      if (this.count <= 0) {
        clearInterval(this.interval$);
      }
    }, 1000);
  }*/

  // #endregion


  // 跳转URL
  redirectUrl: string;
  submit() {
    this.error = '';
    // 账号密码登录
    /*if (this.type === 0) {*/
    this.jobCode.markAsDirty();
    this.jobCode.updateValueAndValidity();
    this.password.markAsDirty();
    this.password.updateValueAndValidity();
    if (this.jobCode.invalid || this.password.invalid) {
      return;
    }
    console.log(this.jobCode);
    console.log(this.password);
    /*this.http.post('/user/login', {jobCode: this.jobCode.value, password: this.password.value}).subscribe((result: any) => {
      console.log(result);
      if (result !== null && result['meta']['success'] === true) {
        /!*if (result['data']['refreshToken']) {
          this.userSetting.setRefreshToken(result['data']['refreshToken']);
          delete result['data']['refreshToken'];
        }*!/
        // 登录成功，执行跳转
        this.router.navigate(['roster']);
        /!*try {
          sessionStorage.setItem(environment.SESSIONNAME, JSON.stringify(result['data']));
        } catch (e) {
          this.msg.info('It is not recommended to use this system in incognito browsing mode or if cookies are disabled.');
        }*!/

        // return new LoginInfoEntity(result['data']);
        // return result['data'];

      } else {
        this.msg.create('error', result['meta']['message']);
        // return null;
        this.router.navigate(['login']);
      }
    });*/

      // 登录成功，执行跳转
      /*if ( result ) {
        this.router.navigate(['roster']);
      } else {
        this.router.navigate(['login']);
      }*/


      // 手机号登录
    /*} else {
      this.mobile.markAsDirty();
      this.mobile.updateValueAndValidity();
      this.captcha.markAsDirty();
      this.captcha.updateValueAndValidity();
      if (this.mobile.invalid || this.captcha.invalid) {
        return;
      }
    }*/

    // 默认配置中对所有HTTP请求都会强制 [校验](https://ng-alain.com/auth/getting-started) 用户 Token
    // 然一般来说登录请求不需要校验，因此可以在请求URL加上：`/login?_allow_anonymous=true` 表示不触发用户 Token 校验
    this.http.post('user/login', {
        type: this.type,
        userName: this.jobCode.value,
        password: this.password.value,
      }).subscribe((res: any) => {
        if (res.msg !== 'ok') {
          this.error = res.msg;
          return;
        }
        // 清空路由复用信息
        this.reuseTabService.clear();
        // 设置用户Token信息
        this.tokenService.set(res.user);
        // 重新获取 StartupService 内容，我们始终认为应用信息一般都会受当前用户授权范围而影响
        this.startupSrv.load().then(() => {
          let url = this.tokenService.referrer!.url || '/';
          if (url.includes('/passport')) {
            url = '/';
          }
          this.router.navigateByUrl(url);
        });
      });
  }

  ngOnDestroy(): void {
  }

  // #region social

/*  open(type: string, openType: SocialOpenType = 'href') {
    let url = ``;
    let callback = ``;
    // tslint:disable-next-line: prefer-conditional-expression
    if (environment.production) {
      callback = 'https://ng-alain.github.io/ng-alain/#/callback/' + type;
    } else {
      callback = 'http://localhost:4200/#/callback/' + type;
    }
    switch (type) {
      case 'auth0':
        url = `//cipchk.auth0.com/login?client=8gcNydIDzGBYxzqV0Vm1CX_RXH-wsWo5&redirect_uri=${decodeURIComponent(
          callback,
        )}`;
        break;
      case 'github':
        url = `//github.com/login/oauth/authorize?client_id=9d6baae4b04a23fcafa2&response_type=code&redirect_uri=${decodeURIComponent(
          callback,
        )}`;
        break;
      case 'weibo':
        url = `https://api.weibo.com/oauth2/authorize?client_id=1239507802&response_type=code&redirect_uri=${decodeURIComponent(
          callback,
        )}`;
        break;
    }
    if (openType === 'window') {
      this.socialService
        .login(url, '/', {
          type: 'window',
        })
        .subscribe(res => {
          if (res) {
            this.settingsService.setUser(res);
            this.router.navigateByUrl('/');
          }
        });
    } else {
      this.socialService.login(url, '/', {
        type: 'href',
      });
    }
  }*/

  // #endregion


}
