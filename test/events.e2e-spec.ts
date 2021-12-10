import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CreateEventDto } from '../src/events/dto/create-event.dto';
import { EventsModule } from '../src/events/events.module';
import { EventsService } from '../src/events/events.service';

describe('EventsController (e2e)', () => {
  let app: INestApplication;
  let eventsService: EventsService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [EventsModule],
    }).compile();

    eventsService = moduleFixture.get<EventsService>(EventsService);

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('creates an event from POST ', () => {
    const createEvent = new CreateEventDto();
    createEvent.title = 'Lorem';
    createEvent.date = new Date('2021-12-10T15:30:30Z');
    createEvent.city = 'Köln';

    return request(app.getHttpServer())
      .post('/events')
      .send(createEvent)
      .expect(201);
  });

  it('deletes an event from DELETE', () => {
    const createEvent = new CreateEventDto();
    createEvent.title = 'Lorem';
    createEvent.date = new Date('2021-12-10T15:30:30Z');
    createEvent.city = 'Köln';

    const event = eventsService.create(createEvent);

    return request(app.getHttpServer())
      .delete('/events/' + event.id)
      .expect(200);
  });

  it('cannot delete non-existent events', () => {
    return request(app.getHttpServer())
      .delete('/events/not-existing-id')
      .expect(404);
  });
});
