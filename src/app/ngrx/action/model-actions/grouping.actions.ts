import {Action} from "@ngrx/store";
import {
  CREATE_GROUPING, FETCH_GROUPING, PERSIST_GROUPING, REFRESH_GROUPING, REMOVE_GROUPING,
  UPDATE_GROUPING
} from "../../reducer/reducer";
import {Grouping} from "../../../model/model";

export class FetchGrouping implements Action {
  type: string = FETCH_GROUPING;
  payload: number;

  constructor (payload: number){
    this.payload = payload;
  }
}

export class RefreshGrouping implements Action {
  readonly type: string = REFRESH_GROUPING;
  payload: Grouping;

  constructor(payload: Grouping){
    this.payload = payload;
  }
}

export class RemoveGrouping implements Action{
  readonly type: string = REMOVE_GROUPING;
  payload: number;

  constructor(payload: number){
    this.payload = payload;
  }
}

export class UpdateGrouping implements Action {
  type: string = UPDATE_GROUPING;
  payload: Grouping;

  constructor (grouping: Grouping){
    this.payload = grouping;
  }
}

export class PersistGrouping implements Action{
  readonly type: string = PERSIST_GROUPING;
  payload: Grouping;
  constructor(payload: Grouping){
    this.payload = payload;
  }
}

export class CreateGrouping implements Action{
  readonly type: string= CREATE_GROUPING;
  payload: Grouping;
  constructor(payload: Grouping){
    this.payload = payload;
  }
}
