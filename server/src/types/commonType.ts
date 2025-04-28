import { ObjectId } from "mongoose";

export interface Base {
    _id?: ObjectId;
}

export interface Timestamps {
    createdAt?: Date;
    updatedAt?: Date;
}
