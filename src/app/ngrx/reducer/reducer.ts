/**
 * Created by veghe on 23/04/2017.
 */

import * as _ from 'lodash';
import {ApplicationState} from "../store/application-state";
import {Action} from "@ngrx/store";

export const UPDATEQUERY: string = 'updateQuery';

export function queryReducer(state: ApplicationState, action: Action) {
  switch (action.type) {
    case UPDATEQUERY:
      console.log('inside query reducer update query switch');
      let newState = _.cloneDeep(state);

      newState.transactionFilters.query = action.payload;

      return newState;
    default:
      return state;
  }
}
