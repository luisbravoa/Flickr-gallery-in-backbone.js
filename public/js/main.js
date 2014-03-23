define(
    [
        'jquery',
        'underscore',
        'backbone',
        'handlebars',
        'collections/FlickrCollection',
        'models/PhotoModel',
        'views/PhotoCollectionView',
        'views/PhotoModelView',
        'routers/FlickrRouter',
        'bootstrap'
    ]
    , function($, _, Backbone, Handlebars, FlickrCollection, PhotoModel, PhotoCollectionView, PhotoModelView, FlickrRouter) {
//    var flickrCollection = new FlickrCollection(null, {api_key: '8e8b0a8d39a7af07485e7b992084a350', container: "#flickr-container"});
//    // create view
//    flickrView = new PhotoCollectionView({collection: flickrCollection});
//    // get photos
//    flickrCollection.fetch(null, 1);
    var flickrRouter = new FlickrRouter();
    Backbone.history.start();
});