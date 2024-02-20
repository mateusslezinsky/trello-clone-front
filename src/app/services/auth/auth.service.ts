import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {RegisterDTO} from "../../models/auth/register/registerDTO";
import {ResponseDTO} from "../../models/auth/ResponseDTO";
import {BehaviorSubject, catchError, Subject, tap, throwError} from "rxjs";
import {LoginDTO} from "../../models/auth/login/LoginDTO";
import {User} from "../../models/user/user.model";
import {jwtDecode} from "jwt-decode";
import {AccessTokenPayload} from "../../models/token/accessToken";
import {Router} from "@angular/router";
import {BaseService} from "../base/base.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService{
  user = new BehaviorSubject<User|null>(null);

  private tokenExpirationTimer: number | null = null;

  constructor(private http: HttpClient, private router: Router) {
    super();
  }

  decodedJWT(token: string): AccessTokenPayload | null {
    try {
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  }

  signUp(registerMetadata: RegisterDTO) {
    return this.http.post<ResponseDTO>(
      this.baseUrl + "/auth/register",
      JSON.stringify(
        registerMetadata
      ),
      {headers: this.headers}
    ).pipe(
      catchError(this.handleError),
      tap(this.handleResponse.bind(this))
    );
  }

  autoLogin(){
    const userData: {
      name: string,
      email: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem("userData")!);
    if(!userData) return;
    const user = new User(userData.name, userData.email, userData._token, new Date(userData._tokenExpirationDate));
    if(user.token){
      this.user.next(user);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration)
    }
  }

  login(loginMetadata: LoginDTO) {
    return this.http.post<ResponseDTO>(
      this.baseUrl + "/auth/login",
      JSON.stringify(loginMetadata),
      {headers: this.headers}
    ).pipe(
      catchError(this.handleError),
      tap(this.handleResponse.bind(this))
    );
  }

  autoLogout(expirationDuration: number){
    console.log(typeof expirationDuration, expirationDuration)
    this.tokenExpirationTimer = setTimeout(()=>{
      this.logout();
    }, expirationDuration)
  }

  logout(){
    this.user.next(null);
    localStorage.removeItem("userData");
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.router.navigate(["/"])
  }

  private handleResponse(response: ResponseDTO) {
    const decodedToken = this.decodedJWT(response.token);
    const date = new Date();
    const milliseconds = date.getTime();
    if (decodedToken) {
      const user = new User(decodedToken?.name, decodedToken?.sub, response.token, new Date(decodedToken?.exp * 1000));
      this.user.next(user);
      const expDate = +user.tokenExpirationDate.getTime() - milliseconds
      this.autoLogout(expDate);
      localStorage.setItem("userData", JSON.stringify(user));
    }
  }
}
