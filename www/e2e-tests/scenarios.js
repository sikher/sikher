'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {

  browser.get('/');

  it('should automatically redirect to / when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/");
  });


  describe('favourites', function() {

    beforeEach(function() {
      browser.get('#/favourites');
    });


    it('should render favourites when user navigates to /favourites', function() {
      expect(element.all(by.css('ion-nav-view[name="favourites"]')).first().getInnerHtml()).
        toMatch(/view-title="Favourites"/);
    });

  });
});
