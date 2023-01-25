import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly album: string;

  @IsString()
  readonly genre: string;

  @IsString()
  @IsNotEmpty()
  readonly artist: string;

  @IsString()
  readonly artwork: string;

  @IsString()
  @IsNotEmpty()
  readonly audio: string;

  @IsNumber()
  @IsNotEmpty()
  readonly duration: number;
}
