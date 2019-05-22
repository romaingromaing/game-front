import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ApiService } from '../../api.service';
import { environment } from '../../../environments/environment';
import * as $ from 'jquery';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit, OnDestroy {
  @Input() bpAddress: string;
  @Input() userEmail: string;

  public appId: number = environment.gameappId;

  public addr_info: any = {};
  public bpAmount: number = 0 as any;
  private interval_id: any;
  private constTitle: string = 'Balance' as string;
  public BalanceTitle: string;

  constructor(
    private api: ApiService,
  ) {
    this.BalanceTitle = this.constTitle;
  }

  ngOnInit() {
    this.api.bp_info_addr(this.appId, this.bpAddress).take(1).subscribe(
      res => {
        this.addr_info = res;
        this.bpAmount = Math.ceil(this.addr_info.balance);
      },
      err => { },
      () => { }
    );

    let i: number = 0 as number;
    this.interval_id = setInterval(() => {
      this.BalanceTitle = this.constTitle + ' (' + ((3 - i) % 3) + ' Seconds)';
      $('#str_balance').html(this.BalanceTitle);
      if (i === 0) {
        this.api.bp_info_addr(this.appId, this.bpAddress).take(1).subscribe(
          res => {
            this.addr_info = res;
            const balanceNew = Math.ceil(this.addr_info.balance);
            const balanceOld = parseInt($('#balanceCurr').text(), 10);
            if (balanceNew !== balanceOld) {
              this.bpAmount = balanceNew;
            }
          },
          err => { },
          () => { }
        );
      }
      i = (i + 1) % 3;
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.interval_id) {
      clearInterval(this.interval_id);
    }
  }
}
