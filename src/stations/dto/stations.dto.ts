import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
  NotEquals,
} from 'class-validator';

@ApiSchema({ name: 'stationsQuery' })
export class StationsQueryDto {
  @ApiProperty({
    name: 'latitude',
    required: true,
    type: Number,
    description: 'Latitude of the user',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsLatitude({
    message: 'Latitude must be a number conforming to the latitude format',
  })
  latitude: number;

  @ApiProperty({
    name: 'longitude',
    required: true,
    type: Number,
    description: 'Longitude of the user',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsLongitude({
    message: 'Longitude must be a number conforming to the longitude format',
  })
  longitude: number;

  @ApiProperty({
    name: 'limit',
    required: false,
    type: Number,
    default: 5,
    description: 'Limit of stations to return',
  })
  @IsOptional()
  @IsNumber()
  @Min(-1)
  @NotEquals(0)
  limit?: number;

  @ApiProperty({
    name: 'distance',
    required: false,
    type: Number,
    description: 'Distance treshold of stations from the current user location',
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  distance?: number;
}
