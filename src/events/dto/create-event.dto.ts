import { IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEventDto {
  @IsNotEmpty()
  title: string;

  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsNotEmpty()
  city: string;
}
