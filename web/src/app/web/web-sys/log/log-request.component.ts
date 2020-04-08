
import {fromEvent as observableFromEvent,  Observable } from 'rxjs';

import { slideInDownAnimation } from './../../../animations';
import { ActivatedRoute } from '@angular/router';
import { Broadcaster } from './../../../monitor.common.service';
import { HttpClient } from '@angular/common/http';

import { Component, OnInit, ViewChildren, ElementRef, Renderer2 } from '@angular/core';


import * as _ from 'lodash';
declare var window: any;
@Component({
  selector: 'app-api-request',
  templateUrl: './log-request.component.html',
  styleUrls: ['./log-request.component.scss'],
  animations: [slideInDownAnimation]
})
export class LogRequestComponent implements OnInit {
  @ViewChildren('mydetailsContent') mydetailsContent: Array<ElementRef>;
  isSpinning = {
    spin1: true,
    spin2: true
  };
  sub = null;
  appKey;
  keywords = '';
  pageIndex = 0;
  pageSize = 10;
  apiListData = [];
  total = 0;
  timeLine = {
    start: 0,
    end: 4,
  };
  constructor(
    private render: Renderer2,
    private http: HttpClient,
    private broadcaster: Broadcaster,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.broadcaster.broadcast('showGlobalTimer', true);
    this.getData('init');
    this.sub = this.broadcaster.on('choiceTimeToRender').subscribe((data: any) => {
      console.log(data.time, data.type);
      this.timeLine = {
        start: data.time,
        end: data.type,
      };
      // }
      this.apiListData = [];
      this.pageIndex = 0;
      this.getData('search');
    });
  }
  search() {
    this.apiListData = [];
    this.pageIndex = 0;
    this.getData('search');
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  getData(type) {
    this.appKey = this.route.parent.snapshot.paramMap.get('appKey');
    // if (this.apiListData.length === this.total && !type) {
    //   return;
    // }
    if (type) {
      this.pageIndex = 1;
    }else{
      this.pageIndex += 1;
      if (this.total >0 && Math.ceil(this.total / this.pageSize) === this.pageIndex) {
        return;
      }
    }
    
    this.http.post('Monitor/errorList', {
      TimeQuantum: this.timeLine.end === 7 ? '' : this.timeLine.end,
      sTime: this.timeLine.end === 7 ? this.timeLine.start[0] : '',
      eTime: this.timeLine.end === 7 ? this.timeLine.start[1] : '',
      appKey: this.appKey,
      keywords: this.keywords,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    }).subscribe((d: any) => {
      if (d.IsSuccess) {
        if (d.Data && d.Data.List.length > 0) {
          this.apiListData = [...this.apiListData, ...d.Data.List];
          this.total = d.Data.TotalCount;
        }
      }
    });
  }
}



