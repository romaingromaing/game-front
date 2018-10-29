import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/debounceTime';
import { CookieService } from 'ngx-cookie-service';
import { DeviceDetectorService } from 'ngx-device-detector';
// import { ApiService } from '../../api.service';
// import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public accessToken: string = '' as any;
  public bpAddress: string = '' as any;
  public userNick: string = '' as any;
  public userEmail: string = '' as any;

  public appId: Number = environment.gameappId;

  public redirectUri: string = encodeURIComponent(environment.authredirecturi);
  // public authCode: string = '' as any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private deviceService: DeviceDetectorService,
    // private api: ApiService,
  ) { }

  ngOnInit() {
    if (this.deviceService.browser === 'ie') {
      if (Number(this.deviceService.browser_version) < 11.0) {
        window.alert('This site supports Internet Explorer 11 or newer.\nPlease upgrade Internet Explorer or use Chrome.');
        this.gotoPortal();
        return false;
      }
    }

    this.accessToken = this.activatedRoute.snapshot.queryParamMap.get('accesstoken');
    this.bpAddress = this.activatedRoute.snapshot.queryParamMap.get('bpaddress');
    this.userNick = this.activatedRoute.snapshot.queryParamMap.get('usernick');
    this.userEmail = 'temoprary@example.com';
    this.appId = Number(this.activatedRoute.snapshot.queryParamMap.get('appno'));

    if (this.accessToken === undefined || !this.accessToken) {
      // redirect to auth//
      window.location.href = environment.api + 'member/oauth/authorize' +
        '?response_type=code&state=xyz&client_id=' + environment.gameclientId + '&redirect_uri=' + this.redirectUri;
      return false;
    }


  }

  gotoPortal() {
    window.location.href = environment.portal;
  }

}
