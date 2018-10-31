# Game Front
Angular web source for the game running on **BORA Lagoon Testnet**

## Background
- Angular/Angular-cli([Angular Official Site](https://angular.io/)): Angular is used to create the game front.
- npm([npm OfficialSite](https://www.npmjs.com/)): npm is used to install the packages needed to run the server.


## Install
### Required environment
The following applications are required to run the game front.
- Angular
- Angular-cli
### Download
Please clone this git repository.
```bash
git clone https://github.com/boraecosystem/game-front.git
cd game-front
npm install
```

## Settings
- Check the contents of the environment file(at {project root}/environments/environment.ts) and set the gameuri value according to your game server.
```
production: false,                                   // Angular environment value
api: 'https://testnet.bora-lagoon.com/',               // BORA Testnet API uri(Do not modify)
bpapi: 'https://testnet-explorerapi.bora-lagoon.com',  // BORA Explorer API uri(Do not modify)
explorer: 'https://testnet-explorer.bora-lagoon.com',  // BORA Explorer Uri(Do not modify)
portal: 'https://testnet.bora-lagoon.com/portal/',     // BORA Test Ground Uri(Do not modify)
authredirecturi: 'http://localhost:4200/cb',         // OAuth2.0 Redirect uri(Do not modify)
gameuri: 'http://127.0.0.1:3200/',                   // game server uri
```


## Usage

### Run
After moving to the project root directory, you can run the game front as follows:
```bash
ng serve
```
Then type `http://localhost:4200` in your browser.


## **BORA Lagoon** Integration
Please see the integration example code below.

### Access authorization code request page - Authorization Code Grant
```javascript
window.location.href = 'https://testnet.bora-lagoon.com/member/oauth/authorize' +
  '?response_type=code&state=xyz&client_id=' + this.clientId + '&redirect_uri=' + this.redirectUri;
```
After acquiring the authorization code, acquire the user token through the interconnected game server.

### BORA Explorer API Integration
#### Get transaction list related app
```javascript
public bp_tx_list(appId: number, page: number, page_size: number): Observable<any> {
    return this.http.get('https://testnet-explorerapi.bora-lagoon.com/points/' + appId + '/txs?page=' + page + '&pageSize=' + page_size).map(res => res);
}
```

#### Get block list related app
```javascript
public bp_block_list(appId: number, page: number = 1, page_size: number = 20): Observable<any> {
    return this.http.get('https://testnet-explorerapi.bora-lagoon.com/points/' + appId + '/blocks?page=' + page + '&pageSize=' + page_size).map(res => res);
}
```

#### Get my BORA Shell information
```javascript
public bp_info_addr(appId: number, address: string): Observable<any> {
    return this.http.get('https://testnet-explorerapi.bora-lagoon.com/points/' + appId + '/addresses/' + address).map(res => res);
}
```

