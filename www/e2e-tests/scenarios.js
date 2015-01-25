'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('Sikher App', function() {

  browser.get('/');

  it('should automatically redirect to / when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/");
    expect(element.all(by.css('ion-nav-view[name="search"]')).first().getInnerHtml()).toMatch(/view-title="Search"/);
  });

  describe('Search', function() {

    beforeEach(function() {
      browser.get('#/search');
    });

    it('should render search when user navigates to /search', function() {
      expect(element.all(by.css('ion-nav-view[name="search"]')).first().getInnerHtml()).toMatch(/view-title="Search"/);
    });
  });

  describe('Prayers', function() {

    beforeEach(function() {
      browser.get('#/prayers');
    });

    it('should render prayers when user navigates to /prayers', function() {
      expect(element.all(by.css('ion-nav-view[name="prayers"]')).first().getInnerHtml()).toMatch(/view-title="Prayers"/);
    });
  });

  describe('Random', function() {

    beforeEach(function() {
      browser.get('#/random');
    });

    it('should automatically redirect to /view/page/{random hymn number}', function() {
      expect(browser.getLocationAbsUrl()).toMatch("/view/page/");
      expect(element.all(by.css('ion-nav-view[name="search"]')).first().getInnerHtml()).toMatch(/view-title=""/);
    });
  });

  describe('Favourites', function() {

    beforeEach(function() {
      browser.get('#/favourites');
    });

    it('should render favourites when user navigates to /favourites', function() {
      expect(element.all(by.css('ion-nav-view[name="favourites"]')).first().getInnerHtml()).toMatch(/view-title="Favourites"/);
    });
  });

  describe('Settings', function() {

    beforeEach(function() {
      browser.get('#/settings');
    });

    it('should render settings when user navigates to /settings', function() {
      expect(element.all(by.css('ion-nav-view[name="settings"]')).first().getInnerHtml()).toMatch(/view-title="Settings"/);
    });
  });
});
