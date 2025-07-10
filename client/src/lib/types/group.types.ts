import { Base, Timestamps } from './common.types';

export interface Group extends Base, Timestamps {
  name?: string;
  isDM: boolean;
}
