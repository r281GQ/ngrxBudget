import {Action} from "@ngrx/store";
import {LOGIN_SUCCESS, LOGOUT} from "../action/action.types";
import * as _ from 'lodash';
import {LoginStatus} from "../../repo/auth.service";

const auth = (state: any, action: Action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return handleLoginSuccess(state, action);
    case LOGOUT:
      return handleLogout(state, action);
    default:
      return state;
  }
}

const handleLoginSuccess = (state: any, action: Action) => {
  let newState = _.cloneDeep(state);

  let status: LoginStatus = _.cloneDeep(action.payload);

  newState.user.name = status.name;
  newState.user.email = status.email;
  newState.user.identifier = status.identifier;
  newState.token = status.token;
  newState.authenticated = true;

  localStorage.setItem('token', newState.token);

  return newState;
}

const handleLogout = (state, action) => {

  let newState = _.cloneDeep(state);

  newState.user = {
    identifier: undefined,
    email: undefined,
    name: undefined
  };

  newState.authenticated = false;
  newState.token = undefined;

  localStorage.removeItem('token');
};

export {auth};
