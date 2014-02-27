var PhotoCollectionView = Backbone.View.extend({
    collection: FlickrCollection,
    className: 'photos',
    initialize: function(){
        var self = this;
        var collection = self.collection;

        $(function(){
            $(collection.container).html('<div class="loader"><img src="' + collection.loaderImage + '"></div>');
        });
        self.render();
        self.listenTo(self.collection, "photosReady", self.render);
    },
    events: {
        "click .pages .page" : "changePage",
        "click #flickr-search-button" : "search"
    },
    search: function(){
        var self = this;
        var text = self.$el.find('#flickr-search').val();
        self.collection.fetchPhotos(text, 1);
    },
    changePage: function(e){
        e.preventDefault();
        var self = this;
        var page = e.target.rel;
        self.collection.fetchPhotos(self.collection.search, page);
    },
    template:
        '<h1>Photos</h1>' +
            '<h2>{{#if search}}Results for {{search}}{{else}}Most recent photos{{/if}}</h2>' +
            '<p>Page {{page}} of {{pages}}</p>' +
            '<input id="flickr-search" type="text" value="{{search}}">' +
            '<button id="flickr-search-button">Search</button>' +
            '<div class="pages"></div>' +
            '<div class="flickr-photos"></div>'
    ,
    paginator: function(){
        var self = this;
        var collection = self.collection;
        var currentPage = collection.page;
        var totalPages = collection.pages;
        var html = '';

        if(currentPage > 1){
            html += '<a class="page" href="#" rel="' + (currentPage - 1) +'"><< Back</a>';
        }

            for(var i=1;i <= totalPages;i++){
                if(i==currentPage){
                    if(currentPage==1){
                        html += '<span class="page">'+ currentPage +'</span>';
                    }else if(currentPage==totalPages){
                        html += '<span class="page">' +currentPage + '</span>';
                    }else{
                        html += '<span class="page">'+currentPage+'</span> ';
                    }
                }else{
                    if(i >= currentPage - 4 && i < currentPage + 4 ){
                        html += '<a href="#" class="page"  rel="'+i+'">'+i+'</a>';
                    }
                }
            }
        if(currentPage < totalPages){
            html += '<a class="page" href="#" rel="' + (currentPage + 1) +'">Next >></a>';
        }
        return html;
    },
    render: function(){
        var self = this;
        var collection = self.collection;
        var template = Handlebars.compile(self.template);
        var templateData = {
            page: collection.page,
            pages: collection.pages,
            total: collection.total,
            search: collection.search
        };
        $('.loader').remove();
        self.$el.html(template(templateData));
        self.collection.forEach(function(model){
            var photoView = new PhotoModelView({model: model});
            photoView.render();
            self.$el.find('.flickr-photos').append(photoView.el);
        }, this);
        self.$el.find('.pages').append(self.paginator());
        self.delegateEvents();
        return this;
    },
    startLoader: function(){
        var self = this;
        self.$el.find('.flickr-photos').html('<div class="loader"><img src="' + self.collection.loaderImage + '"></div>');
    }
});