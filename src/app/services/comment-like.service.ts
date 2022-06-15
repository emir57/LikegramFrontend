import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ResponseModel } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommentLikeService {

  constructor(
    @Inject("baseUrl") private baseUrl: string,
    private http: HttpClient
  ) { }

  likeOrUnlike(commentId: number, userId: number) {
    let newUrl = `${this.baseUrl}api/commentlikes/likeorunlike`;
    return this.http.post<ResponseModel>(newUrl, {
      commentId: commentId,
      userId: userId
    })
  }

  checkLike(commentId: number, userId: number) {
    let newUrl = `${this.baseUrl}api/commentlikes/checklike?commentId=${commentId}&userId=${userId}`;
    return this.http.get<ResponseModel>(newUrl)
  }
}
