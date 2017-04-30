import {INITIAL_STATE} from "../store/application-state";
import {DateUpdate, FilterUpdate, IdUpdate, QueryUpdate} from "../action/transaction-filter.actions";
import {transactionFilter} from "./transaction-filter-reducer";
import * as _ from 'lodash';

describe('transactionFilterReducers', () => {

  const queryToBePassed: string = 'salary';
  const dateToBePassed: string = '03-2017';
  const filterByToBePassed: string = 'account';
  const idToBePassed: number = 1;

  let initState;

  beforeEach(() => {
    initState = _.cloneDeep(INITIAL_STATE.transactionFilter);
  });

  it('queryUpdate', () => {
    let modifiedState = transactionFilter(initState, new QueryUpdate(queryToBePassed));

    expect(initState.query).toBe('');
    expect(initState).toEqual(INITIAL_STATE.transactionFilter);
    expect(initState).not.toEqual(modifiedState);
    expect(modifiedState.query).toBe(queryToBePassed);
  });

  it('dateUpdate', () => {
    let modifiedState = transactionFilter(initState, new DateUpdate(dateToBePassed));

    expect(initState.date).toBe('');
    expect(initState).toEqual(INITIAL_STATE.transactionFilter);
    expect(initState).not.toEqual(modifiedState);
    expect(modifiedState.date).toBe(dateToBePassed);
  });

  it('filterByUpdate', () => {
    let modifiedState = transactionFilter(initState, new FilterUpdate(filterByToBePassed));

    expect(initState.filterBy).toBe('');
    expect(initState).toEqual(INITIAL_STATE.transactionFilter);
    expect(initState).not.toEqual(modifiedState);
    expect(modifiedState.filterBy).toBe(filterByToBePassed);
  });

  it('idUpdate', () => {
    let modifiedState = transactionFilter(initState, new IdUpdate(idToBePassed));

    expect(initState.id).toBe(0);
    expect(initState).toEqual(INITIAL_STATE.transactionFilter);
    expect(initState).not.toEqual(modifiedState);
    expect(modifiedState.id).toBe(idToBePassed);
  });
});
