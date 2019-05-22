import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ApiService } from '../../api.service';
import { environment } from '../../../environments/environment';
import * as $ from 'jquery';

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.css']
})
export class BlocksComponent implements OnInit, OnDestroy {
  //@Input() appId: number;
  @Input() bpAddress: string;

  public bp_block_list: any = [];
  public explUrl: string; // = environment.explorer;
  private interval_id: any;
  public appId: number = environment.gameappId;
  
  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.explUrl = environment.explorer + '/borapoint_block/' + this.appId + '/1/10';
    this.block_list(this.appId, 1, 5);

    this.interval_id = setInterval(() => {
      this.block_list(this.appId, 1, 5);
    }, 3 * 1000);
  }

  private block_list(appId: number, page: number, pageSize: number) {
    // page(1), pageSize(10)
    this.api.bp_block_list(appId, page, pageSize).take(1).subscribe(
      res => {
        if (res.content.length === 0) {
          console.log('data empty');
        } else {
          if (this.bp_block_list.length > 0) {
            if (this.bp_block_list[0].blockNo !== res.content[0].blockNo) {
              this.bp_block_list = res.content;
            } else {
            }
          } else {
            this.bp_block_list = res.content;
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
