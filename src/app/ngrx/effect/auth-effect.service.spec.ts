import {TestBed, inject} from '@angular/core/testing';

import {AuthEffectService} from './auth-effect.service';
import {EffectsRunner, EffectsTestingModule} from "@ngrx/effects/testing";
import {AuthRequest, LoginAttempt} from "../action/auth.action";
import {FETCH_ALL, LOGIN_FAILED, LOGIN_SUCCESS} from "../action/action.types";
import {AuthService, LoginStatus} from "../../repo/auth.service";
import 'rxjs/add/observable/throw';
import {Observable} from "rxjs/Observable";
import {Action} from "@ngrx/store";

class AuthMock {
  login(authRequest: AuthRequest): Observable<LoginStatus> {
    return null;
  }
}

const asyncWrapper = (callback) => {
  setTimeout(callback, 100);
}

describe('AuthEffectService', () => {

  let runner;
  let authEffectService;
  let authMock;

  const email: string = '';
  const password: string = '';

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      AuthEffectService,
      {provide: AuthService, useClass: AuthMock}
    ]
  }));

  beforeEach(inject([
      EffectsRunner, AuthEffectService, AuthService
    ],
    (_runner, _authEffectService, _authMock) => {
      runner = _runner;
      authEffectService = _authEffectService;
      authMock = _authMock
    }
  ));

  it('loginAttempt => loginSuccess', done => {
    let loginFunction = spyOn(authMock, 'login').and.returnValue(Observable.of({
      accepted: true,
      email: 'endre@mail.com',
      name: 'endre',
      identifier: 3,
      token: 'randomJWTToken'
    }));

    let container: Action [] = [];

    runner.queue(new LoginAttempt({email: email, password: password}));

    // authEffectService.loginAttempt$.subscribe(effect => {
    //   expect(effect.payload.email).toBe('endre@mail.com');
    //   expect(effect.type).toBe(LOGIN_SUCCESS);
    //   done();
    // });

    authEffectService.loginAttempt$.subscribe(effect => {
      container.push(effect);
    });
    asyncWrapper(()=>{
      expect(container[0].payload.email).toBe('endre@mail.com');
      expect(container[0].type).toBe(LOGIN_SUCCESS);
      expect(container[1].type).toBe(FETCH_ALL);
      done();
    });
  });

  it('loginAttempt => loginFailed', done => {
    let loginFunction = spyOn(authMock, 'login').and.returnValue(Observable.of({
      accepted: false,
      email: undefined,
      name: undefined,
      identifier: undefined,
      token: undefined
    }));

    let container: Action [] = [];

    runner.queue(new LoginAttempt({email: email, password: password}));

    authEffectService.loginAttempt$.subscribe(effect => {
      container.push(effect);
    });

    asyncWrapper(()=>{
      expect(container[0].type).toBe(LOGIN_FAILED);
      done();
    });
  });
});
