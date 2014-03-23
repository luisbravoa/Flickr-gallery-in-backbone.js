require.config({
    shim: {
        'underscore': {
            deps: ['jquery'],
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        "bootstrap": ["jquery"],
        handlebars: {
            exports: 'Handlebars'
        },
        mocha: {
            exports: 'mocha'
        },
        sinon: {
            exports: 'sinon'
        }
    },

    paths: {
        jquery: '../public/js/lib/jquery-2.1.0',
        underscore: '../public/js/lib/underscore',
        backbone: '../public/js/lib/backbone',
        handlebars: '../public/js/lib/handlebars-v1.3.0',
        bootstrap: '../public/js/lib/bootstrap.min',
        FlickrCollection: '../public/js/collections/FlickrCollection',
        PhotoModel: '../public/js/models/PhotoModel',
        PhotoCollectionView: '../public/js/views/PhotoCollectionView',
        PhotoModelView: '../public/js/views/PhotoModelView',
        FlickrRouter: '../public/js/routers/FlickrRouter'

    }
});

require(['require', 'FlickrCollection', 'PhotoModel', 'js/collection.js'], function (require, FlickrCollection, PhotoModel) {

    require([
        'js/collection.js'
    ], function (require) {
        mocha.run();
    });

});