import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public redirectUri: string = encodeURIComponent('http://localhost/cb');
  public clientId = environment.gameclientId;
  public clientSecret = environment.gameclientSecret;

  constructor(
    private api: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cookieService: CookieService
  ) { }

  ngOnInit() {

    const code: string = this.activatedRoute.snapshot.queryParamMap.get('code');

    let accessToken: string = '' as any;
    let bpAddress: string = '' as any;
    this.api.requestToken(code, this.redirectUri, environment.gameclientId, environment.gameclientSecret).subscribe(
      res => {
        accessToken = res.access_token;
        if (accessToken === undefined || !accessToken) {
          console.log('Returned requestToken Invalid:', res);
          window.location.href = environment.portal;
          return false;
        }

        this.api.getMembers(accessToken).subscribe(
          res => {
            if (res.status != 200) {
              console.log('Returned bpAddress Invalid:', res);
              window.location.href = environment.portal;
              return false;
            }
            bpAddress = res.data.token_addr;
            if (bpAddress === undefined || !bpAddress) {
              console.log('Returned bpAddress Invalid:', res);
              window.location.href = environment.portal;
              return false;
            }

            this.router.navigate([''], {
              queryParams: {
                accesstoken: accessToken,
                bpaddress: bpAddress,
                usernick: bpAddress,
                appno: res.app_no,
              }
            });
          },
          err => {
            window.location.href = environment.portal;
            return false;
          },
          () => {
          }
        );
      },
      err => {
        window.location.href = environment.portal;
        return false;
      },
      () => {
      }
    );
  }

}
