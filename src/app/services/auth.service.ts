import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    @Inject("baseUrl") private baseUrl: string,
    private http: HttpClient
  ) { }

  isLogin: boolean = false;

  login(loginModel: LoginModel) {
    let url = `${this.baseUrl}api/auth/login`;
    return this.http.post<LoginResponseModel>(url, loginModel)
  }

  register(registerModel: RegisterModel) {
    let url = `${this.baseUrl}api/auth/register`;
    return this.http.post<ResponseModel>(url, registerModel);
  }
  emailConfirm(userEmail: string, key: string) {
    let url = `${this.baseUrl}api/auth/emailconfirm?userEmail=${userEmail}&confirmKey=${key}`
    return this.http.get<ResponseModel>(url);
  }
}

export interface LoginModel {
  email: string;
  password: string;
}
export interface RegisterModel {
  username: string;
  email: string;
  password: string;
  rePassword: string;
}
export interface ResponseModel {
  message: string;
  success: boolean;
}
export interface ResponseSingleModel<T> extends ResponseModel {
  data: T
}
export interface ResponseListModel<T> extends ResponseModel {
  data: T[]
}
export interface TokenModel {
  token: string;
  expiration: string;
}
export interface Usermodel {
  username: string;
  email: string;
  id: number;
}
export interface LoginResponseModel extends ResponseModel {
  data: LoginDataModel
}
export interface LoginDataModel {
  accessToken: TokenModel;
  user: Usermodel;
}
