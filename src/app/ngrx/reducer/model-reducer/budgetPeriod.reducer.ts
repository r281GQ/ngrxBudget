import {Action} from "@ngrx/store";
import * as _ from 'lodash';

const handleBudgetPeriodCreate = (state, action: Action) => {
  let newState = _.cloneDeep(state);
  let budgetPeriod = _.cloneDeep(action.payload);
  newState.budgetPeriods[action.payload.identifier] = budgetPeriod;
  return newState;
}

const handleBudgetPeriodUpdate = (state, action: Action) => {
  let newState = _.cloneDeep(state);
  let budgetPeriod = _.cloneDeep(action.payload);
  newState.budgetPeriods[action.payload.identifier] = budgetPeriod;
  return newState;
}

export {handleBudgetPeriodCreate, handleBudgetPeriodUpdate};
