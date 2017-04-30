import {Grouping, Account, Transaction} from "../../model/model";

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

export {sampleAccount, sampleTransaction, sampleGrouping};
