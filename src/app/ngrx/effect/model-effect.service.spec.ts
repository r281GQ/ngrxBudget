import {inject, TestBed} from "@angular/core/testing";

import {ModelEffectService} from "./model-effect.service";
import {EffectsRunner, EffectsTestingModule} from "@ngrx/effects/testing";
import {RepoService} from "../../repo/repo.service";
import {
  CREATE_ACCOUNT,
  CREATE_GROUPING,
  CREATE_TRANSACTION,
  FETCH_ACCOUNT,
  FETCH_ALL,
  FETCH_EQUITY,
  UPDATE_ACCOUNT,
  UPDATE_ALL,
  UPDATE_GROUPING
} from "../action/action.types";
import {Action} from "@ngrx/store";
import * as _ from "lodash";
import {Account, Grouping, Transaction} from "../../model/model";
import {Observable} from "rxjs/Observable";
import {FetchAll} from "../action/model-actions/misc.actions";
import {
  FetchGrouping,
  PersistGrouping,
  RefreshGrouping,
  RemoveGrouping
} from "../action/model-actions/grouping.actions";
import {PersistTransaction, RefreshTransaction, RemoveTransaction} from "../action/model-actions/transaction.actions";
import {PersistAccount, RefreshAccount, RemoveAccount} from "../action/model-actions/account.actions";
import {RepoMock} from "./repo-mock";
import {sampleAccount, sampleGrouping, sampleTransaction} from "./test.constant";


