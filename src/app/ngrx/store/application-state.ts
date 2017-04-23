/**
 * Created by veghe on 23/04/2017.
 */

export interface ApplicationState {
  user: {
    id: number
  },
  transactionFilters: {
    query: string,
    date: string,
    filterBy: string,
    id: number
  }
  model: {
    user: {}
    // transactions: any[],
    // accounts: any[],
    // equities: any[],
    // budgets: any[],
    // budgetPeriods: any[],
    // groupings: any[],
  }
}

export const INITIAL_STATE: ApplicationState = {
  user: {
    id: undefined
  },
  transactionFilters: {
    query: undefined,
    date: undefined,
    filterBy: undefined,
    id: undefined
  },
  model: {
    user: {}
  }
}
