angular.module('starter.filters', [])

.filter('scripture', function() {
  return function(scripture) {

  	var scriptures = {
	  	'sggs':'Guru Granth Sahib',
	    'bgv' : 'Bhai Gurdas Vaaran',
	    'kbg' : 'Kabit Bhai Gurdas',
	    'bnl' : 'Bhai Nand Lal',
	    'dgs' : 'Dasam Granth Sahib',
	    'misc' : 'Amrit Keertan'
	}

	return scriptures[scripture];

    }
 });