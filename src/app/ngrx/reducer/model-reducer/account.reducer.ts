import {Action} from "@ngrx/store";
import * as _ from 'lodash';

const handleAccountCreate = (state, action: Action) => {
  let newState = _.cloneDeep(state);
  let account = _.cloneDeep(action.payload);
  newState.accounts[action.payload.identifier] = account;
  return newState;
}

const handleAccountUpdate = (state, action: Action) => {
  let newState = _.cloneDeep(state);
  let account = _.cloneDeep(action.payload);
  newState.accounts[action.payload.identifier].name = account.name;
  return newState;
}

export {handleAccountUpdate, handleAccountCreate};
