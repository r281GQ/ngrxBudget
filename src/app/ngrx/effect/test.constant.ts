import {Grouping, Account, Transaction, Equity} from "../../model/model";

const sampleTransaction: Transaction = {
  name: 'salary',
  currency: 'GBP',
  period: '03-2017',
  identifier: undefined,
  account: 3,
  grouping: 4,
  amount: 55,
  creationDate: '12-03-2017',
  memo: ''
};
const sampleGrouping: Grouping = {identifier: undefined, type: 'Expense', name: 'Rent'};
const sampleAccount: Account = {identifier: undefined, currency: 'GBP', balance: 100, name: 'Main'};
const sampleEquity: Equity = {identifier: undefined, currency: 'GBP', balance: 200, type: 'liability', name: 'loan'};

export {sampleAccount, sampleTransaction, sampleGrouping, sampleEquity};
