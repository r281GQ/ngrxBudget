import {TestBed, inject} from '@angular/core/testing';

import {TransactionEffectService} from './transaction-effect.service';
import {EffectsRunner, EffectsTestingModule} from "@ngrx/effects/testing";
import {RepoService} from "../../repo/repo.service";
import {CREATE_TRANSACTION, GROUPING_FETCH, PERSIST_TRANSACTION, UPDATE_GROUPING} from "../reducer/reducer";
import {Actions} from "@ngrx/effects";
import {Action} from "@ngrx/store";import * as _ from 'lodash';


describe('TransactionEffectService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      TransactionEffectService,
      RepoService
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

  it('should ...2', () => {
    runner.queue({type:GROUPING_FETCH});

    // console.log(transactionEffectService);

    transactionEffectService.groupingFetch$.subscribe(effects => {

      expect(effects.type).toBe(UPDATE_GROUPING);

    });
  });


  it('should ...1', () => {
    runner.queue({type: PERSIST_TRANSACTION,  payload: {
      name: 'salary',
        currency: 'GBP',
        period: '03-2017',
        identifier: 1,
        account: 3,
        grouping: 4,
        amount: 55,
        creationDate: '12-03-2017',
        memo: ''
    }});

    // console.log(transactionEffectService);

    let contatiner : Action [] = [];

    transactionEffectService.persistTransaction$.subscribe(effects => {
        contatiner.push(effects);

      // console.log(effects);
      // expect(effects.type).toBe(GROUPING_FETCH);
      // expect(effects.type).toBe(CREATE_TRANSACTION);
      // console.log(effects[0].payload);
      // expect(effects[0].payload.name).toBe('salary');


    });

    let first = _.find(contatiner, (sction) => sction.type === CREATE_TRANSACTION);


    let escon = _.find(contatiner, (sction) => sction.type === GROUPING_FETCH);


    expect(escon.type).toBe(GROUPING_FETCH);
    expect(first.type).toBe(CREATE_TRANSACTION);
    expect(first.payload.name).toBe('salary');

  });
});
