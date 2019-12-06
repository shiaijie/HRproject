import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css']
})
export class RosterComponent implements OnInit {

  listOfData = [
    {
      key: "1",
      name: "John Brown",
      jobCode: "2019001",
      sex: "男",
      age: 32,
      depart: "组织部",
      post: "部长",
      duty: "主管",
      address: "New York No. 1 Lake Park"
    },
    {
      key: "2",
      name: "Jim Green",
      jobCode: "2019002",
      sex: "女",
      age: 42,
      depart: "宣传部",
      post: "副部长",
      duty: "副主管",
      address: "London No. 2 Lake Park"
    },
    {
      key: "3",
      name: "Joe Black",
      jobCode: "2019003",
      sex: "男",
      age: 32,
      depart: "纪检部",
      post: "部员",
      duty: "普通员工",
      address: "Sidney No. 3 Lake Park"
    },
    {
      key: "4",
      name: "John",
      jobCode: "2019004",
      sex: "男",
      age: 32,
      depart: "组织部",
      post: "部长",
      duty: "主管",
      address: "New York No. 4 Lake Park"
    },
    {
      key: "5",
      name: "Jim",
      jobCode: "2019005",
      sex: "女",
      age: 42,
      depart: "宣传部",
      post: "副部长",
      duty: "副主管",
      address: "London No. 5 Lake Park"
    },
    {
      key: "6",
      name: "Joe Black",
      jobCode: "2019006",
      sex: "男",
      age: 32,
      depart: "纪检部",
      post: "部员",
      duty: "普通员工",
      address: "Sidney No. 6 Lake Park"
    },
    {
      key: "7",
      name: "John Brown",
      jobCode: "2019007",
      sex: "男",
      age: 32,
      depart: "组织部",
      post: "部长",
      duty: "主管",
      address: "New York No. 7 Lake Park"
    },
    {
      key: "8",
      name: "Jim Green",
      jobCode: "2019008",
      sex: "女",
      age: 42,
      depart: "宣传部",
      post: "副部长",
      duty: "副主管",
      address: "London No. 8 Lake Park"
    },
    {
      key: "9",
      name: "Joe Black",
      jobCode: "2019009",
      sex: "男",
      age: 32,
      depart: "纪检部",
      post: "部员",
      duty: "普通员工",
      address: "Sidney No. 9 Lake Park"
    },
    {
      key: "10",
      name: "John Brown",
      jobCode: "2019010",
      sex: "男",
      age: 32,
      depart: "组织部",
      post: "部长",
      duty: "主管",
      address: "New York No. 10 Lake Park"
    },
    {
      key: "11",
      name: "Jim Green",
      jobCode: "2019011",
      sex: "女",
      age: 42,
      depart: "宣传部",
      post: "副部长",
      duty: "副主管",
      address: "London No. 11 Lake Park"
    },
    {
      key: "12",
      name: "Joe Black",
      jobCode: "2019012",
      sex: "男",
      age: 32,
      depart: "纪检部",
      post: "部员",
      duty: "普通员工",
      address: "Sidney No. 12 Lake Park"
    },
    {
      key: "13",
      name: "John Brown",
      jobCode: "2019013",
      sex: "男",
      age: 32,
      depart: "组织部",
      post: "部长",
      duty: "主管",
      address: "New York No. 13 Lake Park"
    },
    {
      key: "14",
      name: "Jim Green",
      jobCode: "2019014",
      sex: "女",
      age: 42,
      depart: "宣传部",
      post: "副部长",
      duty: "副主管",
      address: "London No. 14 Lake Park"
    },
    {
      key: "15",
      name: "Joe Black",
      jobCode: "2019015",
      sex: "男",
      age: 32,
      depart: "纪检部",
      post: "部员",
      duty: "普通员工",
      address: "Sidney No. 15 Lake Park"
    }
  ];

  pageIndex = 1;
  pageSize = 10;
  total = 1;

  loading = true;
  sortValue: string | null = null;
  sortKey: string | null = null;
  filterGender = [
    { text: "男", value: "male" },
    { text: "女", value: "female" }
  ];
  searchGenderList: string[] = [];

  highSearchForm: FormGroup;
  submitForm(): void {
    for (const i in this.highSearchForm.controls) {
      this.highSearchForm.controls[i].markAsDirty();
      this.highSearchForm.controls[i].updateValueAndValidity();
    }
  }

  // 高级搜索选择的部门
  selectedDepart;

  // 高级搜索选择的岗位
  selectedDuty;

  // 高级搜索选择的职位
  selectedPost;

  //简单搜索输入框
  simpleSearchStr = "";
  //简单搜索
  simpleSearch() {
    console.log(this.simpleSearchStr);
  }

  searchData(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
  }

  updateFilter(value: string[]): void {
    this.searchGenderList = value;
    this.searchData(true);
  }
  //高级搜索
  highSearch() {}

  constructor(private nzMessageService: NzMessageService,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loading = false;
    //高级搜索框表单初始化
    this.highSearchForm = this.fb.group({
      name: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  departData = ['部门1', '部门2'];
  postData: { [depart: string]: string[] } = {
    '部门1': ['职位1-1', '职位1-2'],
    '部门2': ['职位2-1', '职位2-2']
  };
  dutyData: { [post: string]: string[] } = {
    '职位1-1': ['岗位1-1-1', '岗位1-1-2'],
    '职位1-2': ['岗位1-2-1', '岗位1-2-1'],
    '职位2-1': ['岗位2-1-1', '岗位2-1-2'],
    '职位2-2': ['岗位2-2-2', '岗位2-2-2']
  };

  departChange(value: string): void {
    this.selectedPost = this.postData[value][0];
  }
  postChange(value: string): void {
    this.selectedDuty = this.dutyData[value][0];
  }

}
