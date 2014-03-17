module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        mocha: {
            test: {
                src: ['tests/**/*.html'],
                options: {
                    logErrors: true
                }
            }
        },
        mocha: {
            test2: {

                // Test files
                src: ['tests/test.html'],
                options: {
                    // mocha options
//                    mocha: {
//                        ignoreLeaks: false,
//                        grep: 'food'
//                    },

                    reporter: 'Spec',

                    // Indicates whether 'mocha.run()' should be executed in
                    // 'bridge.js'
                    run: true,

                    timeout: 10000
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
//    grunt.loadNpmTasks('grunt-contrib-uglify');



    //
    grunt.loadNpmTasks('grunt-mocha');


    // Default task(s).
    grunt.registerTask('default', ['mocha']);



};