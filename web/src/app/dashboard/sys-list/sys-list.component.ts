import { UserService } from './../../monitor.common.service';
import { HighchartConfig } from './../../model/entity';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzMessageService, NzModalService} from 'ng-zorro-antd';
import * as _ from 'lodash';
@Component({
  selector: 'app-sys-list',
  templateUrl: './sys-list.component.html',
  styleUrls: ['./sys-list.component.scss']
})
export class SysListComponent implements OnInit {
  sysItems: Array<any> = [];
  isVisible_add: any = false;
  appName = '';
  monitor = '';
  iot = '';
  systemId = '';
  isSpinning: any = true;
  validUser = true;
  editSiteName = '';
  editSiteId: '';
  pv_uv_config: HighchartConfig;
  total_pv_uv: any = {};
  constructor(
    private route: Router,
    private http: HttpClient,
    private msg: NzMessageService,
    private user:UserService,
    private confirmModal: NzModalService,
  ) { }

  ngOnInit() {
    this.list();
  }

  gotoSys(item, e, self) {
    if (self) {
      this.isSpinning = true;
      this.route.navigate(['sys/' + item.appKey]);
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    this.isSpinning = true;
    this.route.navigate(['sys/' + item.appKey]);
  }

  gotoSysSetting(item) {
    this.isSpinning = true;
    this.route.navigate(['sys/' + item.appKey + '/setting']);
  }

  addSys() {
    this.isVisible_add = true;
  }
  edit(item) {
    item.isEdit = true;
    this.editSiteName = item.appName;
    this.editSiteId = item.id;
  }
  saveAppName(item) {
    if (!this.editSiteName) {
      this.msg.info('站点名称必填');
      return;
    }
    this.http.put('Monitor/SiteSet', {
      id: this.editSiteId,
      appName: this.editSiteName,
    }).subscribe((data: any) => {
      if (data.IsSuccess) {
        this.msg.success('修改成功');
        item.appName = this.editSiteName;
        item.isEdit = false;
        this.editSiteName = '';
      } else {
        item.isEdit = false;
        this.msg.error('创修改失败');
      }
    });
  }
  list() {
    this.isSpinning = true;
    this.http.post('Monitor/SiteList', {}).subscribe((data: any) => {
      if (data.IsSuccess) {
        this.sysItems = data.Data;
        _.each(this.sysItems, (r) => {
          this.loadPvUvData(r);
        });
      }
      this.isSpinning = false;
    });
  }
  delSetting(item): void {
    this.confirmModal.confirm({
      nzTitle: '是否要删除该站点? 删除后相关数据无法恢复',
      nzOnOk: () =>
      this.http.post('Monitor/DelSite', {id: item.id}).subscribe((data: any) => {
        if (data.IsSuccess) {
          this.msg.info('删除成功!');
          this.list();
        }
      })
    });
  }
  save() {
    if (!this.appName) {
      this.msg.info('站点名称必填');
      return;
    }
    if (!this.monitor) {
      this.msg.info('监控项目部署的服务IP/域名必填');
      return;
    }
    if (!this.iot) {
      this.msg.info('IOT项目部署在的服务IP/域名必填');
      return;
    }
    this.http.post('Monitor/RegisterSite', {
      appName: this.appName,
      monitorSite: this.monitor,
      site: this.iot,
      systemId: this.systemId
    }).subscribe((data: any) => {
      if (data.IsSuccess) {
        this.msg.success('创建成功');
        this.list();
        this.isVisible_add = false;
      } else {
        this.msg.error('创建失败');
      }
    });
  }

  cancel() {
    this.isVisible_add = false;
  }
   // 加载PV/UV数据
   loadPvUvData(data) {
    this.http.post( 'Monitor/PvAndUvStatis', {
      TimeQuantum: 6,
      sTime:  '',
      eTime: '',
      appKey: data.appKey
    }).subscribe((d: any) => {
      if (d.IsSuccess) {
        this.renderPvUvChart(d.Data, data);
      }
    });
  }
  // 渲染PV/UV对比图
  renderPvUvChart(data, item) {
    const tempData = {
      pv: [],
      uv: []
    };

    item.total_pv_uv = {
      totalPv: data.totalPv,
      totalUv: data.totalUv
    };
    _.each(data.pvAndUvVmList, (val) => {
      tempData.pv.push([new Date(val.createTime).getTime(), val.pv]);
      tempData.uv.push([new Date(val.createTime).getTime(), val.uv]);
    });
    item.pv_uv_config = {
      type: 10,
      ext: {
        series: [{
          name: 'PV',
          data: tempData.pv
        }, {
          name: 'UV',
          data: tempData.uv
        }]
      }
    };
  }
}
