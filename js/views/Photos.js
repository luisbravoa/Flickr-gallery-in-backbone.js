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
        '<div class="row">' +
            '<div class="col-md-6">' +
                '<h1>Photos</h1>' +
            '</div>' +
        '</div>' +
        '<div class="row">' +
            '<div class="col-md-6">' +
                '<h2>{{#if search}}Results for {{search}}{{else}}Most recent photos{{/if}}</h2>' +
            '</div>' +
        '</div>' +
            '' +
            '' +
        '<div class="row">' +
            '<div class="col-md-3">' +
                '<form class="form-inline" role="form">' +
                    '<div class="form-group">' +
                        '<label class="sr-only" for="flickr-search">Email address</label>' +
                        '<input class="form-control" id="flickr-search" placeholder="search"  value="{{search}}">' +
                    '</div>' +
                '<div class="form-group">' +
                    '<button type="button" class="btn btn-default" id="flickr-search-button">Search</button>' +
                '</div>' +
        '</div>' +
        '<div class="row">' +
            '<div class="col-md-4">' +
                '<div class="pages"></div>' +
            '</div>' +
            '<div class="col-md-4">' +
                '<p class="pages-of-pages">Page {{page}} of {{pages}}</p>' +
            '</div>' +
        '</div>' +
            '<div class="flickr-photos"></div>'
    ,
    paginator: function(){
        var self = this;
        var collection = self.collection;
        var currentPage = collection.page;
        var totalPages = collection.pages;
        var html = '';

        if(currentPage > 1){
            html += '<a class="page  btn btn-default" href="#" rel="' + (currentPage - 1) +'"><< Back</a>';
        }

            for(var i=1;i <= totalPages;i++){
                if(i==currentPage){
                    if(currentPage==1){
                        html += '<span class="page btn btn-default disabled">'+ currentPage +'</span>';
                    }else if(currentPage==totalPages){
                        html += '<span class="page  btn btn-default disabled">' +currentPage + '</span>';
                    }else{
                        html += '<span class="page  btn btn-default disabled">'+currentPage+'</span> ';
                    }
                }else{
                    if(i >= currentPage - 4 && i < currentPage + 4 ){
                        html += '<a href="#" class="page  btn btn-default"  rel="'+i+'">'+i+'</a>';
                    }
                }
            }
        if(currentPage < totalPages){
            html += '<a class="page  btn btn-default" href="#" rel="' + (currentPage + 1) +'">Next >></a>';
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