import { debounceTime } from 'rxjs/operators';
import { Broadcaster } from './../../monitor.common.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { UserService } from '../../monitor.common.service';
import { Subscription, fromEvent } from 'rxjs';
import '../../../assets/js/particles.js';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  _KEY: '28756942659325487412569845231586'; // 32位
  _IV: '8536874512548456'; // 16位
  model = {
    email: '',
    password: '',
  };
  model2 = {
    email: '',
    password: '',
  };
  sub: any = null;
  isVisible_login: any = false;
  isVisible_register: any = false;
  isLogin: any = false;
  unsubscribe: Subscription;
  formatOne = value => `10,000 RMB`;
  constructor(
    private http: HttpClient,
    private msg: NzMessageService,
    private router: Router,
    private cookie: CookieService,
    private user: UserService,
    private broadcaster: Broadcaster,
    private render: Renderer2
  ) { }

  ngOnInit() {
    (window as any).particlesJS.load('home-section', '../../../assets/js/particles.json', function() {});
    this.isLogin = this.user.getToken() ? true : false;
    this.sub = this.broadcaster.on('loginOut').subscribe(() => {
      this.isLogin = false;
    });
  }

  _resizePageHeight() {
    this.render.setStyle(document.querySelector("#home-section"), "height", document.body.clientHeight - 50 + 'px');
  }

  login() {
    let pwd = this.encrypt(this.model.password);
    this.http.post("User/login", {
      email: this.model.email,
      password: pwd
    }).subscribe((r: any) => {
      if (r.IsSuccess) {
        this.cookie.set("user", JSON.stringify(r.Data), new Date(new Date().setMonth(new Date().getMonth() + 1)));
        this.broadcaster.broadcast("refreshUser");
        this.router.navigate(['dashboard']);
      } else {
        this.msg.error(r.Data, { nzDuration: 4000 });
      }
    })
  }

  ngOnDestroy(): void {
    // this.unsubscribe.unsubscribe();
  }

  register() {
    let pwd = this.encrypt(this.model2.password);
    this.http.post("User/register", {
      email: this.model2.email,
      password: pwd
    }).subscribe((r: any) => {
      if (r.IsSuccess) {
        this.cookie.set("user", JSON.stringify(r.Data), new Date(new Date().setMonth(new Date().getMonth() + 1)));
        this.broadcaster.broadcast("refreshUser");
        this.router.navigate(['dashboard']);
      } else {
        this.msg.error(r.Data, { nzDuration: 4000 });
      }
    })
  }

  private encrypt(str) {
    var key = CryptoJS.enc.Utf8.parse(this._KEY);
    var iv = CryptoJS.enc.Utf8.parse(this._IV);
    var encrypted = '';
    var srcs = CryptoJS.enc.Utf8.parse(str);
    encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).ciphertext;

    return encrypted.toString();
  }

}
