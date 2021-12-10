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
    const event = this.events.find((event) => event.id === id);

    if (!event) {
      throw new NotFoundException(`Event ${id} not found.`);
    }

    return { ...event };
  }

  update(id: string, updateEventDto: UpdateEventDto) {
    const event = this.events.find((event) => event.id === id);

    if (!event) {
      throw new NotFoundException(`Event ${id} not found.`);
    }

    for (const key in updateEventDto) {
      if (updateEventDto[key]) {
        event[key] = updateEventDto[key];
      }
    }

    return { ...event };
  }

  remove(id: string) {
    const event = this.events.find((event) => event.id === id);

    if (!event) {
      throw new NotFoundException(`Event ${id} not found.`);
    }

    this.events = this.events.filter((event) => event.id !== id);
  }
}
