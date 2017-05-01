import {Action} from "@ngrx/store";
import {Budget} from "../../../model/model";
import {
  CREATE_BUDGET,
  FETCH_BUDGET,
  PERSIST_BUDGET,
  REFRESH_BUDGET,
  REMOVE_BUDGET,
  UPDATE_BUDGET
} from "../action.types";
export class CreateBudget implements Action {
  readonly type: string = CREATE_BUDGET;
  payload: Budget;

  constructor(payload: Budget) {
    this.payload = payload;
  }
}

export class UpdateBudget implements Action {
  readonly type: string = UPDATE_BUDGET;
  payload: Budget;

  constructor(payload: Budget) {
    this.payload = payload;
  }
}

export class PersistBudget implements Action {
  readonly type: string = PERSIST_BUDGET;
  payload: Budget;

  constructor(payload: Budget) {
    this.payload = payload;
  }
}

export class RefreshBudget implements Action {
  readonly type: string = REFRESH_BUDGET;
  payload: Budget;

  constructor(payload: Budget) {
    this.payload = payload;
  }
}

export class FetchBudget implements Action {
  readonly type: string = FETCH_BUDGET;
  payload: number;

  constructor(payload: number) {
    this.payload = payload;
  }
}

export class RemoveBudget implements Action {
  readonly type: string = REMOVE_BUDGET;
  payload: number;

  constructor(payload: number) {
    this.payload = payload;
  }
}
