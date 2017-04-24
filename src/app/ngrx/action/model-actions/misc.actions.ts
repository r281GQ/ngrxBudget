import {Action} from "@ngrx/store";
import {UPDATE_ALL, FETCH_ALL} from "../../reducer/reducer";
import {RawDataBase} from "../../../repo/repo.service";
/**
 * Created by veghe on 24/04/2017.
 */
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
