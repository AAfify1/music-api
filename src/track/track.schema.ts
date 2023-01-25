import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Track {
  @Prop()
  name: string;
  @Prop()
  album: string;
  @Prop()
  genre: string;
  @Prop()
  artist: string;
  @Prop()
  artwork: string;
  @Prop()
  audio: string;
  @Prop()
  duration: number;
}
export const TrackSchema = SchemaFactory.createForClass(Track);
