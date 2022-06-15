import { PostCommentModel } from "./postCommentModel";
import { UserModel } from "./userModel";

export interface CommentLikeModel {
  userId: number;
  postCommentId: number;
  user?: UserModel;
  postComment: PostCommentModel;
}
