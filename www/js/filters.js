angular.module('starter.filters', [])

.filter('scripture', function() {
  return function(scripture) {

  	var scriptures = {
	  	'sggs':'Guru Granth Sahib',
	    'bgv' : 'Bhai Gurdas Vaaran',
	    'kbg' : 'Bhai Gurdas Kabit Savaiye',
	    'bnl' : 'Bhai Nand Lal Bani',
	    'dgs' : 'Dasam Granth Sahib',
	    'misc' : 'Amrit Kirtan'
	}

	return scriptures[scripture];

    }
 })

.filter('placeholder',function() {
    return function(searchType) {

    var searchTypes = {
        // Search type : [ placeholder text, font type, search type]
        'gurmukhi_search':['A`Kr','gurmukhi','letters'],
        'gurmukhi' : ['lPz','gurmukhi','words'],
        'transliteration_search' : ['First Letters','english','letters'],
        'translation' : ['Whole Words','english','words']
    }

    return searchTypes[searchType];
    }
});