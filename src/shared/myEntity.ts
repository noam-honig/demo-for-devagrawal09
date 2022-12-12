import { Entity, Fields } from 'remult';
@Entity("myEntity", {})
export class myEntity {
  @Fields.autoIncrement()
  id = 0
  @Fields.date()
  myDate!: Date
}