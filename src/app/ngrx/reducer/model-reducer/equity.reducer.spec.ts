import {Equity} from "../../../model/model";
import {INITIAL_STATE} from "../../store/application-state";
import {CreateEquity, UpdateEquity} from "../../action/model-actions/equity.actions";
import {model} from "../model.reducer";
import * as _ from 'lodash';

describe('modelReducers/equity', () => {

  let sampleEquity: Equity;
  let initState: any;

  beforeEach(() => {
    initState = _.cloneDeep(INITIAL_STATE.model);
    sampleEquity = {
      identifier: 1,
      name: 'loan',
      currency: 'GBP',
      balance: 100,
      type: 'liability',
      transactions: []
    };
  });

  it('create', () => {
    let modifiedState = model(initState, new CreateEquity(sampleEquity));

    expect(initState).not.toEqual(modifiedState);
    expect(modifiedState.equities[1].name).toBe('loan');
    expect(modifiedState.equities[1].identifier).toBe(1);
    expect(modifiedState.equities[1].currency).toBe('GBP');
    expect(modifiedState.equities[1].balance).toBe(100);
    expect(modifiedState.equities[2]).toBe(undefined);
  });

  it('update', () => {
    initState.equities[1] = {
      name: 'fees',
      identifier: 1,
      balance: 100,
      currency: 'GBP',
      type: 'liability',
      transactions: []
    };

    let modifiedState = model(initState, new UpdateEquity(sampleEquity));

    expect(initState).not.toEqual(modifiedState);
    expect(modifiedState.equities[1].name).toBe('loan');
    expect(modifiedState.equities[2]).toBe(undefined);
  });
})
