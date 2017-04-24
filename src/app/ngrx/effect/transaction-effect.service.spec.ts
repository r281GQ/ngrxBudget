import {TestBed, inject} from '@angular/core/testing';

import {TransactionEffectService} from './transaction-effect.service';
import {EffectsRunner, EffectsTestingModule} from "@ngrx/effects/testing";
import {RepoService} from "../../repo/repo.service";
import {
  CREATE_TRANSACTION, FETCH_ACCOUNT, FETCH_GROUPING, PERSIST_TRANSACTION,
  UPDATE_GROUPING, FETCH_EQUITY, UPDATE_ACCOUNT, PERSIST_ACCOUNT, CREATE_ACCOUNT, REFRESH_ACCOUNT,
  FETCH_ACCOUNTS_BY_USER, GET_ACCOUNTS_BY_USER, FETCH_ALL, UPDATE_ALL, REMOVE_ACCOUNT
} from "../reducer/reducer";
import {Action} from "@ngrx/store";
import * as _ from 'lodash';
import {Grouping, Transaction, Account} from "../../model/model";
import {Observable} from "rxjs/Observable";
import {UpdateAll} from "../action/model-actions/misc.actions";

const sampleTransaction: Transaction = {
  name: 'salary',
  currency: 'GBP',
  period: '03-2017',
  identifier: undefined,
  account: 3,
  grouping: 4,
  amount: 55,
  creationDate: '12-03-2017',
  memo: ''
};
const sampleGrouping: Grouping = {identifier: undefined, type: 'Expense', name: 'Rent'};
const sampleAccount: Account = {identifier: undefined, currency: 'GBP', balance: 100, name: 'Main'};

class RepoMock {

  createTransaction(transaction: Transaction): Observable<Transaction> {
    return Observable.of(transaction);
  }

  fetchTransaction(identifier: number): Observable<Transaction> {
    let toReturn = _.cloneDeep(sampleTransaction);
    toReturn.identifier = identifier;
    return Observable.of(toReturn);
  }

  fetchGrouping(identifier: number): Observable<Grouping> {
    let toReturn = _.cloneDeep(sampleGrouping);
    toReturn.identifier = identifier;
    return Observable.of(toReturn);
  }

  fetchAccount(identifier: number): Observable<Account> {
    let toReturn = _.cloneDeep(sampleAccount);
    toReturn.identifier = identifier;
    return Observable.of(toReturn);
  }

  createAccount(account: Account): Observable<Account> {
    return Observable.of(account);
  }

  removeAccount(identifier: number): Observable<number> {
    return Observable.of(identifier);
  }

  updateAccount(account: Account): Observable<Account> {
    return Observable.of(account);
  }

  fetchAccountsByUser(): Observable<Account []> {
    return Observable.from([[]]);
  }

  fetchAll(): Observable<any> {
    return Observable.of({
      transactions: [sampleTransaction, _.cloneDeep(sampleTransaction)],
      accounts: []
    });
  }
}


