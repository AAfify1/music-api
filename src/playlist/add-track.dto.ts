import { IsNotEmpty, IsString } from 'class-validator';
export class AddTrackDto {
  @IsString()
  @IsNotEmpty()
  readonly trackId: string;
}
