import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateTrackDto } from 'src/track/create-track.dto';
import { UpdateTrackDto } from 'src/track/update-track.dto';
import { TrackService } from 'src/track/track.service';
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}
  @Post()
  async createTrack(@Res() response, @Body() createTrackDto: CreateTrackDto) {
    try {
      const newTrack = await this.trackService.createTrack(createTrackDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Track has been created successfully',
        newTrack,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Track not created!',
        error: 'Bad Request',
      });
    }
  }
  @Put('/:id')
  async updateTrack(
    @Res() response,
    @Param('id') trackId: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    try {
      const existingTrack = await this.trackService.updateTrack(
        trackId,
        updateTrackDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Track has been successfully updated',
        existingTrack,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get()
  async getTracks(@Res() response) {
    try {
      const trackData = await this.trackService.getAllTracks();
      return response.status(HttpStatus.OK).json({
        message: 'All tracks data found successfully',
        trackData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/:id')
  async getTrack(@Res() response, @Param('id') trackId: string) {
    try {
      const existingTrack = await this.trackService.getTrack(trackId);
      return response.status(HttpStatus.OK).json({
        message: 'Track found successfully',
        existingTrack,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Delete('/:id')
  async deleteTrack(@Res() response, @Param('id') trackId: string) {
    try {
      const deletedTrack = await this.trackService.deleteTrack(trackId);
      return response.status(HttpStatus.OK).json({
        message: 'Track deleted successfully',
        deletedTrack,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
