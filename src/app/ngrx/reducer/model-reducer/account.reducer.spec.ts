import {INITIAL_STATE} from "../../store/application-state";
import {model} from "../model.reducer";
import {CreateAccount, UpdateAccount} from "../../action/model-actions/account.actions";
import {Account} from "../../../model/model";
import * as _ from 'lodash';

describe('modelReducers/account', () => {
  let sampleAccount: Account;
  let initState: any;

  beforeEach(() => {
    initState = _.cloneDeep(INITIAL_STATE.model);
    sampleAccount = {
      identifier: 1,
      name: 'main',
      currency: 'GBP',
      balance: 100,
      transactions: []
    };
  });

  it('create', () => {
    let modifiedState = model(initState, new CreateAccount(sampleAccount));

    expect(initState).not.toEqual(modifiedState);
    expect(modifiedState.accounts[1].name).toBe('main');
    expect(modifiedState.accounts[1].identifier).toBe(1);
    expect(modifiedState.accounts[1].currency).toBe('GBP');
    expect(modifiedState.accounts[1].balance).toBe(100);
    expect(modifiedState.accounts[2]).toBe(undefined);
  });

  it('update', () => {
    initState.accounts[1] = {
      name: 'side',
      identifier: 1,
      balance: 100,
      currency: 'GBP',
      transactions: []
    };

    let modifiedState = model(initState, new UpdateAccount(sampleAccount));

    expect(initState).not.toEqual(modifiedState);
    expect(modifiedState.accounts[1].name).toBe('main');
    expect(modifiedState.accounts[2]).toBe(undefined);
  });
});
