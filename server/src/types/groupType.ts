import { Base, Timestamps } from "./commonType";

export interface Group extends Base, Timestamps {
    name?: string;
    isDM: boolean;
}
