import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlaylistSchema } from './playlist/playlist.schema';
import { TrackSchema } from './track/track.schema';
import { TrackService } from 'src/track/track.service';
import { PlaylistService } from 'src/playlist/playlist.service';
import { TrackController } from 'src/track/track.controller';
import { PlaylistController } from 'src/playlist/playlist.controller';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

const connectionString = `mongodb+srv://music-api:NoJ74avVro9yqXYF@cluster0.gxznqol.mongodb.net/?retryWrites=true&w=majority`;
console.log(connectionString);
@Module({
  imports: [
    UserModule,
    AuthModule,
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
