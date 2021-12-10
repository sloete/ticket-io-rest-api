import { Test, TestingModule } from '@nestjs/testing';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { EventsService } from '../events/events.service';
import { Ticket } from './entities/ticket.entity';
import { NotFoundException } from '@nestjs/common';

describe('TicketsController', () => {
  let controller: TicketsController;
  let eventsService: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketsController],
      providers: [TicketsService, EventsService],
    }).compile();

    controller = module.get<TicketsController>(TicketsController);
    eventsService = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('can create a ticket for an existing event', () => {
    const event = eventsService.create({
      title: 'Lorem Ipsum',
      date: new Date(),
      city: 'Köln',
    });

    expect(
      controller.create({
        eventId: event.id,
        barcode: '12345678',
        firstName: 'John',
        lastName: 'Doe',
      }),
    ).toBeInstanceOf(Ticket);
  });

  it('throws an exception when trying to create a ticket for a non existent event', () => {
    expect(() => {
      controller.create({
        eventId: 'this-id-does-not-exist',
        barcode: '12345678',
        firstName: 'John',
        lastName: 'Doe',
      });
    }).toThrow(NotFoundException);
  });
});
