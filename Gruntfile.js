module.exports = function(grunt) {
  grunt.initConfig({
    'download-electron': {
      version: '0.29.2',
      outputDir: 'desktop'
    }
  });

grunt.loadNpmTasks('grunt-download-electron');

grunt.registerTask('default', 'download-electron');

};
