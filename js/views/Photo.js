var PhotoModelView = Backbone.View.extend({
    model: PhotoModel,
    className: 'flickr-photo',
    template: '',
    render: function(){
        var self = this;
        var item = self.model.toJSON();
        var PhotoUrl = 'http://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_m.jpg';
        var PhotoLink = 'http://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_b.jpg';
        self.model.view = this;
        self.$el.css('background-image', 'url("' + PhotoUrl + '")')

        this.$el.html('<a href="' + PhotoLink + '"><img class="alpha" src="images/alpha.png"></a>');
//        this.$el.attr('id',this.model.get('id'));

        return this;
    }
});