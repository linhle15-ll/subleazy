import { Base } from "./commonType";

export interface House extends Base {
    address: string;
    city: string;
    state: string;
    zip: string;
    lat: number;
    long: number;
}
