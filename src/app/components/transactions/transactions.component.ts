import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ApiService } from '../../api.service';
import { environment } from '../../../environments/environment';
import * as $ from 'jquery';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit, OnDestroy {
  @Input() bpAddress: string;

  public bp_tx_list: any = [];
  public total: number;
  public explUrl: string;
  private interval_id: any;
  public appId: number = environment.gameappId;

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit() {
    this.explUrl = environment.explorer + '/borapoint_transaction/' + this.appId + '/1/10';
    this.addr_list(this.appId, this.bpAddress, 1, 5);

    this.interval_id = setInterval(() => {
      this.addr_list(this.appId, this.bpAddress, 1, 5);
    }, 3 * 1000);
  }

  private addr_list(appId: number, addr: string, page: number, pageSize: number) {
    this.api.bp_tx_list(appId, page, pageSize).take(1).subscribe(
      res => {
        if (res.content.length > 0) {
          const oldTxHash = $('#table_transactions > tbody').find('td:first').text();
          if (oldTxHash !== res.content[0].transactionHash) {
            this.bp_tx_list = res.content;
          }
          if (this.bp_tx_list.length === 0) {
            console.log('data empty');
          }
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
