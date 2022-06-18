import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { FavouritePostModel } from '../models/favouritePostModel';
import { ResponseListModel } from './auth.service';

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
}
