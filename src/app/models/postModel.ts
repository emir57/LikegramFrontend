import { Usermodel } from "../services/auth.service";
import { PostCommentModel } from "./postCommentModel";
import { PostLikeModel } from "./postLikeModel";
import { UserModel } from "./userModel";

export interface PostModel {
  id: number;
  user: UserModel;
  imageUrl: string;
  description: string;
  createdDate: string;
  postComments: PostCommentModel[];
  postLikes: PostLikeModel[];
  isClickHeart: boolean;
  isClickBookmark: boolean;
  isClickComment: boolean;
  isClickSettings:boolean;
}
