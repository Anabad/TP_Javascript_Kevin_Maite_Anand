const exec = require('child_process').exec;

module.exports = function(grunt) {
  'use strict';

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  //npm install grunt grunt-jscs grunt-contrib-jshint grunt-contrib-watch
  // time-grunt load-grunt-tasks jshint-stylish grunt-execute

  grunt.initConfig({
    watch: {
      options: {
        livereload: true,
      },
      js: {
        files: ['Model/*.js'],
        tasks: ['jshint:js', 'jscs:js']
      },
      view: {
        files: ['View/*.html', 'View/css/*.css', 'View/html/*.html']
      },
      viewScripts: {
        files: ['View/scripts/*.js', 'View/*.js'],
        tasks: ['jshint:js', 'jscs:js']
      }
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        jshintrc: true
      },
      js: {
        src: ['Model/*.js']
      }
    },
    jscs: {
      js: {
        src: ['Model/*.js']
      }
    },
    run: {
      js: {
        cmd: 'npm start' // change it by you filename (for the final
        // program use main or index)
      }
    }
  });

  grunt.registerTask('default',
    ['jshint:js', 'jscs:js', 'electron', 'watch']);

  grunt.registerTask('electron', function() {
    exec('npm start');
    grunt.log.ok('Electron Started');
  });
};
