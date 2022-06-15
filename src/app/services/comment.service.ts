import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { PostCommentModel } from '../models/postCommentModel';
import { ResponseListModel, ResponseModel } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    @Inject("baseUrl") private baseUrl: string,
    private http: HttpClient
  ) { }

  getCommentsByPost(postId: number) {
    let url = `${this.baseUrl}api/comments/getcommentsbypost?postId=${postId}`;
    return this.http.get<ResponseListModel<PostCommentModel>>(url);
  }

  add(commentModel: PostCommentModel) {
    let url = `${this.baseUrl}api/comments/add`;
    return this.http.post<ResponseModel>(url, commentModel);
  }
  update(commentModel: PostCommentModel) {
    let url = `${this.baseUrl}api/comments/update`;
    return this.http.put<ResponseModel>(url, commentModel);
  }
  delete(commentId: number) {
    let url = `${this.baseUrl}api/comments/delete?id=${commentId}`;
    return this.http.delete<ResponseModel>(url);
  }
}
