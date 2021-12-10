import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CreateEventDto } from '../src/events/dto/create-event.dto';
import { EventsService } from '../src/events/events.service';
import { TicketsModule } from '../src/tickets/tickets.module';

describe('TicketsController (e2e)', () => {
  let app: INestApplication;
  let eventsService: EventsService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TicketsModule],
    }).compile();

    eventsService = moduleFixture.get<EventsService>(EventsService);

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('creates an ticket for an event from POST', () => {
    const createEvent = new CreateEventDto();
    createEvent.title = 'Lorem';
    createEvent.date = new Date('2021-12-10T15:30:30Z');
    createEvent.city = 'Köln';

    const event = eventsService.create(createEvent);

    return request(app.getHttpServer())
      .post('/tickets')
      .send({
        eventId: event.id,
        barcode: '12345678',
        firstName: 'John',
        lastName: 'Doe',
      })
      .expect(201);
  });

  it('cannot create a ticket for an non existent event from POST', () => {
    return request(app.getHttpServer())
      .post('/tickets')
      .send({
        eventId: 'not-existing-event-id',
        barcode: '12345678',
        firstName: 'John',
        lastName: 'Doe',
      })
      .expect(404);
  });
});
