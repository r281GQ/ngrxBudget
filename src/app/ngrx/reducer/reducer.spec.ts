import {INITIAL_STATE} from "../store/application-state";
import * as _ from 'lodash';
import {model, transactionFilter} from "./reducer";
import {DateUpdate, FilterUpdate, IdUpdate, QueryUpdate} from "../action/transaction-filter.actions";
import {CreateAccount, DeleteAccount, UpdateAccount} from "../action/model-actions/account.actions";
import {CreateTransaction} from "../action/model-actions/transaction.actions";
/**
 * Created by veghe on 23/04/2017.
 */

describe('reducer', () => {
  it('queryUpdate', () => {

    const queryToBePassed: string = 'salary';

    let initState = INITIAL_STATE.transactionFilter;

    expect(initState.query).toBe('');

    let modifiedState = transactionFilter(initState, new QueryUpdate(queryToBePassed));

    expect(initState.query).toBe('');

    expect(initState).toEqual(INITIAL_STATE.transactionFilter);

    expect(initState).not.toEqual(modifiedState);

    expect(modifiedState.query).toBe(queryToBePassed);

  });

  it('dateUpdate', () => {

    const dateToBePassed: string = '03-2017';

    let initState = INITIAL_STATE.transactionFilter;

    expect(initState.date).toBe('');

    let modifiedState = transactionFilter(initState, new DateUpdate(dateToBePassed));

    expect(initState.date).toBe('');

    expect(initState).toEqual(INITIAL_STATE.transactionFilter);

    expect(initState).not.toEqual(modifiedState);

    expect(modifiedState.date).toBe(dateToBePassed);

  });

  it('filterByUpdate', () => {

    const filterByToBePassed: string = 'account';

    let initState = INITIAL_STATE.transactionFilter;

    expect(initState.filterBy).toBe('');

    let modifiedState = transactionFilter(initState, new FilterUpdate(filterByToBePassed));

    expect(initState.filterBy).toBe('');

    expect(initState).toEqual(INITIAL_STATE.transactionFilter);

    expect(initState).not.toEqual(modifiedState);

    expect(modifiedState.filterBy).toBe(filterByToBePassed);

  });

  it('idUpdate', () => {

    const idToBePassed: number = 1;

    let initState = INITIAL_STATE.transactionFilter;

    expect(initState.id).toBe(0);

    let modifiedState = transactionFilter(initState, new IdUpdate(idToBePassed));

    expect(initState.id).toBe(0);

    expect(initState).toEqual(INITIAL_STATE.transactionFilter);

    expect(initState).not.toEqual(modifiedState);

    expect(modifiedState.id).toBe(idToBePassed);

  });


  it('modelUpdate/AccountCreate', () => {
    let initState = INITIAL_STATE.model;

    let modifiedState = model(initState, new CreateAccount({
      identifier: 1,
      name: 'main',
      currency: 'GBP',
      balance: 100,
      transactions : []
    }));

    expect(initState).not.toEqual(modifiedState);

    expect(modifiedState.accounts[1].name).toBe('main');
    expect(modifiedState.accounts[2]).toBe(undefined);

  });

  it('modelUpdate/AccountUpdate', () => {
    let initState = INITIAL_STATE.model;

    initState.accounts[1] = {
      name: 'side',
      identifier: 1,
      balance: 100,
      currency: 'GBP',
      transactions: [1, 4]
    };

    let modifiedState = model(initState, new UpdateAccount({identifier: 1, name: 'main'}));

    expect(initState).not.toEqual(modifiedState);

    expect(modifiedState.accounts[1].name).toBe('main');
    expect(modifiedState.accounts[2]).toBe(undefined);

  });

  it('modelUpdate/DeleteUpdate', () => {
    let initState = INITIAL_STATE.model;

    initState.accounts[1] = {
      name: 'main',
      identifier: 1,
      balance: 100,
      currency: 'GBP',
      transactions: [1, 4]
    };

    // expect(modifiedState.accounts[1]).toBe(undefined);

    let modifiedState = model(initState, new DeleteAccount(1));

    // expect(initState).not.toEqual(modifiedState);

    // expect(modifiedState.accounts[1].name).toBe('main');
    expect(modifiedState.accounts[1]).toBe(undefined);

  });

  it('modelUpdate/CreateTransaction', () => {
    let initState = INITIAL_STATE.model;

    initState.accounts[4] = {
      name: 'main',
      identifier: 4,
      balance: 100,
      currency: 'GBP',
      transactions: []
    };
    console.log(initState.accounts[4].transactions);


    // expect(modifiedState.accounts[1]).toBe(undefined);

    let modifiedState = model(initState, new CreateTransaction({
      name: 'salary',
      currency: 'GBP',
      period: '03-2017',
      identifier: 1,
      account: 4,
      grouping: 4,
      amount: 55,
      creationDate: '12-03-2017',
      memo: ''
    }));

    // expect(initState).not.toEqual(modifiedState);

    // expect(modifiedState.accounts[1].name).toBe('main');
    expect(modifiedState.transactions[1].name).toBe('salary');

    console.log(modifiedState.accounts[4].transactions);

    // _.result(modifiedState.accounts[4].transactions, (id)=> id ===1);
    let result = _.find(modifiedState.accounts[4].transactions, (element) => element === 1);
    expect(result).toBe(1);

  });

});
