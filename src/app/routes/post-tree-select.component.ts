/*
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild} from "@angular/core";
import {NzTreeNode, NzTreeSelectComponent} from "ng-zorro-antd";
import {_HttpClient} from "@delon/theme";
import {environment} from "@env/environment";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {isUndefined} from "util";


const apiUrl = environment.apiUrl;

@Component({
  selector: 'post-tree-select',
  template: `
    <nz-tree-select
      [(ngModel)]="myModel"
      [nzDropdownStyle]="{maxHeight:'400px'}"
      [nzDefaultExpandAll]="true"
      [nzNodes]="nodes"
      style="width:100%"
      [nzMultiple]="multiple"
      nzPlaceHolder="请选择post"
      (ngModelChange)="onChange()"
      [nzSize]="size" nzShowSearch #selectTree>
    </nz-tree-select>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PostTreeSelectComponent),
      multi: true
    }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostTreeSelectComponent implements ControlValueAccessor, OnInit {
  nodes: any[] = [];

  @ViewChild('selectTree', { static: true })
  selectTree: NzTreeSelectComponent;

  @Input()
  size = 'default';

  @Input()
  multiple = false;


  _myModel: any;
  get myModel(): any {
    return this._myModel;
  }

  @Input()
  set myModel(value) {
    this._myModel = value;
    this.cdr.markForCheck();
  }


  @Input()
  deptId: any;

  @Output()
  myModelChange: EventEmitter<string> = new EventEmitter<string>();

  custChange: (value: string[] | string) => void;

  constructor(
    private http: _HttpClient,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {

  }

  writeValue(value: string[] | string): void {
    if (value) {
      // this.myModel = value;
      // this.selectTree.writeValue(value);
      this._myModel = value;
      this.cdr.markForCheck();
    }
  }

  registerOnChange(fn: (_: string[] | string) => void): void {
    this.custChange = fn;
  }

  registerOnTouched(fn: () => void): void {
  }

  loadPostNodes(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.deptId) {
        if (this.myModel !== '' && this.myModel !== null && this.myModel !== undefined) {
          // this.selectTree.onClearSelection();
          this.selectTree.value = null;
          this.myModel = null;
        }
        this.http.get(apiUrl + '/post/post-in-dept', { id: this.deptId }).subscribe(
          (result) => {
            if (result['meta']['success']) {
              if (result['data'] !== null && result['data'] !== '' && result['data'].length > 0) {
                this.nodes = result['data'];
                this.nodes = this.nodes.map(value => new NzTreeNode(value));
                resolve(this.nodes);
              } else {
                this.selectTree.nzNodes = [];
                // this.selectTree.treeRef.nzData = [];
                this.nodes = [];
                resolve([]);
              }
              this.cdr.markForCheck();
            }
          },
          error => {
            reject(error);
          }
        );
      } else {
        this.nodes = [];
        resolve([]);
      }
    });
  }

  onChange(): void {
    this.myModelChange.emit(this.myModel);
    if (!isUndefined(this.custChange) && 'function' === typeof this.custChange) {
      this.custChange(this.myModel);
    }
  }
}
*/
