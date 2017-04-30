import {RawDataBase} from "../../../repo/repo.service";
import {INITIAL_STATE} from "../../store/application-state";
import {model} from "../model.reducer";
import {UpdateAll} from "../../action/model-actions/misc.actions";
import * as _ from 'lodash';

describe('modelReducers/misc', () => {

  let exampleDataBase: RawDataBase;
  let initState;

  beforeEach(() => {
    initState = _.cloneDeep(INITIAL_STATE.model);

    exampleDataBase = {
      transactions: [{
        grouping: 2,
        name: 'income',
        account: 66,
        memo: '',
        creationDate: '',
        amount: 50,
        period: '',
        currency: '',
        identifier: 42
      }],
      accounts: [{transactions: [], currency: '', name: 'main', balance: 50, identifier: 66}],
      budgetPeriods: [],
      budgets: [],
      equities: [],
      groupings: [{transactions: [], type: 'Income', name: 'salary', identifier: 2}]
    }
  });

  it('should recreate the whole model state', () => {
    initState.groupings[89] = {transactions: [], type: 'Income', name: 'Spending money', identifier: 69};

    let modifiedState = model(initState, new UpdateAll(exampleDataBase));

    expect(modifiedState.groupings[2].type).toBe('Income');
    expect(modifiedState.groupings[89]).not.toBeDefined();
    expect(modifiedState.groupings[2].transactions).toContain(42);
    expect(modifiedState.transactions[42].amount).toBe(50);
    expect(modifiedState.accounts[66].transactions).toContain(42);
  });
});
