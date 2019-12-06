/*
import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {_HttpClient} from "@delon/theme";
import {environment} from "@env/environment";
import {PostTreeSelectComponent} from "../post-tree-select.component";
import {DutyEntity} from "@shared/entity/duty.entity";
import {PostEntity} from "@shared/entity/post.entity";



const apiUrl = environment.apiUrl;

@Component({
  selector: 'app-depart-post-duty-select',
  templateUrl: './depart-post-duty-select.component.html',
  styles: []
})
export class DepartPostDutySelectComponent implements OnInit {


  constructor(private http: _HttpClient) { }

  @ViewChild('departPostDuty', { static: true })
  departPostDuty;

  @ViewChild('postTree', { static: true })
  postTree: PostTreeSelectComponent;

  // 部门是否多选(默认单选)
  multipleDepart = false;

  dutyOptions: DutyEntity[] = [];
  postOptions: PostEntity[] = [];

  @Input()
  departModel: any;
  @Input()
  postModel: any;
  @Input()
  dutyModel: any;
  @Input()
  nameModel: any;
  @Input()
  jobCodeModel: any;

  @Input()
  autoLoad = true;

  @Output()
  departMoedlChange: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  postModelChange: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  dutyModelChange: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  nameModelChange: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  jobCodeModelChange: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {

    if (this.autoLoad) {
      this.loadDutys();
    }
  }

  loadDuty() {
    this.http.get(apiUrl + '/duty/all').subscribe(
      (result) => {
        if (result['meta']['success']) {
          this.dutyOptions = result['data'];
        }
      }
    );
  }

  public loadDutys(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + '/duty/all').subscribe(
        (result) => {
          if (result['meta']['success']) {
            this.dutyOptions = result['data'];
            resolve(this.dutyOptions);
          } else {
            reject(result['message']);
          }
        },
        error => {
          reject(error);
        }
      );
    });
  }

  // 部门为空情况下，设置岗位/职位/班组都为空
  setDepartNull() {
    // 岗位都为空
    this.postModel = null;
    this.postTree.deptId = null;
    this.postTree.loadPostNodes();
    this.postOptions = [];
    this.postModelChange.emit(this.postModel);
  }

  // 部门改变事件
  selectDepart (id) {
    // 每次改变都先清空原先岗位和班组的值
    this.postModel = null;

    const departIds = id.join(',');
    // 多选的情况下
    if (id.length > 1) {
      const param = {
        'departId': departIds
      };
      // 修改岗位数据
      this.http.get(apiUrl + '/post/get-post-depart', param).subscribe(
        (result) => {
          if (result['meta']['success']) {
            this.postOptions = result['data'];
            // 部门多选  -》 展示岗位多选控件
            this.multipleDepart = true;
          }
        },
      );

    } else {
      // 部门单选  -》 展示岗位树控件
      this.multipleDepart = false;
      if (id === null || id.length === 0) {
        // 部门为空的情况下
        this.setDepartNull();
      } else {
        // 单选  部门 岗位 联动
        // 修改岗位数据
        this.postTree.deptId = id;
        this.postTree.loadPostNodes();
      }
    }
    this.selectChange();
  }


  // 岗位改变事件
  selectPost(id) {
    this.postModel = id;
    this.selectChange();
  }

  selectDuty() {
    this.dutyModelChange.emit(this.dutyModel);
  }

  selectChange() {
    this.departMoedlChange.emit(this.departModel);
    this.postModelChange.emit(this.postModel);
    this.dutyModelChange.emit(this.dutyModel);
  }

  selectName() {
    this.nameModelChange.emit(this.nameModel);
  }
  selectJobCode() {
    this.jobCodeModelChange.emit(this.jobCodeModel);
  }


}
*/
