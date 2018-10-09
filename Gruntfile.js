module.exports = function (grunt) {
    grunt.registerTask('default', '', function(){
        grunt.log.write('test calling grunt task');
    });

    var concatTarget = 'ar3-concat.js';
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
                    'modular/aside-nav/ar3-aside-nav-5.js', // target element
                    'modular/short-code/ar3-short-code-2.js', // <pre><pre>
                    'modular/top-nav/ar3-top-nav.js', // tab and the box link inside it
                    'modular/tab/ar3-tab-2.js', // tab and the box link inside it

                    'modular/accordion/ar3-accordion-B-1.js', // set event for that class
                    //'modular/accordion/ar3-accordion-1.js', // target element
                    'modular/accordion/ar3-accordion-2(h3-main).js',

                    'modular/trivial/ar3-trivial-attr.js',
                    'modular/trivial/ar3-trivial-tag.js'
                ],
                dest: concatTarget,
            },
        },

        // go to this site for converting it to ES5 first before ugliying it https://babeljs.io/
        uglify: {
            my_target: {
                files: {
                    'ar3.min.js' : [concatTarget]
                }
            }
        }
    });
};
