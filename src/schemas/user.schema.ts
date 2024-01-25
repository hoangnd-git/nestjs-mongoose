import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTimestampsConfig } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'user',
  autoCreate: true,
})
export default class User {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  readonly email: string;

  @Prop({
    type: String,
    required: true,
  })
  readonly password: string;

  @Prop({
    type: String,
    required: false,
  })
  readonly otp: string;

  @Prop({
    type: Boolean,
    required: true,
    default: false,
  })
  readonly verified: boolean;
}

export type UserDocument = User & Document & SchemaTimestampsConfig;

export const UserSchema = SchemaFactory.createForClass(User).set(
  'versionKey',
  false,
);
