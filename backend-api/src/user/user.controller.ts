import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';

@Controller('/api/user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // async create(@Body() createUserDto: CreateUserDto) {
  //   await this.userService.create(createUserDto);
  // }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
  //todo этот клас пока не используется
  //todo есть по email есть по id
  // @Get(':id')
  // async findOne(@Param('id') id: string): Promise<User> {
  //   return this.userService.findOneById(id);
  // }

  //   @Delete(':id')
  //   async delete(@Param('id') id: string) {
  //     return this.userService.delete(id);
  //   }
}
