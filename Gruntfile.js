module.exports = function(grunt) {

  grunt.initConfig({

    jshint: {
      options: {
        jshintrc: true,
        ignores: [
          'describe',
          'it'
        ]
      },
      files: [
        'src/**/*.js',
        'test/**/*.js',
        'index.js'
      ]
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', 'jshint');

};
