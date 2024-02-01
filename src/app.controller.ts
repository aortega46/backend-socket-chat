import { Body, Controller, Get, Patch } from '@nestjs/common';
import { AppService } from './app.service';
import { Channel } from './entities/channel.entity';
import { UpdateChannelDto } from './dto/update-channel.dto';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('channels')
  getAllChannels(): Channel[] {
    return this.appService.findAll();
  }

  @Patch('channels')
  addChannel(@Body() updateChannelDto: UpdateChannelDto): Channel {
    return this.appService.addChannel(updateChannelDto);
  }
}
