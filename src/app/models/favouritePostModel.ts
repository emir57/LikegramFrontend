import { PostModel } from "./postModel";
import { UserModel } from "./userModel";

export interface FavouritePostModel {
  id?: number;
  userId: number;
  user?: UserModel;
  postId: number;
  post?: PostModel;
}
