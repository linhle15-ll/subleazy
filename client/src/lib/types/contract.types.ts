import { Base, Timestamps } from './common.types';

export interface ContractRequestBody extends Base, Timestamps {
  address: string;
  minPrice: number;
  maxPrice: number;
}
