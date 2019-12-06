export class PostEntity {
  id: number;
  name: string;
  deleteFlag: string;
  remark: string;
  depart: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}

