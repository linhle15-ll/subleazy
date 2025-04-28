import { ObjectId } from "mongoose";
import { Base, Timestamps } from "./commonType";
import { Post } from "./postType";

export interface User extends Base, Timestamps {
    firstName: string;
    lastName: string;
    passwordHash: string;
    email: string;
    isVerified: boolean;
    profileImage: string;
    sublesseeHistory: [ObjectId | Post];
}