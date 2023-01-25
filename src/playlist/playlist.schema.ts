import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Track } from '../track/track.schema';
@Schema()
export class Playlist {
  @Prop()
  name: string;
  @Prop()
  creator: string;
  @Prop()
  playtime: number;
  @Prop()
  artwork: string;
  @Prop()
  tracks: [Track];
}
export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
