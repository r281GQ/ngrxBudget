import {Action} from "@ngrx/store";
import {LOGIN_ATTEMPT, LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT} from "./action.types";
import {LoginStatus} from "../../repo/auth.service";

export interface AuthRequest {
  email: string,
  password: string
}

export class LoginAttempt implements Action{
  readonly type: string = LOGIN_ATTEMPT;
  payload: AuthRequest;

  constructor(payload: AuthRequest){
    this.payload = payload;
  }
}

export class LoginSuccess implements Action{
  readonly type: string = LOGIN_SUCCESS;
  payload: LoginStatus;

  constructor(payload: LoginStatus){
    this.payload = payload;
  }
}

export class LoginFailed implements Action{
  readonly type: string = LOGIN_FAILED;
}

export class Logout implements Action{
  readonly type: string = LOGOUT;
}
