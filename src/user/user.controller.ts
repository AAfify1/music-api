import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/create-user.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );
    const result = await this.usersService.createUser(
      createUserDto.username,
      hashedPassword,
    );
    return result;
  }
}
