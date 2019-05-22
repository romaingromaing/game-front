import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient
  ) { }

  /////////////////////
  // BORA EXPLORER API
  // Get bp Transaction list by an address
  public bp_tx_list_by_addr(appId: number, address: string, page: number = 1, page_size: number = 1): Observable<any> {
    return this.http.get(environment.bpapi + '/points/' + appId + '/addresses/' + address + '/txs?page=' + page + '&pageSize=' + page_size)
      .map(res => res);
  }

  // get bp transaction list
  public bp_tx_list(appId: number, page: number, page_size: number): Observable<any> {
    return this.http.get(environment.bpapi + '/points/' + appId + '/txs?page=' + page + '&pageSize=' + page_size)
      .map(res => res);
  }

  // Get bp Block list
  public bp_block_list(appId: number, page: number = 1, page_size: number = 20): Observable<any> {
    return this.http.get(environment.bpapi + '/points/' + appId + '/blocks?page=' + page + '&pageSize=' + page_size)
      .map(res => res);
  }

  // Get bp information for an address such as balance and so on
  public bp_info_addr(appId: number, address: string): Observable<any> {
    return this.http.get(environment.bpapi + '/points/' + appId + '/addresses/' + address).map(res => res);
  }
  // END OF BORA EXPLORER API
  /////////////////////////

  /////////////
  // OAUTH API
  // request auth.
  public requestToken(code: string, redirectUri: string, clientId: string, clientSecret: string): Observable<any> {
    return this.http.get(environment.gameuri + 'token?code=' + code)
      .map(res => res);
  }

  public getMembers(userAccessToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + userAccessToken,
    });
    
    console.log('access token:' + userAccessToken)
    //return this.http.get('https://X0yT6nI69Q:yM5pnll9GwdMjkapd7MWX0@' + environment.chainApi + 'chain/v1.2/services/members', { headers: headers })
    //return this.http.get('https://' + environment.chainApi + 'chain/v1.2/services/members', { headers: headers })
    //  .map(res => res);
    return this.http.get(environment.gameuri + 'memberAddr', { headers: headers })
      .map(res => res);

  }

  ///////////////
  // GAME RANK
  public game_rank(): Observable<any> {
    return this.http.get(environment.gameuri + 'get_rank')
      .map(res => res);
  }
}
