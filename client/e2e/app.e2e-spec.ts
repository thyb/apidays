import { ApidaysAngular2Page } from './app.po';

describe('apidays-angular2 App', function() {
  let page: ApidaysAngular2Page;

  beforeEach(() => {
    page = new ApidaysAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
