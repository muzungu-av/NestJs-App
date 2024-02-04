import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUserDto';
import { User } from './schemas/user.schema';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';

@Controller('/api/user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.userService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  //   @Delete(':id')
  //   async delete(@Param('id') id: string) {
  //     return this.userService.delete(id);
  //   }
}
