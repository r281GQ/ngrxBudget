import {Action} from "@ngrx/store";
import {
  CREATE_ACCOUNT, DELETE_ACCOUNT, FETCH_ACCOUNT, FETCH_ACCOUNTS_BY_USER, GET_ACCOUNT, PERSIST_ACCOUNT, REFRESH_ACCOUNT,
  REMOVE_ACCOUNT,
  UPDATE_ACCOUNT,
  GET_ACCOUNTS_BY_USER
} from "../../reducer/reducer";
import {Account} from "../../../model/model";
/**
 * Created by veghe on 23/04/2017.
 */

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

export class DeleteAccount implements Action {
  readonly type: string = DELETE_ACCOUNT;
  payload: number;

  constructor(payload: number) {
    this.payload = payload;
  }
}
//
// export class GetAccount implements Action {
//   readonly type: string = GET_ACCOUNT;
//   payload: number;
//
//   constructor(payload: number) {
//     this.payload = payload;
//   }
// }
//
export class GetAccountsByUser implements Action {
  readonly type: string = GET_ACCOUNTS_BY_USER;
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

export class RemoveAccount implements Action {
  readonly type: string = REMOVE_ACCOUNT;
  payload: number;

  constructor(payload: number) {
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

export class FetchAccountsByUser implements Action {
  readonly type: string = FETCH_ACCOUNTS_BY_USER;
}
