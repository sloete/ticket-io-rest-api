import { v4 as uuid } from 'uuid';

export class Ticket {
  id: string;

  constructor(
    public eventId: string,
    public barcode: string,
    public firstName: string,
    public lastName: string,
  ) {
    this.id = uuid();
  }
}
