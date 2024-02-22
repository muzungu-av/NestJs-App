import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { winstonLogger } from 'winston.logger';
// import { CreateUserDto } from './dto/createUserDto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  // async create(createUserDto: CreateUserDto): Promise<User> {
  //   try {
  //     const createdUser = await this.userModel.create(createUserDto);
  //     winstonLogger.info('A user is created: ', createUserDto);
  //     return createdUser;
  //   } catch (error) {
  //     winstonLogger.error('Error creating user: ', error.message);
  //     throw new Error('Failed to create user');
  //   }
  // }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(email: string): Promise<User> {
    winstonLogger.info(`Trying to find the user: ${email}`);
    return this.userModel.findOne({ email: email }).exec();
  }
}
