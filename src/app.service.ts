import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { Channel } from './entities/channel.entity';
import { UpdateChannelDto } from './dto/update-channel.dto';

@Injectable()
export class AppService {
  private _channels$ = new BehaviorSubject<Channel[]>([
    {
      name: 'general',
    },
  ]);
  channels$ = this._channels$.asObservable();

  findAll(): Channel[] {
    return this._channels$.getValue();
  }

  addChannel(updateChannelDto: UpdateChannelDto) {
    try {
      const alreadyExists = this._channels$
        .getValue()
        .some((ch) => ch.name === updateChannelDto.name);

      if (alreadyExists) throw new ConflictException('Already exists');

      console.log('New channel created', updateChannelDto);
      const current = this._channels$.getValue();
      const state = [...current, updateChannelDto];
      this._channels$.next(state);
      return updateChannelDto;
    } catch (error) {
      if (error.status) return error;
      return new InternalServerErrorException('Something went wrong');
    }
  }
}
