import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {throwError} from "rxjs";

export class BaseService {
  private readonly _baseUrl = "http://localhost:8080";

  private _headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })

  get baseUrl(): string {
    return this._baseUrl;
  }

  get headers(): HttpHeaders {
    return this._headers;
  }

  public handleError(error: HttpErrorResponse) {
    return throwError(() => error.error);
  }

  constructor() { }
}
