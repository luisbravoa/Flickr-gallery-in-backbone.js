var FlickrModule = Backbone.Model.extend({
    initialize: function(){
        var self = this;
        self.fetchPhotos('suicidegirls', 1);
    },
    defaults: {
        container:  "#flicker-container",
        perPage:     100,
        api_key:    "8e8b0a8d39a7af07485e7b992084a350",
        base_url: "http://api.flickr.com/services/rest/"
    },
    getRequestData: function(search, page, successCallback, errorCallback){
        var self = this;
        var data = {
            api_key: self.get('api_key'),
            per_page: self.get('perPage'),
            format: 'json',
            nojsoncallback: 1,
            page:(page != null && page > 0)? page : 1,
            method: (search != null && search.length > 0)? 'flickr.photos.search' : 'flickr.photos.getRecent'
        };
        if((search != null && search.length > 0)){
            data.text = search;
        }
        $.ajax({
            url: self.get('base_url'),
            data: data,
            success: function(res){
//                console.log(res.photos.photo);
                self.set('photos', new PhotoCollenction(res.photos.photo));
                self.set('page', res.photos.page);
                self.set('pages', res.photos.pages);
                self.set('total', res.photos.total);
                if(successCallback) successCallback();
            },
            error: function(jqXHR, textStatus){
                if(errorCallback) errorCallback(jqXHR, textStatus);
            }
        });
    },
    fetchPhotos: function(search, page){
        var self = this;

        function success(){
//            console.log(self.toJSON());
            self.view = new PhotoCollectionView({collection: self.get('photos')});
            self.view.render();
            $(self.get('container')).append(self.view.$el);
        }

        self.getRequestData(search, page, success);
    }

});

var PhotoModel = Backbone.Model.extend({

});

var PhotoCollenction = Backbone.Collection.extend({
    model: PhotoModel
});
var PhotoCollectionView = Backbone.View.extend({
    collection: PhotoCollenction,
    className: 'photos',
    render: function(){
        var self = this;
        var width =  ((this.collection.length + 1)*275)+'px';
        console.log(self.collection);

        self.$el.append('<h1>Photos</h1>');

        self.collection.forEach(function(model){
            var photoView = new PhotoModelView({model: model});
            photoView.render();
            self.$el.append(photoView.el);
        }, this);
        return this;
    },
    refresh: function(){
        var self = this;
        self.$el.html('');
        self.render();

    }
});

var PhotoModelView = Backbone.View.extend({
    model: PhotoModel,
    className: 'flickr-photo',
    template: '',
    render: function(){
        var self = this;
        var item = self.model.toJSON();
        var PhotoUrl = 'http://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_m.jpg';
        var Photolink = 'https://www.flickr.com/photos/' + item.farm + '/' + item.server + '/' + item.id ;

        self.model.view = this;
        self.$el.css('background-image', 'url("' + PhotoUrl + '")')

        this.$el.html('<a href="' + PhotoUrl + '"><img class="alpha" src="images/alpha.png"></a>');
//        this.$el.attr('id',this.model.get('id'));

        return this;
    }
});