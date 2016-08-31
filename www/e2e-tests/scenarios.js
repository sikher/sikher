'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('Sikher App', function() {

  browser.get('/');

  it('should automatically redirect to / when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/");
    expect(browser.getTitle()).toContain('Search');
  });

  describe('Search', function() {

    beforeEach(function() {
      browser.get('#/search');
    });

    it('should render search when user navigates to /search', function() {
      expect(browser.getTitle()).toContain('Search');
      element(by.model('searchText')).sendKeys("mml");
      element(by.id('searchBtn')).click();
      var results = element.all(by.repeater('scripture in scriptures'));
      expect(results.count()).toBeGreaterThan(9);
    });
  });

  describe('Prayers', function() {

    beforeEach(function() {
      browser.get('#/prayers');
    });

    it('should render prayers when user navigates to /prayers', function() {
      expect(browser.getTitle()).toContain('Prayers');
    });
  });

  describe('Random', function() {

    beforeEach(function() {
      browser.get('#/random');
    });

    it('should automatically redirect to /view/page/{random hymn number}', function() {
      expect(browser.getTitle()).toContain('Page');
    });
  });

  describe('Favourites', function() {

    beforeEach(function() {
      browser.get('#/favourites');
    });

    it('should render favourites when user navigates to /favourites', function() {
        expect(browser.getTitle()).toContain('Favourites');
    });
  });

  describe('Settings', function() {

    beforeEach(function() {
      browser.get('#/settings');
    });

    it('should render settings when user navigates to /settings', function() {
      expect(browser.getTitle()).toContain('Settings');
    });
  });
});
