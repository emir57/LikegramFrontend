import { UserModel } from "./userModel";

export interface FollowUserModel {
  id?: number;
  followingUserId: number;
  followingUser?: UserModel;
  followedUserId: number;
  followedUser?: UserModel;
}
