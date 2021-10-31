import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let recordSchema = new Schema({
  nick: String,
  time: Number
});

export interface IRecord extends mongoose.Document {
  nick: string;
  time: number;
}

export let Record = mongoose.model<IRecord>('Record', recordSchema);
