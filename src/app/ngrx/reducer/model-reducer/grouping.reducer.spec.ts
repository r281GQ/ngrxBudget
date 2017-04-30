import {Grouping} from "../../../model/model";
import * as _ from 'lodash';
import {INITIAL_STATE} from "../../store/application-state";
import {model} from "../model.reducer";
import {CreateGrouping, UpdateGrouping} from "../../action/model-actions/grouping.actions";

describe('modelReducers/grouping', () => {

  let initState;
  let sampleGrouping: Grouping;

  beforeEach(() => {
    initState = _.cloneDeep(INITIAL_STATE.model);
    sampleGrouping = {
      name: 'salary',
      transactions : [],
      type: 'income',
      identifier: 2
    };
  });

  it('create', () => {
    let modifiedState = model(initState, new CreateGrouping(sampleGrouping));

    expect(modifiedState.groupings[2].name).toBe('salary');
    expect(modifiedState.groupings[2].identifier).toBe(2);
  });

  it('update', () => {
    initState.groupings[2] = {
      name: 'differentName',
      transactions : [],
      type: 'income',
      identifier: 2
    };

    let modifiedState = model(initState, new UpdateGrouping(sampleGrouping));

    expect(modifiedState.groupings[2].name).toBe('salary');
    expect(modifiedState.groupings[2].identifier).toBe(2);
  });
});
