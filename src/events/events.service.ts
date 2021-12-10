import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  private events: Event[] = [];

  create(createEventDto: CreateEventDto): Event {
    const newEvent = new Event(
      Math.random().toString(),
      createEventDto.title,
      createEventDto.date,
      createEventDto.city,
    );
    this.events.push(newEvent);

    return newEvent;
  }

  findAll(): Event[] {
    return [...this.events];
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
