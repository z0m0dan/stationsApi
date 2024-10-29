import { Test, TestingModule } from '@nestjs/testing';
import { StationsService } from './stations.service';
import mikroOrmConfig from './../mikro-orm.config';
import { EntityManager } from '@mikro-orm/mongodb';
import { MikroORM } from '@mikro-orm/core';

let mikroOrm: MikroORM;

describe('StationsService', () => {
  let service: StationsService;

  beforeAll(async () => {
    mikroOrm = await MikroORM.init(mikroOrmConfig);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StationsService,
        {
          provide: EntityManager,
          useValue: mikroOrm.em.fork(),
        },
      ],
    }).compile();

    service = module.get<StationsService>(StationsService);
  });

  afterAll(async () => {
    await mikroOrm.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCloserStations', () => {
    it('should return an array of stations', async () => {
      const stations = await service.getCloserStations({
        distance: 5,
        latitude: 20.666,
        longitude: 103.333,
      });
      expect(stations).toBeInstanceOf(Array);
    });

    it('should return an array of stations with a length equal to the limit', async () => {
      const stations = await service.getCloserStations({
        limit: 3,
        distance: 5,
        latitude: 20.666378,
        longitude: -103.34882,
      });
      expect(stations.length).toBe(3);
    });

    it('Should return an empty aray if the stations are farther than the distance', async () => {
      //
      const stations = await service.getCloserStations({
        distance: 1,
        latitude: 24.002783179761458,
        longitude: -104.6716892667422,
      });
      expect(stations.length).toBe(0);
    });

    it('Should return all the stations if the limit is set to -1', async () => {
      const stations = await service.getCloserStations({
        limit: -1,
        distance: 5,
        latitude: 20.666378,
        longitude: -103.34882,
      });
      expect(stations.length).toBeGreaterThan(5);
    });
  });
});
