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

                // Test files
                src: ['tests/test.html'],
                options: {
                    reporter: 'Spec',
                    timeout: 10000
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-mocha');


    grunt.registerTask('default', ['mocha']);



};