import { ObjectId } from "mongoose";
import { User } from "./userType";
import { Post } from "./postType";
import { Base } from "./commonType";

export interface Wish extends Base {
    user: ObjectId | User;
    post: ObjectId | Post;
}