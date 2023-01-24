import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlaylistSchema } from './schema/playlist.schema';
import { TrackSchema } from './schema/track.schema';
import { TrackService } from './service/track/track.service';
import { PlaylistService } from './service/playlist/playlist.service';
import { TrackController } from './controller/track/track.controller';
import { PlaylistController } from './controller/playlist/playlist.controller';

const connectionString = `mongodb+srv://music-api:NoJ74avVro9yqXYF@cluster0.gxznqol.mongodb.net/?retryWrites=true&w=majority`;
console.log(connectionString);
@Module({
  imports: [
    MongooseModule.forRoot(connectionString, { dbName: 'music-api' }),
    MongooseModule.forFeature([
      { name: 'Playlist', schema: PlaylistSchema },
      { name: 'Track', schema: TrackSchema },
    ]),
  ],
  controllers: [AppController, TrackController, PlaylistController],
  providers: [AppService, TrackService, PlaylistService],
})
export class AppModule {}
