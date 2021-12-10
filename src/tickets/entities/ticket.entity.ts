export class Ticket {
  id: string;

  constructor(
    public barcode: string,
    public firstName: string,
    public lastName: string,
  ) {}
}
