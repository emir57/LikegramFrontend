import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

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
    return this.http.get<any>(url);
  }
}
