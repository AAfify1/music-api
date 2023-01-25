import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Track } from 'src/track/track.schema';
export class CreatePlaylistDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  readonly artwork: string;

  @IsString()
  @IsNotEmpty()
  readonly creator: string;

  @IsNumber()
  @IsNotEmpty()
  readonly playtime: number;

  @IsArray()
  @IsNotEmpty()
  readonly tracks: [string];
}