describe('ModelEffectService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      ModelEffectService,
      {provide: RepoService, useClass: RepoMock},
    ]
  }));

  let runner: EffectsRunner;
  let transactionEffectService: ModelEffectService;
  let repo: RepoMock;

  beforeEach(inject([
      EffectsRunner, ModelEffectService, RepoService
    ],
    (_runner, _transactionEffectService, _repoMock) => {
      runner = _runner;
      transactionEffectService = _transactionEffectService;
      repo = _repoMock;
    }
  ));

  it('should fetch grouping from the backend and run UPDATE_GROUPING with the data provided as a payload', done => {
    runner.queue(new FetchGrouping(1));

    transactionEffectService.groupingFetch$.subscribe(effects => {
      expect(effects.type).toBe(UPDATE_GROUPING);
      expect(effects.payload.type).toBe('Expense');
      expect(effects.payload.name).toBe('Rent');
      expect(effects.payload.identifier).toBe(1);
      done();
    });
  });

  it('should run updateGrouping with the corresponding gruping after returning from the backend', done => {

    runner.queue(new RefreshGrouping(_.cloneDeep(sampleGrouping)));

    transactionEffectService.groupingRefresh$.subscribe(effect => {

      expect(effect.type).toBe(UPDATE_GROUPING);
      expect(effect.payload.name).toBe(sampleGrouping.name);

      done();
    });

  });

  it('should reger db on tran removal', done => {

    runner.queue(new RemoveTransaction(1));

    transactionEffectService.removeTransaction$.subscribe(effect => {
      done();
    });

  });

  it('should regenerate db when removegrouping is called', done => {

    let removeGFunction = spyOn(repo, 'removeGrouping').and.returnValue(Observable.of(1));

    runner.queue(new RemoveGrouping(1));

    transactionEffectService.groupingRemoval$.subscribe(effect => {

      expect(removeGFunction).toHaveBeenCalledWith(1);

      expect(effect.type).toBe(FETCH_ALL);

      done();
    });

  });

  it('should createGrouping after finished persistinit into the db', done => {

    let gr = _.cloneDeep(sampleGrouping);

    gr.identifier = undefined;

    runner.queue(new PersistGrouping(gr));

    transactionEffectService.groupingPersist$.subscribe(effect => {

      expect(effect.payload.identifier).toBeDefined();
      expect(effect.type).toBe(CREATE_GROUPING);

      done();
    });

  });


  it('should return two effect containing the expected payload after dispatching PERSIST_TRANSACTION without budgets and equities', done => {
    runner.queue(new PersistTransaction(sampleTransaction));

    let container: Action [] = [];


    transactionEffectService.persistTransaction$.subscribe(effect => {
      container.push(effect);



    },null,()=> console.log('completed'));

    setTimeout(()=> {
      let first = _.find(container, (action) => action.type === CREATE_TRANSACTION);
        let second = _.find(container, (action) => action.type === FETCH_ACCOUNT);
        expect(_.size(container)).toBe(2);

        expect(first.type).toBe(CREATE_TRANSACTION);
        expect(first.payload.name).toBe(sampleTransaction.name);
        expect(first.payload.identifier).toBeDefined();
        expect(second.payload).toBe(3);
        done();
    }, 300);

    // waitsFor(() => _.size(container) === 2);

    // runs(()=>{
    //   let first = _.find(container, (action) => action.type === CREATE_TRANSACTION);
    //   let second = _.find(container, (action) => action.type === FETCH_ACCOUNT);
    //   expect(_.size(container)).toBe(2);
    //
    //   expect(first.type).toBe(CREATE_TRANSACTION);
    //   expect(first.payload.name).toBe(sampleTransaction.name);
    //   expect(first.payload.identifier).toBeDefined();
    //   expect(second.payload).toBe(3);
    //   done();
    // });

  });

  it('should return three effect containing the expected payload after dispatching PERSIST_TRANSACTION without budgets but with equity', done => {
    let modifiedTransaction = _.cloneDeep(sampleTransaction);

    modifiedTransaction.equity = 5;


    runner.queue(new PersistTransaction(modifiedTransaction));
    let container: Action [] = [];

    transactionEffectService.persistTransaction$.subscribe(effect => {
      container.push(effect);
    });

    setTimeout(()=> {
      let first = _.find(container, (action) => action.type === CREATE_TRANSACTION);
      let second = _.find(container, (action) => action.type === FETCH_ACCOUNT);
      let third = _.find(container, (action) => action.type === FETCH_EQUITY);

      expect(_.size(container)).toBe(3);
      expect(third.payload).toBe(5);
      expect(third.type).toBe(FETCH_EQUITY);
      expect(first.type).toBe(CREATE_TRANSACTION);
      expect(second.payload).toBe(3);
      expect(first.payload.name).toBe(sampleTransaction.name);
      done();
    }, 300);


  });


  it('should return an CREATE_ACCOUNT action with proper payload after dispatching PERSIST_ACCOUNT', done => {
    runner.queue(new PersistAccount(sampleAccount));
    transactionEffectService.accountPersist$.subscribe((effect) => {
      expect(effect.payload.identifier).toBeDefined();
      expect(effect.type).toBe(CREATE_ACCOUNT);
      done();
    });
  });

  it('should return an UPDATE_ACCOUNT action with proper payload after dispatching REFRESH_ACCOUNT', done => {
    let accountToBePassed = _.cloneDeep(sampleAccount);
    accountToBePassed.identifier = 1;

    runner.queue(new RefreshAccount(accountToBePassed));
    transactionEffectService.accountRefresh$.subscribe((effect) => {
      expect(effect.payload.identifier).toBeDefined();
      expect(effect.type).toBe(UPDATE_ACCOUNT);
      done();
    });
  });

  it('should invoke the complete regeneration of the data state when dispatching REFRESH_TRANSACTION', done => {
    let transactionToBePassed = _.cloneDeep(sampleTransaction);

    runner.queue(new RefreshTransaction(transactionToBePassed));

    transactionEffectService.refreshTransaction$.subscribe((effect) => {
      expect(effect.type).toBe(FETCH_ALL);

      done();
    });
  });

  // it('should return an GET_ACCOUNTS_BY_USER action with proper payload after dispatching FETCH_ACCOUNTS_BY_USER', () => {
  //   runner.queue({type: FETCH_ACCOUNTS_BY_USER});
  //   transactionEffectService.accountsFetchByUser$.subscribe((effect) => {
  //     expect(effect.type).toBe(GET_ACCOUNTS_BY_USER);
  //   });
  // });
  //
  // it('should return an GET_ACCOUNTS_BY_USER action with proper payload after dispatching FETCH_ACCOUNTS_BY_USER', () => {
  //   runner.queue({type: FETCH_ACCOUNTS_BY_USER});
  //   transactionEffectService.accountsFetchByUser$.subscribe((effect) => {
  //     expect(effect.type).toBe(GET_ACCOUNTS_BY_USER);
  //   });
  // });

  it('should get the whole DB', (done) => {
    runner.queue(new FetchAll());

    transactionEffectService.fetchAll$.subscribe((effect) => {
      expect(effect.payload.transactions).toContain(sampleTransaction);
      expect(effect.type).toBe(UPDATE_ALL);
      done();
    });
  });

  it('should invoke the complete regeneration of the data state when a REMOVE_ACCOUNT action is dispatched', done => {
    runner.queue(new RemoveAccount(1));

    transactionEffectService.removeAccount$.subscribe((effect) => {
      expect(effect.type).toBe(FETCH_ALL);
      done();
    });
  });
});
