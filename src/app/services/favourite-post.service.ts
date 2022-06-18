import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { FavouritePostModel } from '../models/favouritePostModel';
import { ResponseListModel, ResponseModel, ResponseSingleModel } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FavouritePostService {

  constructor(
    @Inject("baseUrl") private baseUrl: string,
    private http: HttpClient
  ) { }

  getListByUserId(userId: number) {
    let url = `${this.baseUrl}api/favouriteposts/getfavouriteposts?userId=${userId}`;
    return this.http.get<ResponseListModel<FavouritePostModel>>(url);
  }
  checkFavouritePost(userId: number, postId: number) {
    let url = `${this.baseUrl}api/favouriteposts/checkfavouritepost?userId=${userId}&postId=${postId}`;
    return this.http.get<ResponseSingleModel<FavouritePostModel>>(url);
  }
  addFavouritePost(favouritePost: FavouritePostModel) {
    let url = `${this.baseUrl}api/favouriteposts`;
    return this.http.post<ResponseModel>(url, favouritePost);
  }
  updateFavouritePost(favouritePost: FavouritePostModel) {
    let url = `${this.baseUrl}api/favouriteposts`;
    return this.http.put<ResponseModel>(url, favouritePost);
  }
  deleteFavouritePost(favouritePostId: number) {
    let url = `${this.baseUrl}api/favouriteposts?id=${favouritePostId}`;
    return this.http.delete<ResponseModel>(url);
  }

  deleteOrAdd(userId: number, postId: number) {
    let url = `${this.baseUrl}api/favouriteposts/deleteoradd`;
    return this.http.post<ResponseModel>(url, {
      userId: userId,
      postId: postId
    });
  }
}
