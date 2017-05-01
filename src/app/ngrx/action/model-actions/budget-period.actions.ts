import {Action} from "@ngrx/store";
import {BudgetPeriod} from "../../../model/model";
import {CREATE_BUDGET_PERIOD, FETCH_BUDGET_PERIOD, REFRESH_BUDGET_PERIOD, UPDATE_BUDGET_PERIOD} from "../action.types";

export class CreateBudgetPeriod implements Action {
  readonly type: string = CREATE_BUDGET_PERIOD;
  payload: BudgetPeriod;

  constructor(payload: BudgetPeriod) {
    this.payload = payload;
  }
}

export class UpdateBudgetPeriod implements Action {
  readonly type: string = UPDATE_BUDGET_PERIOD;
  payload: BudgetPeriod;

  constructor(payload: BudgetPeriod) {
    this.payload = payload;
  }
}

export class RefreshBudgetPeriod implements Action {
  readonly type: string = REFRESH_BUDGET_PERIOD;
  payload: BudgetPeriod;

  constructor(payload: BudgetPeriod) {
    this.payload = payload;
  }
}

export class FetchBudgetPeriod implements Action {
  readonly type: string = FETCH_BUDGET_PERIOD;
  payload: number;

  constructor(payload: number) {
    this.payload = payload;
  }
}
