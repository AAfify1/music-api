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
  UseGuards,
} from '@nestjs/common';
import { AddTrackDto } from 'src/playlist/add-track.dto';
import { CreatePlaylistDto } from 'src/playlist/create-playlist.dto';
import { UpdatePlaylistDto } from 'src/playlist/update-playlist.dto';
import { PlaylistService } from 'src/playlist/playlist.service';
import { AuthGuard } from '@nestjs/passport';
@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}
  @Post()
  async createPlaylist(
    @Res() response,
    @Body() createPlaylistDto: CreatePlaylistDto,
  ) {
    try {
      const newPlaylist = await this.playlistService.createPlaylist(
        createPlaylistDto,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Playlist has been created successfully',
        newPlaylist,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Playlist not created!',
        error: 'Bad Request',
      });
    }
  }
  @Put('/:id')
  async updatePlaylist(
    @Res() response,
    @Param('id') playlistId: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ) {
    try {
      const existingPlaylist = await this.playlistService.updatePlaylist(
        playlistId,
        updatePlaylistDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Playlist has been successfully updated',
        existingPlaylist,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Put('/:id/addTrack')
  async addTrack(
    @Res() response,
    @Param('id') playlistId: string,
    @Body() addTrackDto: AddTrackDto,
  ) {
    try {
      const existingPlaylist = await this.playlistService.addTrackToPlaylist(
        playlistId,
        addTrackDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Track has been successfully added to playlist',
        existingPlaylist,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Put('/:id/removeTrack')
  async removeTrack(
    @Res() response,
    @Param('id') playlistId: string,
    @Body() addTrackDto: AddTrackDto,
  ) {
    try {
      const existingPlaylist =
        await this.playlistService.removeTrackFromPlaylist(
          playlistId,
          addTrackDto,
        );
      return response.status(HttpStatus.OK).json({
        message: 'Track has been successfully removed from playlist',
        existingPlaylist,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getPlaylists(@Res() response) {
    try {
      const playlistData = await this.playlistService.getAllPlaylists();
      return response.status(HttpStatus.OK).json({
        message: 'All playlists data found successfully',
        playlistData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/:id')
  async getPlaylist(@Res() response, @Param('id') playlistId: string) {
    try {
      const existingPlaylist = await this.playlistService.getPlaylist(
        playlistId,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Playlist found successfully',
        existingPlaylist,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Delete('/:id')
  async deletePlaylist(@Res() response, @Param('id') playlistId: string) {
    try {
      const deletedPlaylist = await this.playlistService.deletePlaylist(
        playlistId,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Playlist deleted successfully',
        deletedPlaylist,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
