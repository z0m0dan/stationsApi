import { EntityManager } from '@mikro-orm/mongodb';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Station } from './../entities/station.entity';
import { STATION_STATUS } from './../helpers/constants';
import { StationsQueryDto } from './dto/stations.dto';
import { StationApiResponse, StationCoordinates } from '@src/utils/types';

@Injectable()
export class StationsService {
  constructor(private readonly em: EntityManager) {}
  async getCloserStations({
    limit = 5,
    distance,
    ...userLocation
  }: StationsQueryDto): Promise<Array<StationApiResponse>> {
    const stations = await this.em.find(Station, {
      status: STATION_STATUS.IN_SERVICE,
    });

    if (!stations) {
      throw new NotFoundException('No stations found');
    }
    const stationsDistancesArray = this.greedyCalculateClosestStations(
      stations,
      userLocation,
      distance,
    );
    return stationsDistancesArray.length > limit
      ? stationsDistancesArray.slice(0, limit)
      : stationsDistancesArray;
  }

  private sortAndFilteryByDistance(
    stations: StationApiResponse[],
    distance?: number,
  ): Array<StationApiResponse> {
    const sortedStations = stations.sort((a, b) => a.distance - b.distance);
    return distance
      ? sortedStations.filter((station) => station.distance <= distance)
      : sortedStations;
  }

  private haversineDistance(
    coords1: StationCoordinates,
    coords2: StationCoordinates,
  ): number {
    function toRad(x: number) {
      return (x * Math.PI) / 180;
    }

    const lon1 = coords1.longitude;
    const lat1 = coords1.latitude;

    const lon2 = coords2.longitude;
    const lat2 = coords2.latitude;

    const R = 6371; // km

    const x1 = lat2 - lat1;
    const dLat = toRad(x1);
    const x2 = lon2 - lon1;
    const dLon = toRad(x2);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;

    return d;
  }

  greedyCalculateClosestStations(
    Stations: Station[],
    userLocation: StationsQueryDto,
    distance?: number,
  ): Array<StationApiResponse> {
    const distanceArray = Stations.map((station) => {
      const distance = this.haversineDistance(
        {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        },
        { latitude: station.latitude, longitude: station.longitude },
      );

      return {
        name: station.name,
        address: station.location,
        obcn: station.obcn,
        distanceStr: `${distance.toFixed(4)} km`,
        distance,
        coordinates: {
          latitude: station.latitude,
          longitude: station.longitude,
        },
      };
    });
    return this.sortAndFilteryByDistance(distanceArray, distance);
  }
}
