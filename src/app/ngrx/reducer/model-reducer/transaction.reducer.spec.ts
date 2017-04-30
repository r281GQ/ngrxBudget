import {INITIAL_STATE} from "../../store/application-state";
import {model} from "../model.reducer";
import {CreateTransaction} from "../../action/model-actions/transaction.actions";
import {Transaction} from "../../../model/model";
import * as _ from 'lodash';

describe('modelReducers/transaction', () => {

  let sampleTransaction: Transaction;
  let initState: any;

  beforeEach(() => {
      initState = _.cloneDeep(INITIAL_STATE.model);
      sampleTransaction = {
        name: 'salary',
        currency: 'GBP',
        period: '03-2017',
        identifier: 1,
        account: 4,
        grouping: 3,
        amount: 55,
        creationDate: '12-03-2017',
        memo: ''
      };
    }
  );

  it('create', () => {

    initState.accounts[4] = {
      name: 'main',
      identifier: 4,
      balance: 100,
      currency: 'GBP',
      transactions: []
    };

    initState.groupings[3] = {
      name: 'main',
      identifier: 3,
      type: 'Expense',
      transactions: []
    };

    let modifiedState = model(initState, new CreateTransaction(sampleTransaction));

    expect(modifiedState.transactions[1].name).toBe('salary');
    expect(_.includes(modifiedState.accounts[4].transactions, 1)).toBeTruthy();
    expect(_.includes(modifiedState.groupings[3].transactions, 1)).toBeTruthy();
  });
});
