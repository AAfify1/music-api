import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTrackDto } from 'src/track/create-track.dto';
import { UpdateTrackDto } from 'src/track/update-track.dto';
import { ITrack } from 'src/track/track.interface';

@Injectable()
export class TrackService {
  constructor(@InjectModel('Track') private trackModel: Model<ITrack>) {}

  async createTrack(createTrackDto: CreateTrackDto): Promise<ITrack> {
    const newTrack = await new this.trackModel(createTrackDto);
    return newTrack.save();
  }
  async updateTrack(
    trackId: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<ITrack> {
    const existingTrack = await this.trackModel.findByIdAndUpdate(
      trackId,
      updateTrackDto,
      { new: true },
    );
    if (!existingTrack) {
      throw new NotFoundException(`Track #${trackId} not found`);
    }
    return existingTrack;
  }
  async getAllTracks(): Promise<ITrack[]> {
    const trackData = await this.trackModel.find();
    if (!trackData || trackData.length == 0) {
      throw new NotFoundException('Tracks data not found!');
    }
    return trackData;
  }
  async getTrack(trackId: string): Promise<ITrack> {
    const existingTrack = await this.trackModel.findById(trackId).exec();
    if (!existingTrack) {
      throw new NotFoundException(`Track #${trackId} not found`);
    }
    return existingTrack;
  }
  async deleteTrack(trackId: string): Promise<ITrack> {
    const deletedTrack = await this.trackModel.findByIdAndDelete(trackId);
    if (!deletedTrack) {
      throw new NotFoundException(`Track #${trackId} not found`);
    }
    return deletedTrack;
  }
}
