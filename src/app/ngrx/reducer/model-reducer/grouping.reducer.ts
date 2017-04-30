import {Action} from "@ngrx/store";
import * as _ from 'lodash';

const handleGroupingUpdate = (state: any, action: Action) => {
  let newState = _.cloneDeep(state);
  let groupingToUpdate = action.payload;
  newState.groupings[groupingToUpdate.identifier].name = groupingToUpdate.name;
  return newState;
}
const handleGroupingCreate = (state: any, action: Action) => {
  let newState = _.cloneDeep(state);
  let groupingToUpdate = action.payload;
  newState.groupings[groupingToUpdate.identifier] = groupingToUpdate;
  return newState;
}

export {handleGroupingCreate, handleGroupingUpdate};
