import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { IUser } from './interfaces/user.interface';
import { UserDocument } from '../../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async createNewUser(user: IUser): Promise<UserDocument> {
    return await this.userRepository.createNewUser(user);
  }

  public async getUserByEmail(email: string): Promise<UserDocument> {
    return await this.userRepository.selectOne({
      email,
    });
  }

  public async getUserWithOtp(
    email: string,
    otp: string,
  ): Promise<UserDocument> {
    return await this.userRepository.selectOne({
      email,
      otp,
    });
  }

  public async userVerifySignup(email: string): Promise<void> {
    await this.userRepository.update(
      {
        email,
      },
      {
        otp: '',
        verified: true,
      },
    );
  }

  public async userLogin(
    email: string,
    password: string,
  ): Promise<UserDocument> {
    return await this.userRepository.selectOne({
      email,
      password,
    });
  }

  public async userGetProfile(email: string): Promise<UserDocument> {
    return await this.userRepository.selectOne(
      {
        email,
      },
      {
        email: 1,
      },
    );
  }
}
