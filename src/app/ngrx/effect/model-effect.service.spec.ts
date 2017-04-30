import {inject, TestBed} from "@angular/core/testing";

import {ModelEffectService} from "./model-effect.service";
import {EffectsRunner, EffectsTestingModule} from "@ngrx/effects/testing";
import {RepoService} from "../../repo/repo.service";
import {
  CREATE_ACCOUNT, CREATE_EQUITY,
  CREATE_GROUPING,
  CREATE_TRANSACTION,
  FETCH_ACCOUNT,
  FETCH_ALL,
  FETCH_EQUITY,
  UPDATE_ACCOUNT,
  UPDATE_ALL, UPDATE_EQUITY,
  UPDATE_GROUPING
} from "../action/action.types";
import {Action} from "@ngrx/store";
import * as _ from "lodash";
import {FetchAll} from "../action/model-actions/misc.actions";
import {
  FetchGrouping,
  PersistGrouping,
  RefreshGrouping,
  RemoveGrouping
} from "../action/model-actions/grouping.actions";
import {PersistTransaction, RefreshTransaction, RemoveTransaction} from "../action/model-actions/transaction.actions";
import {FetchAccount, PersistAccount, RefreshAccount, RemoveAccount} from "../action/model-actions/account.actions";
import {RepoMock} from "./repo-mock";
import {sampleAccount, sampleEquity, sampleGrouping, sampleTransaction} from "./test.constant";
import {FetchEquity, PersistEquity, RefreshEquity, RemoveEquity} from "../action/model-actions/equity.actions";


