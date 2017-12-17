import { Version1.1Page } from './app.po';

describe('version1.1 App', function() {
  let page: Version1.1Page;

  beforeEach(() => {
    page = new Version1.1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
