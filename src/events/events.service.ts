import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel('Event') private readonly eventModel: Model<Event>,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const newEvent = new this.eventModel({
      title: createEventDto.title,
      date: createEventDto.date,
      city: createEventDto.city,
    });
    await newEvent.save();
    return newEvent.id as string;
  }

  async findAll() {
    const events = await this.eventModel.find().exec();
    return events.map((event) => ({
      id: event.id,
      title: event.title,
      date: event.date,
      city: event.city,
    }));
  }

  async findOne(id: string) {
    const event = await this.findEventByIdOrFail(id);

    return {
      id: event.id,
      title: event.title,
      date: event.date,
      city: event.city,
    };
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    const event = await this.findEventByIdOrFail(id);

    for (const key in updateEventDto) {
      if (updateEventDto[key]) {
        event[key] = updateEventDto[key];
      }
    }

    return await event.save();
  }

  async remove(id: string) {
    const result = await this.eventModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Event ${id} not found.`);
    }
  }

  private async findEventByIdOrFail(id: string): Promise<Event> {
    let event;

    try {
      event = await this.eventModel.findById(id);
    } catch (error) {
      throw new NotFoundException(`Event ${id} not found.`);
    }

    if (!event) {
      throw new NotFoundException(`Event ${id} not found.`);
    }

    return event;
  }
}
