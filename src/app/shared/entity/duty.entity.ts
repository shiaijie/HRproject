export class DutyEntity {
  id: number;
  name: string;
  deleteFlag: string;
  remark: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
