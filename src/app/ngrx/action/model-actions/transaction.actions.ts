import {Action} from "@ngrx/store";
import {CREATE_TRANSACTION, PERSIST_TRANSACTION, REFRESH_TRANSACTION, REMOVE_TRANSACTION} from "../action.types";
import {Transaction} from "../../../model/model";

export class CreateTransaction implements Action {
  readonly type: string = CREATE_TRANSACTION;
  payload: Transaction;

  constructor(payload: Transaction) {
    this.payload = payload;
  }
}

export class PersistTransaction implements Action {
  readonly type: string = PERSIST_TRANSACTION;
  payload: Transaction;

  constructor(payload: Transaction) {
    this.payload = payload;
  }
}

export class RemoveTransaction implements Action {
  readonly type: string = REMOVE_TRANSACTION;
  payload: number;

  constructor(payload: number) {
    this.payload = payload;
  }
}

export class RefreshTransaction implements Action {
  readonly type: string = REFRESH_TRANSACTION;
  payload: Transaction;

  constructor(payload: Transaction){
    this.payload = payload;
  }
}
