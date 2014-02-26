
var PhotoCollectionView = Backbone.View.extend({
    collection: FlickrCollection,
    className: 'photos',
    template:
        '<h1>Photos</h1>' +
            '<h2>Results for {{search}}</h2>' +
            '<p>Page {{page}} of {{total}}</p>' +
            '<input id="flickr-search" type="text">' +
            '<button id="flickr-search-button">Search</button>' +
            '<div class="flickr-photos"></div>'
    ,
    render: function(){
        var self = this;
        var collection = self.collection;
        var template = Handlebars.compile(self.template);
        var templateData = {
            page: collection.page,
            total: collection.total,
            search: collection.search
        };
        $('.loader').remove();

        self.$el.html(template(templateData));

        self.$el.find('#flickr-search-button').on('click', function(){
            var text = self.$el.find('#flickr-search').val();
            collection.fetchPhotos(text, 1);
        });
        self.collection.forEach(function(model){
            var photoView = new PhotoModelView({model: model});
            photoView.render();
            self.$el.find('.flickr-photos').append(photoView.el);
        }, this);
        return this;
    },
    refresh: function(){
        var self = this;
        self.$el.html('');
        self.render();
    },
    startLoader: function(){
        var self = this;
        self.$el.find('.flickr-photos').html('<div class="loader"><img src="' + self.collection.loaderImage + '"></div>');
    }
});