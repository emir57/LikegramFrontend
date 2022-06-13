import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ResponseModel } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostLikeService {

  constructor(
    @Inject("baseUrl") private baseUrl: string,
    private http: HttpClient
  ) { }

  likeOrUnlike(userId: number, postId: number) {
    let newUrl = `${this.baseUrl}api/postlikes/likeorunlike`;
    return this.http.post<ResponseModel>(newUrl, {
      userId, postId
    });
  }
  checkLike(userId: number, postId: number) {
    let newUrl = `${this.baseUrl}api/postlikes/checklike?userId=${userId}&postId=${postId}`;
    return this.http.get<ResponseModel>(newUrl);
  }
}
