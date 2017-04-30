export interface Account {
  identifier: number,
  name: string,
  balance: number,
  currency: string,
  transactions?: number []
}

export interface Budget {
  identifier: number,
  name: string,
  defaultAllowance: number,
  currency: string,
  transactions?: number [],
  budgetPeriods?: number []
}

export interface BudgetPeriod {
}

export interface Equity {
  identifier: number,
  name: string,
  balance: number,
  currency: string,
  type: string,
  transactions?: number []
}

export interface Transaction {
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

export interface Grouping {
  identifier: number,
  name: string,
  type: string,
  transactions?: number []
}
