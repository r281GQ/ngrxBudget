import {Action} from "@ngrx/store";
import {CREATE_ACCOUNT, CREATE_TRANSACTION, UPDATE_ACCOUNT, UPDATE_ALL, CREATE_GROUPING, UPDATE_GROUPING} from "../action/action.types";
import {handleAccountCreate, handleAccountUpdate} from "./model-reducer/account.reducer";
import {handleTransactionCreation} from "./model-reducer/transaction.reducer";
import {handleUpdateAll} from "app/ngrx/reducer/model-reducer/misc-handler";
import {handleGroupingCreate, handleGroupingUpdate} from "./model-reducer/grouping.reducer";

const model = (state, action: Action) => {
  switch (action.type) {
    case CREATE_ACCOUNT:
      return handleAccountCreate(state, action);
    case UPDATE_ACCOUNT:
      return handleAccountUpdate(state, action);
    case CREATE_TRANSACTION:
      return handleTransactionCreation(state, action);
    case UPDATE_ALL:
      return handleUpdateAll(state, action);
    case CREATE_GROUPING:
      return handleGroupingCreate(state, action);
    case UPDATE_GROUPING:
      return handleGroupingUpdate(state, action);
    default:
      return state;
  }
}

export {model};
