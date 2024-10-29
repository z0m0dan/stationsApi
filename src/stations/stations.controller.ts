import { Controller, Get, Query } from '@nestjs/common';
import { StationsService } from './stations.service';
import { StationsQueryDto } from './dto/stations.dto';
import { StationApiResponse } from '@src/utils/types';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @ApiOkResponse({ type: StationApiResponse, isArray: true })
  @Get('/')
  async getClosesStation(
    @Query() query: StationsQueryDto,
  ): Promise<Array<StationApiResponse>> {
    return this.stationsService.getCloserStations(query);
  }
}
