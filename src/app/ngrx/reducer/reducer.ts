/**
 * Created by veghe on 23/04/2017.
 */

import * as _ from 'lodash';
import {ApplicationState, INITIAL_STATE} from "../store/application-state";
import {Action} from "@ngrx/store";

export const UPDATE_QUERY: string = 'updateQuery';
export const UPDATE_DATE: string = 'updateDate';
export const UPDATE_FILTER: string = 'updateFilter';
export const UPDATE_ID: string = 'updateId';

export const CREATE_ACCOUNT: string = 'createAccount';
export const UPDATE_ACCOUNT: string = 'updateAccount';
export const DELETE_ACCOUNT: string = 'deleteAccount';

export const CREATE_TRANSACTION: string = 'createTransaction';

export const GROUPING_FETCH: string = 'groupingFetch';

export const UPDATE_GROUPING: string = 'updateGrouping';

export const PERSIST_TRANSACTION: string = 'persistTransaction';

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
    default:
      return state;
  }
}

function handleTransactionCreation(state, action: Action) {
  let newState = _.cloneDeep(state);
  console.log('inside tra crea');
  newState.transactions[action.payload.identifier] = action.payload;
  newState.accounts[action.payload.account].transactions.push(action.payload.identifier);
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
  console.log('inside tra query');
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
  console.log('inside tra filter');
  let newState = _.cloneDeep(state);
  newState.filterBy = action.payload;
  return newState;
}

function handleIdUpdate(state, action: Action) {
  let newState = _.cloneDeep(state);
  newState.id = action.payload;
  return newState;
}
