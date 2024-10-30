import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import configuration from '../../config.json';
import { parse } from 'papaparse';
import { Station } from './../entities/station.entity';

interface IStation {
  name: string;
  location: string;
  status: string;
  latitude: string;
  longitude: string;
  obcn: string;
}

const validateInvalidData = (data: IStation): boolean => {
  if (
    !data.name ||
    !data.location ||
    !data.status ||
    !data.latitude ||
    !data.longitude ||
    !data.obcn
  ) {
    console.log('Invalid data:', data);
    return false;
  }

  return true;
};

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const response = await fetch(configuration.GDL.bikes_csv_url);

    if (!response.ok || response.status >= 400) {
      throw new Error('Failed to fetch data');
    }

    const isData = await em.findAndCount(Station, {});
    console.log('isData', isData);
    if (isData[1] > 0) {
      console.log(
        'Data already exists in the database, deleting existing info. Please run the seeder again to insert the data',
      );
      await em.nativeDelete(Station, {});
      return;
    }

    const csvData = await response.text();
    console.log('Initializing database seed');
    let filesInserted = 0;
    let errors = 0;
    parse(csvData, {
      header: true,
      complete: async (results: { data: IStation[] }) => {
        for (const item of results.data) {
          if (!validateInvalidData(item)) {
            errors++;
            continue;
          }
          console.log('Inserting:', item.name);
          const station = em.create(Station, {
            name: item.name,
            location: item.location,
            status: item.status,
            latitude: parseFloat(item.latitude),
            longitude: parseFloat(item.longitude),
            obcn: item.obcn,
          });
          em.persist(station);
          filesInserted++;
        }
      },
    });
    console.log('Database seed completed');
    console.log('Files inserted:', filesInserted);
    console.log('Errors:', errors);
  }
}
