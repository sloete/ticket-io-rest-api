import * as mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  city: { type: String, required: true },
});

export interface Event extends mongoose.Document {
  id: string;
  title: string;
  date: Date;
  city: string;
}
