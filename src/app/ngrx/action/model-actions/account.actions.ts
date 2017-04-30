import {Action} from "@ngrx/store";
import {
  CREATE_ACCOUNT,
  FETCH_ACCOUNT,
  PERSIST_ACCOUNT,
  REFRESH_ACCOUNT,
  REMOVE_ACCOUNT,
  UPDATE_ACCOUNT
} from "../action.types";
import {Account} from "../../../model/model";

export class CreateAccount implements Action {
  readonly type: string = CREATE_ACCOUNT;
  payload: Account;

  constructor(payload: Account) {
    this.payload = payload;
  }
}

export class UpdateAccount implements Action {
  readonly type: string = UPDATE_ACCOUNT;
  payload: Account;

  constructor(payload: Account) {
    this.payload = payload;
  }
}


export class PersistAccount implements Action {
  readonly type: string = PERSIST_ACCOUNT;
  payload: Account;

  constructor(payload: Account) {
    this.payload = payload;
  }
}

export class RefreshAccount implements Action {
  readonly type: string = REFRESH_ACCOUNT;
  payload: Account;

  constructor(payload: Account) {
    this.payload = payload;
  }
}

export class FetchAccount implements Action {
  readonly type: string = FETCH_ACCOUNT;
  payload: number;

  constructor(payload: number) {
    this.payload = payload;
  }
}

export class RemoveAccount implements Action {
  readonly type: string = REMOVE_ACCOUNT;
  payload: number;

  constructor(payload: number) {
    this.payload = payload;
  }
}
