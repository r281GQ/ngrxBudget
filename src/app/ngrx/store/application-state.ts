/**
 * Created by veghe on 23/04/2017.
 */

export interface ApplicationState {
  auth: {
    user: {
      id: number
      email: string;
      name: string;
    }
  },
  transactionFilter: {
    query: string,
    date: string,
    filterBy: string,
    id: number
  }
  model: {
    accounts: {
      [identifier: number]: {
        identifier: number,
        name: string,
        balance: number,
        currency: string,
        transactions: number []
      }
    },
    budgets: {
      [identifier: number]: {
        identifier: number,
        name: string,
        defaultAllowance: number,
        currency: string,
        transactions: number [],
        budgetPeriods: number []
      }
    },
    budgetPeriods: {
      [identifier: number]: {
        identifier: number,
        name: string,
        allowance: number,
        balance: number,
        currency: string,
        period: string,
        budget: number,
        transactions: number []
      }
    },
    equities: {
      [identifier: number]: {
        identifier: number,
        name: string,
        balance: number,
        currency: string,
        type: string,
        transactions: number []
      }
    },
    groupings: {
      [identifier: number]: {
        identifier: number,
        name: string,
        type: string,
        transactions: number []
      }
    },
    transactions: {
      [identifier: number]: {
        currency: string,
        amount: number,
        name: string,
        identifier: number,
        memo: string,
        creationDate: string,
        period: string,
        account: number,
        budget?: number,
        budgetPeriod?: number,
        equity?: number,
        grouping: number
      }
    }
  }
}

export const INITIAL_STATE: ApplicationState = {
  auth: {
    user: {
      id: undefined,
      email: undefined,
      name: undefined
    }
  },
  transactionFilter: {
    query: '',
    date: '',
    filterBy: '',
    id: 0
  },
  model: {
    accounts: {},
    budgets: {},
    equities: {},
    groupings: {},
    budgetPeriods: {},
    transactions: {}
  }
}
