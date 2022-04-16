import { CommentAnswerModel } from "./commentAnswerModel";
import { UserModel } from "./userModel";

export interface PostCommentModel {
  id: number;
  user: UserModel;
  comment: string;
  commentAnswers: CommentAnswerModel[];
  createdDate: string;
}
