import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/createUserDto';
import { User } from './schemas/user.schema';
import { winstonLogger } from 'winston.logger';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    winstonLogger.info('A user is created: ', createUserDto);
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(email: string): Promise<User> {
    winstonLogger.info(`Trying to find the user: ${email}`);
    return this.userModel.findOne({ email: email }).exec();
  }
}
