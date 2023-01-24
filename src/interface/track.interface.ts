import { Document } from 'mongoose';
export interface ITrack extends Document {
  readonly name: string;
  readonly album: string;
  readonly genre: string;
  readonly artist: string;
  readonly artwork: string;
  readonly audio: string;
  readonly duration: number;
}
