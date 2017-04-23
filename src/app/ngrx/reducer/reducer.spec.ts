import {INITIAL_STATE} from "../store/application-state";
import * as _ from 'lodash';
import {model, transactionFilter} from "./reducer";
import {DateUpdate, FilterUpdate, IdUpdate, QueryUpdate} from "../action/transaction-filter.actions";
import {CreateAccount} from "../action/model.actions";
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

    let modifiedState = model(initState, new CreateAccount({identifier: 1, name: 'main', currency: 'GBP', balance: 100}));

    expect(initState).not.toEqual(modifiedState);

    expect(modifiedState.accounts[1].name).toBe('main');
    expect(modifiedState.accounts[2]).toBe(undefined);

  });

  it('modelUpdate/AccountCreate', () => {
    let initState = INITIAL_STATE.model;

    let modifiedState = model(initState, new CreateAccount({identifier: 1, name: 'main', currency: 'GBP', balance: 100}));

    expect(initState).not.toEqual(modifiedState);

    expect(modifiedState.accounts[1].name).toBe('main');
    expect(modifiedState.accounts[2]).toBe(undefined);

  });

});
