import { getModelToken } from '@nestjs/mongoose';
import { TestingModule } from '@nestjs/testing';
import User from '../schemas/user.schema';
import { Model } from 'mongoose';

export class TestUtils {
  public static INIT_MODULES = [];

  public static INIT_PROVIDERS = [];

  public static getServices(module: TestingModule) {}

  public static getModels(module: TestingModule) {
    const userModel = module.get(getModelToken(User.name)) as Model<any>;

    return { userModel };
  }

  public static async clearDB(module: TestingModule) {
    const models = this.getModels(module);
    const promises = [];
    for (const [key, model] of Object.entries(models)) {
      promises.push(model.deleteMany());
    }
    await Promise.all(promises);
  }
}
