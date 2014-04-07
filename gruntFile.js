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
                src: ['tests/index.html'],
                options: {
                    reporter: 'Spec',
                    timeout: 10000
                }
            }
        },
        jshint: {
            all: [
                'public/js/collections/*.js',
                'public/js/models/*.js',
                'public/js/routers/*.js',
                'public/js/views/*.js',
                'public/js/config.js',
                'public/js/main.js'
            ]
        },
        watch: {
            files: ['public/js/**/*.js'],
            tasks: ['mocha', 'jshint']
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: 'public/js',
                    mainConfigFile: 'public/js/config.js',
                    name: 'main',
                    out: 'public/js/flickr.min.js',
                    preserveLicenseComments: false,
                    paths: {
                        requireLib: 'lib/require'
                    },
                    include: 'requireLib'
                }
            }
        }

    });
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('default', ['jshint', 'mocha', 'requirejs']);



};