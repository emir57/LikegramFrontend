import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { PostModel } from '../models/postModel';
import { ResponseListModel, ResponseSingleModel } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    @Inject("baseUrl") private baseUrl: string,
    private http: HttpClient
  ) { }

  getPosts(userId: number) {
    let url = `${this.baseUrl}api/posts/getbyfolloweduser?followingUserId=${userId}`;
    return this.http.get<ResponseListModel<PostModel>>(url);
  }

  getPostCount(userId: number) {
    let url = `${this.baseUrl}api/users/postcount/${userId}`;
    return this.http.get<ResponseSingleModel<number>>(url);
  }
}
