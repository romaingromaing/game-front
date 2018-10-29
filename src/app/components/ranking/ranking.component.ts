import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ApiService } from '../../api.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit, OnDestroy {
  @Input() appId: number;
  @Input() accessToken: string;
  @Input() bpAddress: string;

  public appName = 'Pacman';
  public scoreMultiple = 100000000000;
  public rank_list: any;
  private interval_id: any;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.game_rank_list();

    this.interval_id = setInterval(() => {
      $('#table_rank > tbody').fadeOut(200);
      this.game_rank_list();
      $('#table_rank > tbody').fadeIn(200);
    }, 3 * 1000);
  }

  private game_rank_list() {
    // page(1), pageSize(10)
    this.api.game_rank().subscribe(
      res => {
        const content: [string] = res;
        const rankLength = content.length;
        if (rankLength > 0) {
          const newRank: any = [];
          for (let i = 0; i < rankLength; i += 2) {
            const user = content[i];
            const score: number = Number(content[i + 1]);
            const realScore = Math.floor(score / this.scoreMultiple);
            const utcDate = (this.scoreMultiple - (score % this.scoreMultiple)) * 1000;

            newRank.push({
              user: user,
              score: realScore,
              date: utcDate,
            });

            if (newRank.length >= 3) {
              break;
            }
          }
          this.rank_list = newRank;
        } else {
        }
      },
      err => { },
      () => { }
    );
  }

  ngOnDestroy(): void {
    if (this.interval_id) {
      clearInterval(this.interval_id);
    }
  }
}
