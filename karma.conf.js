module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'www/lib/ionic/js/ionic.js',
      'www/lib/angular/angular.js',
      'www/lib/angular-animate/angular-animate.js',
      'www/lib/angular-sanitize/angular-sanitize.js',
      'www/lib/angular-ui-router/release/angular-ui-router.js',
      'www/lib/angular-mocks/angular-mocks.js',
      'www/lib/ionic/js/ionic-angular.js',
      'www/js/**/*.js',
      'www/templates/**/*.js',
      'www/tests/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-jasmine',
            ],
  });
};