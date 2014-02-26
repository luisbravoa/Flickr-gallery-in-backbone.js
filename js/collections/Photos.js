var FlickrCollection = Backbone.Collection.extend({
    initialize: function(){
        var self = this;
        $(function(){
            $(self.container).html('<div class="loader"><img src="' + self.loaderImage + '"></div>');
        });
        self.view = new PhotoCollectionView({collection: self});
        self.fetchPhotos('suicidegirls', 1);
    },
    container:  "#flickr-container",
    perPage:     100,
    api_key:    "8e8b0a8d39a7af07485e7b992084a350",
    base_url: "http://api.flickr.com/services/rest/",
    loaderImage: "images/loader.gif",
    headerTitle : 'Photos',
    getRequestData: function(search, page, successCallback, errorCallback){
        var self = this;
        var data = {
            api_key: self.api_key,
            per_page: self.perPage,
            format: 'json',
            nojsoncallback: 1,
            page:(page != null && page > 0)? page : 1,
            method: (search != null && search.length > 0)? 'flickr.photos.search' : 'flickr.photos.getRecent'
        };
        if((search != null && search.length > 0)){
            data.text = search;
        }
        $.ajax({
            url: self.base_url,
            data: data,
            success: function(res){
                self.reset();
                self.add(res.photos.photo);
                self.page = res.photos.page;
                self.pages = res.photos.pages;
                self.total = res.photos.total;
                self.search = search;

                if(successCallback) successCallback();
            },
            error: function(jqXHR, textStatus){
                if(errorCallback) errorCallback(jqXHR, textStatus);
            }
        });
    },
    fetchPhotos: function(search, page){
        var self = this;
        self.view.startLoader();
        function success(){
            self.view.render();
            $(self.container).append(self.view.$el);
        }
        self.getRequestData(search, page, success);
    }

});