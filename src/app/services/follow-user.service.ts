import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { FollowUserModel } from '../models/followUserModel';
import { ResponseListModel, ResponseModel, ResponseSingleModel } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FollowUserService {

  constructor(
    @Inject("baseUrl") private baseUrl: string,
    private http: HttpClient
  ) { }

  add(followUser: FollowUserModel) {
    let url = ``;
    this.http.post<ResponseModel>(url, followUser);
  }

  delete(followUserId: number) {
    let url = `/${followUserId}`;
    this.http.delete<ResponseModel>(url);
  }

  followedUserCount(followingUserId: number) {
    let url = `${this.baseUrl}api/users/followedUserCount/${followingUserId}`;
    return this.http.get<ResponseListModel<FollowUserModel>>(url);
  }

  followingUserCount(followedUserId: number) {
    let url = `${this.baseUrl}api/users/followingUserCount/${followedUserId}`;
    return this.http.get<ResponseListModel<FollowUserModel>>(url);
  }

}
