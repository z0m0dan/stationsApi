import { ApiResponseProperty } from '@nestjs/swagger';

export class StationCoordinates {
  @ApiResponseProperty({ example: 20.666 })
  latitude: number;
  @ApiResponseProperty({ example: -103.348 })
  longitude: number;
}

export class StationApiResponse {
  @ApiResponseProperty({
    example: '(GDL-007) C. Epigmenio Glez./Av. Cristobal C.',
  })
  name: string;
  @ApiResponseProperty({ example: 'POLIGONO CENTRAL' })
  address: string;
  @ApiResponseProperty()
  coordinates: StationCoordinates;
  @ApiResponseProperty({ example: 1.118237 })
  distance: number;
  @ApiResponseProperty({
    example: '1.12 km',
  })
  distanceStr: string;
  @ApiResponseProperty({ example: 'GDL-007' })
  obcn: string;
}
