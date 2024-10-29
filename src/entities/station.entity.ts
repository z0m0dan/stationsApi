import { Entity, Property } from '@mikro-orm/core';
import { BaseProperties } from './baseProperties';

@Entity()
export class Station extends BaseProperties {
  @Property()
  name: string;

  @Property()
  location: string;

  @Property()
  status: string;

  @Property()
  latitude: number;

  @Property()
  longitude: number;

  @Property()
  obcn: string;
}
