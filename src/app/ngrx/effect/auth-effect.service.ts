import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {LOGIN_ATTEMPT, LOGOUT, LOGOUT_ATTEMPT} from "../action/action.types";
import {AuthService, LoginStatus} from "../../repo/auth.service";
import {LoginFailed, LoginSuccess, Logout} from "../action/auth.action";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/first";
import "rxjs/add/operator/publishLast";
import {Observable} from "rxjs/Observable";
import {FetchAll, Wipe} from "../action/model-actions/misc.actions";
import {Reset} from "../action/transaction-filter.actions";

const combineSuccessAndFetch = (loginStatus: LoginStatus) => {
  if (!loginStatus.accepted)
    return Observable.of(new LoginFailed());
  else
    return Observable.from([new LoginSuccess(loginStatus), new FetchAll()]);
}

const clearState = () => Observable.from([new Wipe(), new Reset(), new Logout()])

@Injectable()
export class AuthEffectService {

  constructor(private authService: AuthService, private actions: Actions) {
  }

  @Effect()
  loginAttempt$ = this.actions
    .ofType(LOGIN_ATTEMPT)
    .switchMap(action => this.authService.login(action.payload))
    .mergeMap(combineSuccessAndFetch);

  @Effect()
  logout$ = this.actions
    .ofType(LOGOUT_ATTEMPT)
    .mergeMap(clearState);
}
