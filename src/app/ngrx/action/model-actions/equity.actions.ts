import {Action} from "@ngrx/store";
import {
  CREATE_ACCOUNT, CREATE_EQUITY,
  FETCH_ACCOUNT, FETCH_EQUITY,
  PERSIST_ACCOUNT, PERSIST_EQUITY,
  REFRESH_ACCOUNT, REFRESH_EQUITY,
  REMOVE_ACCOUNT, REMOVE_EQUITY,
  UPDATE_ACCOUNT, UPDATE_EQUITY
} from "../action.types";
import {Account} from "../../../model/model";

export class CreateEquity implements Action {
  readonly type: string = CREATE_EQUITY;
  payload: Account;

  constructor(payload: Account) {
    this.payload = payload;
  }
}

export class UpdateEquity implements Action {
  readonly type: string = UPDATE_EQUITY;
  payload: Account;

  constructor(payload: Account) {
    this.payload = payload;
  }
}


export class PersistEquity implements Action {
  readonly type: string = PERSIST_EQUITY;
  payload: Account;

  constructor(payload: Account) {
    this.payload = payload;
  }
}

export class RefreshEquity implements Action {
  readonly type: string = REFRESH_EQUITY;
  payload: Account;

  constructor(payload: Account) {
    this.payload = payload;
  }
}

export class FetchEquity implements Action {
  readonly type: string = FETCH_EQUITY;
  payload: number;

  constructor(payload: number) {
    this.payload = payload;
  }
}

export class RemoveEquity implements Action {
  readonly type: string = REMOVE_EQUITY;
  payload: number;

  constructor(payload: number) {
    this.payload = payload;
  }
}
