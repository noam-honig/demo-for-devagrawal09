import { remult, Entity, Fields } from "remult";
import { createRemultServer } from "remult/server";
@Entity("myEntity", {})
export class myEntity {
  @Fields.autoIncrement()
  id = 0
  @Fields.date()
  myDate!: Date
}

export const api = createRemultServer({
  entities: [myEntity],
  initApi: async () => {
    const repo = remult.repo(myEntity);
    for (const item of await repo.find()) {
      await repo.delete(item);
    }
    var dateString = new Date().toISOString();
    var item = repo.create({
      id: 1,
      myDate: new Date(dateString)
    })
    console.log({
      item,
      isDate: isDate(item.myDate)
    });

    let afterSave = await repo.save(item);

    console.log({
      afterSave,
      isDate: isDate(afterSave.myDate)
    });

    let afterFind = await repo.findFirst();
    console.log({
      afterFind,
      isDate: isDate(afterFind.myDate)
    });
  }
})

function isDate(date: any) {
  return typeof date.getMonth === 'function'
}