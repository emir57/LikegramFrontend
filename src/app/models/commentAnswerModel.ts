import { Key } from "protractor";
import { UserModel } from "./userModel";

export interface CommentAnswerModel {
  id: number;
  user: UserModel;
  answer: string;
  createdDate: string;
  userId?: number;
  postCommentId?: number;
}
