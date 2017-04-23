/**
 * Created by veghe on 23/04/2017.
 */

import * as _ from 'lodash';
import {ApplicationState, INITIAL_STATE} from "../store/application-state";
import {Action} from "@ngrx/store";
import {init} from "protractor/built/launcher";

export const UPDATE_QUERY: string = 'updateQuery';
export const UPDATE_DATE: string = 'updateDate';
export const UPDATE_FILTER: string = 'updateFilter';
export const UPDATE_ID: string = 'updateId';

export const CREATE_ACCOUNT: string = 'createAccount';
export const UPDATE_ACCOUNT: string = 'updateAccount';


export function reducer (state: ApplicationState = INITIAL_STATE, action: Action) {
  return {
    user: state.user,
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

export function user(state = INITIAL_STATE, action){
  return state;
}

export function model(state, action: Action) {
  switch (action.type) {
    case CREATE_ACCOUNT || UPDATE_ACCOUNT:
      let newState = _.cloneDeep(state);
      newState.accounts[action.payload.identifier] = action.payload;
      return newState;
    default:
      return state;
  }
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