describe('ModelEffectService', () => {
  let runner: EffectsRunner;
  let modelEffectService: ModelEffectService;
  let repoMock: RepoMock;

  let account;
  let grouping;
  let transaction;
  let equity;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      ModelEffectService,
      {provide: RepoService, useClass: RepoMock},
    ]
  }));


  beforeEach(inject([
      EffectsRunner, ModelEffectService, RepoService
    ],
    (_runner, _transactionEffectService, _repoMock) => {
      runner = _runner;
      modelEffectService = _transactionEffectService;
      repoMock = _repoMock;
    }
  ));

  beforeEach(() => {
    account = sampleAccount;
    grouping = sampleGrouping;
    transaction = sampleTransaction;
    equity = sampleEquity;
  });

  it('fetchAccount => updateAccount', done => {
    account.identifier = 1;

    runner.queue(new FetchAccount(1));
    modelEffectService.fetchAccount$.subscribe((effect) => {
      expect(effect.type).toBe(UPDATE_ACCOUNT);
      done();
    });
  });

  it('persistAccount => createAccount', done => {
    runner.queue(new PersistAccount(account));
    modelEffectService.persistAccount$.subscribe((effect) => {
      expect(effect.payload.identifier).toBeDefined();
      expect(effect.type).toBe(CREATE_ACCOUNT);
      done();
    });
  });

  it('refreshAccount => updateAccount', done => {
    account.identifier = 1;

    runner.queue(new RefreshAccount(account));
    modelEffectService.refreshAccount$.subscribe((effect) => {
      expect(effect.payload.identifier).toBeDefined();
      expect(effect.type).toBe(UPDATE_ACCOUNT);
      done();
    });
  });

  it('removeAccount => fetchAll', done => {
    runner.queue(new RemoveAccount(1));

    modelEffectService.removeAccount$.subscribe((effect) => {
      expect(effect.type).toBe(FETCH_ALL);
      done();
    });
  });

  it('persistTransaction => createTransaction, fetchAccount', done => {
    runner.queue(new PersistTransaction(transaction));

    let container: Action [] = [];

    modelEffectService.persistTransaction$.subscribe(effect => {
      container.push(effect);
    });

    setTimeout(() => {
      let first = _.find(container, (action) => action.type === CREATE_TRANSACTION);
      let second = _.find(container, (action) => action.type === FETCH_ACCOUNT);
      expect(_.size(container)).toBe(2);

      expect(first.type).toBe(CREATE_TRANSACTION);
      expect(first.payload.name).toBe(transaction.name);
      expect(first.payload.identifier).toBeDefined();
      expect(second.payload).toBe(3);
      done();
    }, 100);
  });

  it('persistTransaction => createTransaction, fetchAccount, fetchEquity', done => {
    transaction.equity = 5;

    runner.queue(new PersistTransaction(transaction));
    let container: Action [] = [];

    modelEffectService.persistTransaction$.subscribe(effect => {
      container.push(effect);
    });

    setTimeout(() => {
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
    }, 100);
  });

  it('refreshTransaction => fetchAll', done => {
    runner.queue(new RefreshTransaction(transaction));

    modelEffectService.refreshTransaction$.subscribe((effect) => {
      expect(effect.type).toBe(FETCH_ALL);
      done();
    });
  });

  it('removeTransaction => fetchAll', done => {
    runner.queue(new RemoveTransaction(1));

    modelEffectService.removeTransaction$.subscribe(effect => {
      expect(effect.type).toBe(FETCH_ALL);
      done();
    });
  });

  it('fetchGrouping => updateGrouping', done => {
    runner.queue(new FetchGrouping(1));

    modelEffectService.groupingFetch$.subscribe(effects => {
      expect(effects.type).toBe(UPDATE_GROUPING);
      expect(effects.payload.type).toBe('Expense');
      expect(effects.payload.name).toBe('Rent');
      expect(effects.payload.identifier).toBe(1);
      done();
    });
  });

  it('persistGrouping => updateGrouping', done => {
    grouping.identifier = undefined;

    runner.queue(new PersistGrouping(grouping));

    modelEffectService.groupingPersist$.subscribe(effect => {
      expect(effect.payload.identifier).toBeDefined();
      expect(effect.type).toBe(CREATE_GROUPING);
      done();
    });
  });

  it('refreshGrouping => updateGrouping', done => {
    runner.queue(new RefreshGrouping(grouping));

    modelEffectService.groupingRefresh$.subscribe(effect => {
      expect(effect.type).toBe(UPDATE_GROUPING);
      expect(effect.payload.name).toBe(grouping.name);
      done();
    });
  });

  it('fetchEquity => updateEquity', done => {
    runner.queue(new FetchEquity(1));

    modelEffectService.fetchEquity$.subscribe(effect => {
      expect(effect.type).toBe(UPDATE_EQUITY);
      done();
    });
  });

  it('persistEquity => createEquity', done => {
    runner.queue(new PersistEquity(equity));

    modelEffectService.persistEquity$.subscribe(effect => {
      expect(effect.type).toBe(CREATE_EQUITY);
      expect(effect.payload.name).toBe(equity.name);
      done();
    });
  });

  it('refreshEquity => updateEquity', done => {
    runner.queue(new RefreshEquity(equity));

    modelEffectService.refreshEquity$.subscribe(effect => {
      expect(effect.type).toBe(UPDATE_EQUITY);
      expect(effect.payload.name).toBe(equity.name);
      done();
    });
  });

  it('removeEquity => fetchAll', done => {
    runner.queue(new RemoveEquity(1));

    modelEffectService.removeEquity$.subscribe(effect => {
      expect(effect.type).toBe(FETCH_ALL);
      done();
    });
  });

  it('fetchAll => updateAll', (done) => {
    runner.queue(new FetchAll());

    modelEffectService.fetchAll$.subscribe((effect) => {
      expect(effect.type).toBe(UPDATE_ALL);
      done();
    });
  });

  it('removeGrouping => fetchAll', done => {
    runner.queue(new RemoveGrouping(1));

    modelEffectService.groupingRemoval$.subscribe(effect => {
      expect(effect.type).toBe(FETCH_ALL);
      done();
    });
  });
});
