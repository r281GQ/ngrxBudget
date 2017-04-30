import {Action} from "@ngrx/store";
import * as _ from 'lodash';

const handleTransactionCreation = (state, action: Action) => {
  let newState = _.cloneDeep(state);

  newState.transactions[action.payload.identifier] = action.payload;
  newState.accounts[action.payload.account].transactions.push(action.payload.identifier);
  newState.groupings[action.payload.grouping].transactions.push(action.payload.identifier);

  if (!_.isUndefined(action.payload.budget)) {
    newState.budgets[action.payload.budget].transactions.push(action.payload.identifier);
    newState.budgetPeriods[action.payload.budgetPeriod].transactions.push(action.payload.identifier);
  }

  if (!_.isUndefined(action.payload.equity))
    newState.equities[action.payload.equity].transactions.push(action.payload.identifier);

  return newState;
}

export {handleTransactionCreation};
