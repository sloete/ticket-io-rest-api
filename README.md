## Task

Baue eine API um folgende Informationen anzuzeigen und zu speichern:

- eventTitle
- eventDate
- eventCity
- tickets[].barcode (alphanummerisch, acht Stellen maximal)
- tickets[].firstName
- tickets[].lastName

Die Daten müssen nicht in einer Datenbank, sondern können zur Laufzeit gespeichert werden.

## Routes exposed by this service
### Events

| Method | Path | Description | Body |
|-----|------|------|------|
| GET | /events | Get's a list of all available events. |
| GET | /events/{id} | Retrieves a specific event by the given id. <br />*Returns 404 if event does not exist.* |
| POST | /events | Creates a new event. | **Required fields:**<br />title: *string*<br />date: *Date*<br />city: *string* |
| Patch | /events | Updates an existing event with the given fields. <br />*Returns 404 if event does not exist.* | **Possible fields** <br />title: *string*<br />date: *Date*<br />city: *string* |
| DELETE | /events/{id} | Deletes a specific event by the given id. |


### Tickets

| Method| Path | Description | Body |
|-----|------|------|------|
| GET | /tickets | Get's a list of all available tickets.
| GET | /tickets/{id} | Retrieves a specific ticket by the given id. <br />*Returns 404 if ticket does not exist.*
| POST | /tickets | Creates a new ticket associated with an existing event. <br />*Returns 404 if given eventId is not existent.* | **Required fields:**<br />eventId: *string*<br />barcode: *string*<br />firstName: *string*<br />lastName: *string*
| Patch | /tickets | Updates an existing event with the given fields. <br />*Returns 404 if ticket does not exist.* | **Possible fields** <br />eventId: *string*<br />barcode: *string*<br />firstName: *string*<br />lastName: *string*
| DELETE | /tickets/{id} | Deletes a specific ticket by the given id.



## Description

Build with [Nest](https://github.com/nestjs/nest).

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
