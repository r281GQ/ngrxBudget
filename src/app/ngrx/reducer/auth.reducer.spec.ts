import * as _ from 'lodash';
import {INITIAL_STATE} from "../store/application-state";
import {LoginStatus} from "../../repo/auth.service";
import {auth} from "./auth.reducer";
import {LOGIN_SUCCESS} from "../action/action.types";
import {LoginSuccess} from "../action/auth.action";

describe('authReducer', () => {

  let initSate;
  let loginStatus: LoginStatus;

  beforeEach(() => {
    initSate = _.cloneDeep(INITIAL_STATE.auth);
    loginStatus = {
      accepted: true,
      email: 'endre@mail.com',
      name: 'endre',
      token: 'token',
      identifier: 2
    };
  });

  it('loginSuccess', () => {

    let modifiedState = auth(initSate, new LoginSuccess(loginStatus));

    expect(modifiedState.token).toBe('token');

  });
});
