module.exports = function(grunt) {
    grunt.initConfig({
        'download-atom-shell': {
            version: '0.21.2',
            outputDir: 'desktop'
        }
    });


grunt.loadNpmTasks('grunt-download-atom-shell');

grunt.registerTask('default', 'download-atom-shell');

};
