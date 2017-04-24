/**
 * Created by veghe on 23/04/2017.
 */

import * as _ from 'lodash';
import {ApplicationState, INITIAL_STATE} from "../store/application-state";
import {Action} from "@ngrx/store";
import {handleUpdateAll} from "./model-reducer/misc-handler";

export const UPDATE_QUERY: string = 'updateQuery';
export const UPDATE_DATE: string = 'updateDate';
export const UPDATE_FILTER: string = 'updateFilter';
export const UPDATE_ID: string = 'updateId';

export const CREATE_ACCOUNT: string = 'createAccount';
export const UPDATE_ACCOUNT: string = 'updateAccount';
export const DELETE_ACCOUNT: string = 'deleteAccount';
export const GET_ACCOUNT: string = 'getAccount';
export const GET_ACCOUNTS_BY_USER: string = 'getAccountsByUser';

export const PERSIST_ACCOUNT: string = 'persistAccount';
export const REFRESH_ACCOUNT: string = 'refreshAccount';
export const REMOVE_ACCOUNT: string = 'removeAccount';
export const FETCH_ACCOUNT: string = 'fetchAccount';
export const FETCH_ACCOUNTS_BY_USER: string = 'fetchAccountsByUser';


export const FETCH_EQUITY: string = 'fetchEquity';
export const FETCH_EQUITIES_BY_USER: string = 'fetchEquitiesByUser';


export const CREATE_TRANSACTION: string = 'createTransaction';
export const REMOVE_TRANSACTION: string = 'removeTransaction';


export const PERSIST_TRANSACTION: string = 'persistTransaction';

export const FETCH_GROUPING: string = 'fetchGrouping';

export const UPDATE_GROUPING: string = 'updateGrouping';

export const FETCH_ALL: string = 'fetchAll';
export const UPDATE_ALL: string = 'updateAll';


/**
 * Main reducer function aggregating the state.
 *
 * @param state
 * @param action
 * @returns {ApplicationState}
 */
export function reducer(state: ApplicationState = INITIAL_STATE, action: Action) {
  return {
    auth: state.auth,
    transactionFilter: transactionFilter(state.transactionFilter, action),
    model: model(state.model, action),
  }
}

export function transactionFilter(state, action: Action) {
  switch (action.type) {
    case UPDATE_QUERY:
      return handleQueryUpdate(state, action);
    case UPDATE_DATE:
      return handleDateUpdate(state, action);
    case UPDATE_FILTER:
      return handleFilterByUpdate(state, action);
    case UPDATE_ID:
      return handleIdUpdate(state, action);
    default:
      return state;
  }
}

export function auth(state = INITIAL_STATE, action) {
  return state;
}

function handleAccountDelete(state: any, action: Action) {
  let newState = _.cloneDeep(state);
  delete newState.accounts[action.payload];
  return newState;
}


function handleTransactionRemove(state: any, action: Action) {
  let newState = _.cloneDeep(state);
  let identifier = action.payload;

  let transaction = _.cloneDeep(newState.transactions[identifier]);

  let newArray = _.filter(newState.accounts[transaction.account].transactions, identifier);

  newState.accounts[transaction.account].transactions = newArray;

  // _.remove(newState.accounts[transaction.account].transactions, identifier);

  delete newState.transactions[identifier];

  return newState;
}
/**
 * Responsible for maintaining the model part of the application state.
 *
 * @param state
 * @param action
 * @returns {ApplicationState.model}
 */
export function model(state, action: Action) {
  switch (action.type) {
    case CREATE_ACCOUNT:
      return handleAccountCreate(state, action);
    case UPDATE_ACCOUNT:
      return handleAccountUpdate(state, action);
    case DELETE_ACCOUNT:
      return handleAccountDelete(state, action);
    case CREATE_TRANSACTION:
      return handleTransactionCreation(state, action);
    case UPDATE_ALL:
      return handleUpdateAll(state, action);
    case REMOVE_TRANSACTION:
      return handleTransactionRemove(state, action);
    default:
      return state;
  }
}

function handleTransactionCreation(state, action: Action) {
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

function handleAccountCreate(state, action: Action) {
  let newState = _.cloneDeep(state);
  newState.accounts[action.payload.identifier] = action.payload;
  return newState;
}

function handleAccountUpdate(state, action: Action) {
  let newState = _.cloneDeep(state);
  newState.accounts[action.payload.identifier].name = action.payload.name;
  return newState;
}

function handleQueryUpdate(state, action: Action) {
  let newState = _.cloneDeep(state);
  newState.query = action.payload;
  return newState;
}

function handleDateUpdate(state, action: Action) {
  let newState = _.cloneDeep(state);
  newState.date = action.payload;
  return newState;
}

function handleFilterByUpdate(state, action: Action) {
  let newState = _.cloneDeep(state);
  newState.filterBy = action.payload;
  return newState;
}

function handleIdUpdate(state, action: Action) {
  let newState = _.cloneDeep(state);
  newState.id = action.payload;
  return newState;
}
