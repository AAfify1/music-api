import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddTrackDto } from 'src/playlist/add-track.dto';
import { CreatePlaylistDto } from 'src/playlist/create-playlist.dto';
import { UpdatePlaylistDto } from 'src/playlist/update-playlist.dto';
import { IPlaylist } from 'src/playlist/playlist.interface';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel('Playlist') private playlistModel: Model<IPlaylist>,
  ) {}

  async createPlaylist(
    createPlaylistDto: CreatePlaylistDto,
  ): Promise<IPlaylist> {
    const newPlaylist = await new this.playlistModel(createPlaylistDto);
    return newPlaylist.save();
  }
  async updatePlaylist(
    playlistId: string,
    updatePlaylistDto: UpdatePlaylistDto,
  ): Promise<IPlaylist> {
    const existingPlaylist = await this.playlistModel.findByIdAndUpdate(
      playlistId,
      updatePlaylistDto,
      { new: true },
    );
    if (!existingPlaylist) {
      throw new NotFoundException(`Playlist #${playlistId} not found`);
    }
    return existingPlaylist;
  }
  async getAllPlaylists(): Promise<IPlaylist[]> {
    const playlistData = await this.playlistModel.find();
    if (!playlistData || playlistData.length == 0) {
      throw new NotFoundException('Playlists data not found!');
    }
    return playlistData;
  }
  async getPlaylist(playlistId: string): Promise<IPlaylist> {
    const existingPlaylist = await this.playlistModel
      .findById(playlistId)
      .exec();
    if (!existingPlaylist) {
      throw new NotFoundException(`Playlist #${playlistId} not found`);
    }
    return existingPlaylist;
  }
  async deletePlaylist(playlistId: string): Promise<IPlaylist> {
    const deletedPlaylist = await this.playlistModel.findByIdAndDelete(
      playlistId,
    );
    if (!deletedPlaylist) {
      throw new NotFoundException(`Playlist #${playlistId} not found`);
    }
    return deletedPlaylist;
  }
  async addTrackToPlaylist(
    playlistId: string,
    addTrackDto: AddTrackDto,
  ): Promise<IPlaylist> {
    const existingPlaylist = await this.playlistModel.findByIdAndUpdate(
      playlistId,
      { $push: { tracks: addTrackDto.trackId } },
      { new: true },
    );
    if (!existingPlaylist) {
      throw new NotFoundException(`Playlist #${playlistId} not found`);
    }
    return existingPlaylist;
  }
  async removeTrackFromPlaylist(
    playlistId: string,
    addTrackDto: AddTrackDto,
  ): Promise<IPlaylist> {
    const existingPlaylist = await this.playlistModel.findByIdAndUpdate(
      playlistId,
      { $pull: { tracks: addTrackDto.trackId } },
      { new: true },
    );
    if (!existingPlaylist) {
      throw new NotFoundException(`Playlist #${playlistId} not found`);
    }
    return existingPlaylist;
  }
}
