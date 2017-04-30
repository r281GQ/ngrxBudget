import {Action} from "@ngrx/store";
import * as _ from 'lodash';

const handleAccountCreate = (state, action: Action) => {
  let newState = _.cloneDeep(state);
  newState.accounts[action.payload.identifier] = action.payload;
  return newState;
}

const handleAccountUpdate = (state, action: Action) => {
  let newState = _.cloneDeep(state);
  newState.accounts[action.payload.identifier].name = action.payload.name;
  return newState;
}

export {handleAccountUpdate, handleAccountCreate};
