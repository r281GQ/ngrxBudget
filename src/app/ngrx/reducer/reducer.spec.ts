import {INITIAL_STATE} from "../store/application-state";
import * as _ from 'lodash';
import {transactionFilterReducer} from "./reducer";
import {DateUpdate, FilterUpdate, QueryUpdate} from "../action/action";
/**
 * Created by veghe on 23/04/2017.
 */

describe('reducer', () => {
  it('queryUpdate', () => {

    const queryToBePassed: string = 'salary';

    let initState = INITIAL_STATE;

    expect(initState.transactionFilters.query).toBe(undefined);

    let modifiedState = transactionFilterReducer(initState, new QueryUpdate(queryToBePassed));

    expect(initState.transactionFilters.query).toBe(undefined);

    expect(initState).toEqual(INITIAL_STATE);

    expect(initState).not.toEqual(modifiedState);

    expect(modifiedState.transactionFilters.query).toBe(queryToBePassed);

  });

  it('dateUpdate', () => {

    const dateToBePassed: string = '03-2017';

    let initState = INITIAL_STATE;

    expect(initState.transactionFilters.date).toBe(undefined);

    let modifiedState = transactionFilterReducer(initState, new DateUpdate(dateToBePassed));

    expect(initState.transactionFilters.date).toBe(undefined);

    expect(initState).toEqual(INITIAL_STATE);

    expect(initState).not.toEqual(modifiedState);

    expect(modifiedState.transactionFilters.date).toBe(dateToBePassed);

  });

  it('filterByUpdate', () => {

    const filterByToBePassed: string = 'account';

    let initState = INITIAL_STATE;

    expect(initState.transactionFilters.filterBy).toBe(undefined);

    let modifiedState = transactionFilterReducer(initState, new FilterUpdate(filterByToBePassed));

    expect(initState.transactionFilters.filterBy).toBe(undefined);

    expect(initState).toEqual(INITIAL_STATE);

    expect(initState).not.toEqual(modifiedState);

    expect(modifiedState.transactionFilters.filterBy).toBe(filterByToBePassed);

  });

  it('idUpdate', () => {

    const filterByToBePassed: string = 'account';

    let initState = INITIAL_STATE;

    expect(initState.transactionFilters.filterBy).toBe(undefined);

    let modifiedState = transactionFilterReducer(initState, new FilterUpdate(filterByToBePassed));

    expect(initState.transactionFilters.filterBy).toBe(undefined);

    expect(initState).toEqual(INITIAL_STATE);

    expect(initState).not.toEqual(modifiedState);

    expect(modifiedState.transactionFilters.filterBy).toBe(filterByToBePassed);

  });
});
