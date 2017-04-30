import {Action} from "@ngrx/store";
import * as _ from 'lodash';
import {
  UPDATE_DATE,
  UPDATE_FILTER, UPDATE_QUERY, UPDATE_ID
} from "../action/action.types";

const transactionFilter = (state, action: Action) => {
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

const handleQueryUpdate = (state, action: Action) => {
  let newState = _.cloneDeep(state);
  newState.query = action.payload;
  return newState;
}

const handleDateUpdate = (state, action: Action) => {
  let newState = _.cloneDeep(state);
  newState.date = action.payload;
  return newState;
}

const handleFilterByUpdate = (state, action: Action) => {
  let newState = _.cloneDeep(state);
  newState.filterBy = action.payload;
  return newState;
}

const handleIdUpdate = (state, action: Action) => {
  let newState = _.cloneDeep(state);
  newState.id = action.payload;
  return newState;
}

export {transactionFilter};
