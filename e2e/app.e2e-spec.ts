import { NgrxBudgetPage } from './app.po';

describe('ngrx-budget App', () => {
  let page: NgrxBudgetPage;

  beforeEach(() => {
    page = new NgrxBudgetPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
