import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MomentModule } from 'ngx-moment';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { ApiService } from './api.service';
import { DeviceDetectorModule } from 'ngx-device-detector';

import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { BlocksComponent } from './components/blocks/blocks.component';
import { BalanceComponent } from './components/balance/balance.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { MainComponent } from './components/main/main.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AuthComponent } from './components/auth/auth.component';


@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    TransactionsComponent,
    BlocksComponent,
    BalanceComponent,
    RankingComponent,
    MainComponent,
    NotfoundComponent,
    AuthComponent,
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MomentModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [
    ApiService,
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
