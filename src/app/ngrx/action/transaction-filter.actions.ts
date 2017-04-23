import {Action} from "@ngrx/store";
import {UPDATE_DATE, UPDATE_FILTER, UPDATE_ID, UPDATE_QUERY} from "../reducer/reducer";
/**
 * Created by veghe on 23/04/2017.
 */


export class QueryUpdate implements Action {
  readonly type: string;
  payload: string;

  constructor(payload: string) {
    this.type = UPDATE_QUERY;
    this.payload = payload;
  }
}


export class DateUpdate implements Action {
  readonly type: string;
  payload: string;


  constructor(payload: string) {
    this.type = UPDATE_DATE;
    this.payload = payload;
  }
}

export class FilterUpdate implements Action {
  readonly type: string;
  payload: string;


  constructor(payload: string) {
    this.type = UPDATE_FILTER;
    this.payload = payload;
  }
}

export class IdUpdate implements Action {
  readonly type: string;
  payload: number;


  constructor(payload: number) {
    this.type = UPDATE_ID;
    this.payload = payload;
  }
}
