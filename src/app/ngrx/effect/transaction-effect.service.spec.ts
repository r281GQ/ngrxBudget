import { TestBed, inject } from '@angular/core/testing';

import { TransactionEffectService } from './transaction-effect.service';
import {EffectsRunner, EffectsTestingModule} from "@ngrx/effects/testing";
import {RepoService} from "../../repo/repo.service";
import {GROUPING_FETCH, UPDATE_GROUPING} from "../reducer/reducer";
import {Actions} from "@ngrx/effects";

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

  it('should ...', () => {
    runner.queue({GROUPING_FETCH});

    // console.log(transactionEffectService);

    transactionEffectService.groupingFetch$.subscribe(effects => {

      expect(effects.type).toBe(UPDATE_GROUPING);

    });
  });
});
