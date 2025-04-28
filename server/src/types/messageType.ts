import { ObjectId } from "mongoose";
import { Base, Timestamps } from "./commonType";
import { User } from "./userType";
import { Group } from "./groupType";

export interface Message extends Base, Timestamps {
    content: string;
    sender: ObjectId | User;
    group: ObjectId | Group;
}
