var PhotoModelView = Backbone.View.extend({
    model: PhotoModel,
    className: 'flickr-photo',
    template: '<a href="{{url}}" target="_blank"><img class="alpha" src="images/alpha.png"></a>',
    render: function(){
        var self = this;
        self.model.view = this;
        var template = Handlebars.compile(self.template);
        var data = self.model.toJSON();
        data.src = self.model.src();
        data.url = self.model.url();
        self.$el.css('background-image', 'url("' + data.src + '")')
        this.$el.html(template(data));
        return this;
    }
});