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
 });