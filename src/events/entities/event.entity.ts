import { v4 as uuidv4 } from 'uuid';

export class Event {
  id: string;

  constructor(public title: string, public date: Date, public city: string) {
    this.id = uuidv4();
  }
}
