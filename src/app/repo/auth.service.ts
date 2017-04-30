import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {AuthRequest} from "../ngrx/action/auth.action";
import {Observable} from "rxjs/Observable";

export interface LoginStatus {
  accepted: boolean,
  email: string,
  name: string,
  identifier: number,
  token: string
}

@Injectable()
export class AuthService {

  constructor(private http: Http) {
  }

  login(authRequest: AuthRequest): Observable<LoginStatus> {
    return null;
  }
}
