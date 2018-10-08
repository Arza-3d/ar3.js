module.exports = function (grunt) {
    grunt.registerTask('default', '', function(){
        grunt.log.write('test calling grunt task');
    });

    var concatTarget = 'ar3-concat.js';
    var minTarget = 'ar3.min.js';
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.initConfig({
        concat: {
            options: {
                separator: '\n\n// r3-separator\n\n',
            },
            dist: {
                src: [

                    'modular/aside-nav/ar3-aside-nav-2.js', // construct nav with override option data-headers-r3
                    'modular/aside-nav/ar3-aside-nav-4.js', // semi fixed nav + add button
                    'modular/aside-nav/ar3-aside-nav-5.js', // set r3-accordion-B

                    'modular/accordion/ar3-accordion-B-1.js', // set event for that class

                    'modular/ar3-trivial-attr.js'
                ],
                dest: concatTarget,
            },
        },

        // go to this site for converting it to ES5 first before ugliying it https://babeljs.io/
        uglify: {
            my_target: {
                files: {
                    minTarget: [concatTarget]
                }
            }
        }
    });
};
