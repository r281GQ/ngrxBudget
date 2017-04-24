import {Action} from "@ngrx/store";
import {forEach, cloneDeep, isUndefined} from 'lodash';


/**
 Recreates the whole data state in the store.
 Used only in the initial fetch, removals and in transaction updates where due to the inter dependency between models makes it
 easier to fetch the whole database to the store again.
 */
export function handleUpdateAll(state: any, action: Action) {

  let newState = resetValues(state);

  forEach(action.payload.accounts, (account) => {
    newState.accounts[account.identifier] = account;
  });

  forEach(action.payload.equities, equity => {
    newState.equities[equity.identifier] = equity;
  });

  forEach(action.payload.budgets, budget => {
    newState.budgets[budget.identifier] = budget;
  });

  forEach(action.payload.budgetPeriods, budgetPeriod => {
    newState.budgetPeriods[budgetPeriod.identifier] = budgetPeriod;
    newState.budgets[budgetPeriod.budget].budgetPeriods.push(budgetPeriod.identifier);
  });

  forEach(action.payload.groupings, (grouping) => {
    newState.groupings[grouping.identifier] = grouping;
  });

  forEach(action.payload.transactions, (transaction) => {
    newState.transactions[transaction.identifier] = transaction;

    newState.accounts[transaction.account].transactions.push(transaction.identifier);

    if (!isUndefined(transaction.budget)) {
      newState.budgets[transaction.budget].transactions.push(transaction.identifier);
      newState.budgetPeriods[transaction.budgetPeriod].transactions.push(transaction.identifier);
    }

    if (!isUndefined(transaction.equity))
      newState.equities[transaction.equity].transactions.push(transaction.identifier);

    newState.groupings[transaction.grouping].transactions.push(transaction.identifier);
  });

  return newState;
}

const resetValues = (defaultState) => {

  let newState = cloneDeep(defaultState);

  newState.accounts = {};
  newState.groupings = {};
  newState.transactions = {};
  newState.equities = {};
  newState.budget = {};
  newState.budgetPeriods = {};

  return newState
};
