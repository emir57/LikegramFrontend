import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { PostModel } from '../models/postModel';
import { ResponseListModel } from './auth.service';

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
}
