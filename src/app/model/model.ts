/**
 * Created by veghe on 23/04/2017.
 */
export interface Account {
  identifier: number,
  name: string,
  balance: number,
  currency: string,
  transactions: number []
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
  // currency: string,
  // transactions: number []
}
