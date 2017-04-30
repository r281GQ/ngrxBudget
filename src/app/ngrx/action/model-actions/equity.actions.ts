import {Action} from "@ngrx/store";
import {FETCH_EQUITY} from "../action.types";

export class FetchEquity implements Action {
  readonly type: string = FETCH_EQUITY;
  payload: number;

  constructor (payload: number){
    this.payload = payload;
  }
}
