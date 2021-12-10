import { v4 as uuid } from 'uuid';

export class Event {
  id: string;

  constructor(public title: string, public date: Date, public city: string) {
    this.id = uuid();
  }
}
