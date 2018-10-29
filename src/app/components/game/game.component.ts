import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @Input() accessToken: string;
  @Input() bpAddress: string;
  @Input() userNick: string;
  public gameurl;

  constructor(
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    let gameUrl: string;
    gameUrl = environment.gameuri;
    gameUrl += '?accesstoken=' + this.accessToken;
    gameUrl += '&bpaddress=' + this.bpAddress;
    gameUrl += '&usernick=' + this.userNick;
    this.gameurl = this.sanitizer.bypassSecurityTrustResourceUrl(gameUrl);
  }
}
