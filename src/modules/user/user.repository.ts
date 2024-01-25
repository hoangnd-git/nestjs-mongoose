import { Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import User, { UserDocument } from '../../schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async createNewUser(user: IUser): Promise<UserDocument> {
    return await this.userModel.create(user);
  }

  async selectOne(
    filter: Record<string, any>,
    projection?: Record<string, any>,
  ): Promise<UserDocument> {
    return await this.userModel.findOne(filter, projection).lean();
  }

  async update(
    filter: Record<string, any>,
    updateData: Record<string, any>,
  ): Promise<UserDocument> {
    return await this.userModel.findOneAndUpdate(filter, {
      $set: updateData,
    }).lean();
  }
}
