import { Usermodel } from "../services/auth.service";

export interface CommentAnswerModel {
  id: number;
  user: Usermodel;
  answer: string;
  createdDate: string;
}
