import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { FavouritePostModel } from '../models/favouritePostModel';
import { ResponseListModel, ResponseSingleModel } from './auth.service';

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
}
