import { CommentAnswerModel } from "./commentAnswerModel";
import { CommentLikeModel } from "./commentLikeModel";
import { UserModel } from "./userModel";

export interface PostCommentModel {
  id: number;
  user: UserModel;
  comment: string;
  commentAnswers: CommentAnswerModel[];
  commentAnswersCount?: number;
  commentLikes?: CommentLikeModel[];
  createdDate: string;
  userId?: number;
  postId?: number;
  isClickHeart?: boolean;
  isClickShowAnswer?: boolean;
}
