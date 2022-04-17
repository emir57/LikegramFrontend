import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CommentAnswerModel } from '../models/commentAnswerModel';
import { ResponseModel } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(
    @Inject("baseUrl") private baseUrl: string,
    private http: HttpClient
  ) { }
  add(commentModel: CommentAnswerModel) {
    let url = `${this.baseUrl}api/answers/add`;
    return this.http.post<ResponseModel>(url, commentModel);
  }
  update(commentModel: CommentAnswerModel) {
    let url = `${this.baseUrl}api/answers/update`;
    return this.http.put<ResponseModel>(url, commentModel);
  }
  delete(answerId: number) {
    let url = `${this.baseUrl}api/answers/delete?id=${answerId}`;
    return this.http.delete<ResponseModel>(url);
  }
}