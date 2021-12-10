import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  private events: Event[] = [];

  create(createEventDto: CreateEventDto): Event {
    const newEvent = new Event(
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

  findOne(id: string) {
    const event = this.findEventByIdOrFail(id);

    return { ...event };
  }

  update(id: string, updateEventDto: UpdateEventDto) {
    const event = this.findEventByIdOrFail(id);

    for (const key in updateEventDto) {
      if (updateEventDto[key]) {
        event[key] = updateEventDto[key];
      }
    }

    return { ...event };
  }

  remove(id: string) {
    this.findEventByIdOrFail(id);

    this.events = this.events.filter((event) => event.id !== id);
  }

  private findEventByIdOrFail(id: string) {
    const event = this.events.find((event) => event.id === id);

    if (!event) {
      throw new NotFoundException(`Event ${id} not found.`);
    }

    return event;
  }
}
