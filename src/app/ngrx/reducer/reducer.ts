/**
 * Created by veghe on 23/04/2017.
 */

import * as _ from 'lodash';
import {ApplicationState} from "../store/application-state";
import {Action} from "@ngrx/store";

export const UPDATE_QUERY: string = 'updateQuery';
export const UPDATE_DATE: string = 'updateDate';
export const UPDATE_FILTER: string = 'updateFilter';
export const UPDATE_ID: string = 'updateId';


export function transactionFilterReducer(state: ApplicationState, action: Action) {
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

function handleQueryUpdate(state: ApplicationState, action: Action) {
  let newState = _.cloneDeep(state);
  newState.transactionFilters.query = action.payload;
  return newState;
}

function handleDateUpdate(state: ApplicationState, action: Action) {
  let newState = _.cloneDeep(state);
  newState.transactionFilters.date = action.payload;
  return newState;
}

function handleFilterByUpdate(state: ApplicationState, action: Action) {
  let newState = _.cloneDeep(state);
  newState.transactionFilters.filterBy = action.payload;
  return newState;
}

function handleIdUpdate(state: ApplicationState, action: Action) {
  let newState = _.cloneDeep(state);
  newState.transactionFilters.id = action.payload;
  return newState;
}
