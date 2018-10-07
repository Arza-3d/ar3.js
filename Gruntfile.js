module.exports = function (grunt) {
    grunt.registerTask('default', '', function(){
        grunt.log.write('test calling grunt task');
    });

    // Project configuration.
    /*
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.initConfig({
      uglify: {
        my_target: {
          files: {
            'ar3.min.js': ['modular/aside-nav/ar3-aside-nav-2.js']
          }
        }
      }
  });*/

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.initConfig({
      concat: {
        options: {
          separator: '\n\n// r3-separator\n\n',
        },
        dist: {
          src: ['modular/aside-nav/ar3-aside-nav-2.js', 'modular/aside-nav/ar3-aside-nav-4.js', 'modular/aside-nav/ar3-aside-nav-5.js'],
          dest: 'ar3-aside-concat.js',
        },
      },
    });
};
