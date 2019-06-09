import { LaBodegaPage } from './app.po';

describe('la-bodega App', function() {
  let page: LaBodegaPage;

  beforeEach(() => {
    page = new LaBodegaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