describe('TransactionEffectService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      TransactionEffectService,
      {provide: RepoService, useClass: RepoMock},
    ]
  }));

  let runner: EffectsRunner;
  let transactionEffectService: TransactionEffectService;

  beforeEach(inject([
      EffectsRunner, TransactionEffectService
    ],
    (_runner, _transactionEffectService) => {
      runner = _runner;
      transactionEffectService = _transactionEffectService;
    }
  ));

  it('should fetch grouping from the backend and run UPDATE_GROUPING with the data provided as a payload', () => {
    runner.queue({type: FETCH_GROUPING});

    transactionEffectService.groupingFetch$.subscribe(effects => {
      expect(effects.type).toBe(UPDATE_GROUPING);
      expect(effects.payload.type).toBe('Expense');
      expect(effects.payload.name).toBe('Rent');
    });
  });


  it('should return two effect containing the expected payload after dispatching PERSIST_TRANSACTION without budgets and equities', () => {
    runner.queue({type: PERSIST_TRANSACTION, payload: _.cloneDeep(sampleTransaction)});

    let container: Action [] = [];

    transactionEffectService.persistTransaction$.subscribe(effect => {
      container.push(effect);
    });

    let first = _.find(container, (action) => action.type === CREATE_TRANSACTION);
    let second = _.find(container, (action) => action.type === FETCH_ACCOUNT);

    expect(_.size(container)).toBe(2);

    expect(first.type).toBe(CREATE_TRANSACTION);
    expect(first.payload.name).toBe(sampleTransaction.name);
    expect(first.payload.identifier).toBeDefined();
    expect(second.payload).toBe(3);
  });

  it('should return three effect containing the expected payload after dispatching PERSIST_TRANSACTION without budgets but with equity', () => {
    let modifiedTransaction = _.cloneDeep(sampleTransaction);

    modifiedTransaction.equity = 5;


    runner.queue({type: PERSIST_TRANSACTION, payload: modifiedTransaction});
    let container: Action [] = [];

    transactionEffectService.persistTransaction$.subscribe(effect => {
      container.push(effect);
    });

    let first = _.find(container, (action) => action.type === CREATE_TRANSACTION);
    let second = _.find(container, (action) => action.type === FETCH_ACCOUNT);
    let third = _.find(container, (action) => action.type === FETCH_EQUITY);

    expect(_.size(container)).toBe(3);
    expect(third.payload).toBe(5);
    expect(third.type).toBe(FETCH_EQUITY);
    expect(first.type).toBe(CREATE_TRANSACTION);
    expect(second.payload).toBe(3);
    expect(first.payload.name).toBe(sampleTransaction.name);
  });

  it('should return an UPDATE_ACCOUNT action with proper payload after dispatching FETCH_ACCOUNT', () => {
    runner.queue({type: FETCH_ACCOUNT, payload: 1});
    transactionEffectService.accountFetch$.subscribe((effect) => {
      expect(effect.payload.identifier).toBeDefined();
      expect(effect.payload.identifier).toBe(1);
      expect(effect.type).toBe(UPDATE_ACCOUNT);
    });
  });

  it('should return an CREATE_ACCOUNT action with proper payload after dispatching PERSIST_ACCOUNT', () => {
    runner.queue({type: PERSIST_ACCOUNT, payload: sampleAccount});
    transactionEffectService.accountPersist$.subscribe((effect) => {
      expect(effect.payload.identifier).toBeDefined();
      expect(effect.type).toBe(CREATE_ACCOUNT);
    });
  });

  it('should return an UPDATE_ACCOUNT action with proper payload after dispatching REFRESH_ACCOUNT', () => {
    let accountToBePassed = _.cloneDeep(sampleTransaction);
    accountToBePassed.identifier = 1;

    runner.queue({type: REFRESH_ACCOUNT, payload: sampleAccount});
    transactionEffectService.accountRefresh$.subscribe((effect) => {
      expect(effect.payload.identifier).toBeDefined();
      expect(effect.type).toBe(UPDATE_ACCOUNT);
    });
  });

  it('should return an GET_ACCOUNTS_BY_USER action with proper payload after dispatching FETCH_ACCOUNTS_BY_USER', () => {
    runner.queue({type: FETCH_ACCOUNTS_BY_USER});
    transactionEffectService.accountsFetchByUser$.subscribe((effect) => {
      expect(effect.type).toBe(GET_ACCOUNTS_BY_USER);
    });
  });

  it('should return an GET_ACCOUNTS_BY_USER action with proper payload after dispatching FETCH_ACCOUNTS_BY_USER', () => {
    runner.queue({type: FETCH_ACCOUNTS_BY_USER});
    transactionEffectService.accountsFetchByUser$.subscribe((effect) => {
      expect(effect.type).toBe(GET_ACCOUNTS_BY_USER);
    });
  });

  it('should get the whole DB', () => {
    runner.queue({type: FETCH_ALL});

    transactionEffectService.fetchAll$.subscribe((effect) => {
      expect(effect.payload.transactions).toContain(sampleTransaction);
      expect(effect.type).toBe(UPDATE_ALL);
    });
  });

  it('should invoke the complete regeneration of the data state when a REMOVE_ACCOUNT action is dispatched', ()=> {
    runner.queue({type: REMOVE_ACCOUNT, payload: 1});

    transactionEffectService.removeAccount$.subscribe((effect)=>{
      expect(effect.type).toBe(FETCH_ALL);
    });

  });
});
