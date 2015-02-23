module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ["app/*.js"]
    },
    browserify: {
      dist: {
        files: {
          "build/app.js": ["app/main.js"]
        }
      },
      dev: {
        files: {
          "build/app.min.js": ["app/main.js"]
        }
      }
    },
    uglify: {
      dist: {
        files: {
          "build/app.min.js": ["build/app.js"]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['jshint', 'browserify:dist', 'uglify:dist']);
};