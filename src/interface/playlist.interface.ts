import { Document } from 'mongoose';
import { Track } from 'src/schema/track.schema';
export interface IPlaylist extends Document {
  readonly name: string;
  readonly creator: string;
  readonly playtime: number;
  readonly artwork: string;
  readonly tracks: [string];
}
