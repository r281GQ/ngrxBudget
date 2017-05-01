import {Action} from "@ngrx/store";
import * as _ from 'lodash';

const handleBudgetCreate = (state, action: Action) => {
  let newState = _.cloneDeep(state);
  let budget = _.cloneDeep(action.payload);
  newState.budgets[action.payload.identifier] = budget;
  return newState;
}

const handleBudgetUpdate = (state, action: Action) => {
  let newState = _.cloneDeep(state);
  let budget = _.cloneDeep(action.payload);
  newState.budgets[action.payload.identifier] = budget;
  return newState;
}

export {handleBudgetCreate, handleBudgetUpdate};
