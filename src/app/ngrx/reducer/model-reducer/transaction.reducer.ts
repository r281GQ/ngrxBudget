import {Action} from "@ngrx/store";
import * as _ from 'lodash';

const handleTransactionCreation = (state, action: Action) => {
  let newState = _.cloneDeep(state);
  let transaction = _.cloneDeep(action.payload);

  newState.transactions[transaction.identifier] = transaction;
  newState.accounts[transaction.account].transactions.push(transaction.identifier);
  newState.groupings[transaction.grouping].transactions.push(transaction.identifier);

  if (!_.isUndefined(transaction.budget)) {
    newState.budgets[transaction.budget].transactions.push(transaction.identifier);
    newState.budgetPeriods[transaction.budgetPeriod].transactions.push(transaction.identifier);
  }

  if (!_.isUndefined(transaction.equity))
    newState.equities[transaction.equity].transactions.push(transaction.identifier);

  return newState;
}

export {handleTransactionCreation};
