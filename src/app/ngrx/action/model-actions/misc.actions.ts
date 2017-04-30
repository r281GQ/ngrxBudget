import {Action} from "@ngrx/store";
import {UPDATE_ALL, FETCH_ALL, WIPE} from "../action.types";
import {RawDataBase} from "../../../repo/repo.service";

export class UpdateAll implements Action {
  readonly type: string = UPDATE_ALL;
  payload: RawDataBase;

  constructor(payload: RawDataBase) {
    this.payload = payload;
  }
}

export class FetchAll implements Action {
  readonly type: string = FETCH_ALL;
}

export class Wipe implements Action {
  readonly type: string = WIPE;
}
