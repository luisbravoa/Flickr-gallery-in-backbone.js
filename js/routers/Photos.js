var FlickrRouter = Backbone.Router.extend({
    routes: {
//        "main":                 "main",    // #help
        "photo/:id":        "photoDetail"  // #search/kiwis
    },

    photoDetail: function(id) {
        console.log(id);
        var serf = this;
        var photo = flickr.get(id);
        flickr.current = flickr.indexOf(photo);
        var next = photo.next();
        var prev = photo.prev();

        console.log(flickr);
    }

});