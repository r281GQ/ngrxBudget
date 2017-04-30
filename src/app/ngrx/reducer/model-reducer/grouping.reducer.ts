import {Action} from "@ngrx/store";
import * as _ from 'lodash';

const handleGroupingCreate = (state: any, action: Action) => {
  let newState = _.cloneDeep(state);
  let grouping = action.payload;
  newState.groupings[grouping.identifier] = grouping;
  return newState;
}

const handleGroupingUpdate = (state: any, action: Action) => {
  let newState = _.cloneDeep(state);
  let grouping = _.cloneDeep(action.payload);
  newState.groupings[grouping.identifier] = grouping;
  return newState;
}

export {handleGroupingCreate, handleGroupingUpdate};
