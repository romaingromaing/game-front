# 게임 웹
**BORA Ecosystem testnet**을 위한 Angular 웹 프론트입니다.

## Background
- Angular/Angular-cli([Angular Official Site](https://angular.io/)): 게임 프론트를 만들기 위하여 Angular를 사용합니다. 
- npm([npm OfficialSite](https://www.npmjs.com/)): 서버 구동에 필요한 패키지 설치를 위하여 npm을 사용합니다.


## 설치
### 필요 프로그램
게임 웹의 구동을 위해서는 아래 프로그램이 필요합니다.
- Angular
- Angular-cli
### 다운로드
이 git 저장소를 clone 하시기 바랍니다.
```bash
git clone https://github.com/boraecosystem/game-front.git
cd devnet-gamefront
npm install
```

## 설정
environments/environment.*ts 파일 내용을 확인하시고, 게임 서버와 맞추어 설정하세요. 
```
production: false,                                   // 배포버전 설정(수정 금지)
api: 'https://testnet.bora-lagoon.com/',               // BORA Testnet API uri(수정 금지)
bpapi: 'https://testnet-explorerapi.bora-lagoon.com',  // BORA Explorer API uri(수정 금지)
explorer: 'https://testnet-explorer.bora-lagoon.com',  // BORA Explorer uri(수정 금지)
portal: 'https://testnet.bora-lagoon.com/portal/',     // Portal uri(수정 금지)
authredirecturi: 'http://localhost:4200/cb',         // OAuth2.0 Redirect uri(수정 금지)
gameuri: 'http://127.0.0.1:3200/',                   // 게임 서버 uri
```


## 사용

### 구동
게임 웹 다운로드 폴더로 이동하신 후, 아래와 같이 게임 웹을 구동할 수 있습니다.
```bash
ng serve
```
`http://localhost:4200` 접속


## **BORA Ecosystem testnet** 연동
연동 예제 코드는 아래를 참고해 주시기 바랍니다.

### 인증 코드 요청 페이지 접근 - Authorization Code Grant
```javascript
window.location.href = 'https://testnet.bora-lagoon.com/member/oauth/authorize' +
  '?response_type=code&state=xyz&client_id=' + this.clientId + '&redirect_uri=' + this.redirectUri;
```
인증코드를 획득한 후, 연동된 게임 서버를 통하여 사용자 토큰을 획득합니다.

### BORA Explorer API 연동
&nbsp;&nbsp; #### App과 관련된 Transaction 확인하기
```javascript
public bp_tx_list(appId: number, page: number, page_size: number): Observable<any> {
    return this.http.get('https://testnet-explorerapi.bora-lagoon.com/points/' + appId + '/txs?page=' + page + '&pageSize=' + page_size).map(res => res);
}
```

&nbsp;&nbsp; #### BORA Play Block 확인하기
```javascript
public bp_block_list(appId: number, page: number = 1, page_size: number = 20): Observable<any> {
    return this.http.get('https://testnet-explorerapi.bora-lagoon.com/points/' + appId + '/blocks?page=' + page + '&pageSize=' + page_size).map(res => res);
}
```

&nbsp;&nbsp; #### 내 BORA Play 정보 가져오기
```javascript
public bp_info_addr(appId: number, address: string): Observable<any> {
    return this.http.get('https://testnet-explorerapi.bora-lagoon.com/points/' + appId + '/addresses/' + address).map(res => res);
}
```

