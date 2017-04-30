import {Action} from "@ngrx/store";
import * as _ from 'lodash';

const handleEquityCreate = (state, action: Action) => {
  let newState = _.cloneDeep(state);
  let equity = _.cloneDeep(action.payload);
  newState.equities[action.payload.identifier] = equity;
  return newState;
}

const handleEquityUpdate = (state, action: Action) => {
  let newState = _.cloneDeep(state);
  let equity = _.cloneDeep(action.payload);
  newState.equities[action.payload.identifier].name = equity.name;
  return newState;
}

export {handleEquityCreate, handleEquityUpdate};

