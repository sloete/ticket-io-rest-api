import { IsAlphanumeric, IsNotEmpty, Length } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty()
  eventId: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  @Length(8, 8)
  barcode: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;
}
