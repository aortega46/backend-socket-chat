import { User } from './user.entity';

export class Message {
  user: User;
  channel: string;
  message: string;
  date: string;
}
