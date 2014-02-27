var PhotoModel = Backbone.Model.extend({
    src: function(){
        var self = this;
        return 'http://farm' + self.get('farm') + '.static.flickr.com/' + self.get('server') + '/' + self.get('id') + '_' + self.get('secret') + '_m.jpg';
    },
    url: function(){
        var self = this;
        return 'http://farm' + self.get('farm') + '.static.flickr.com/' + self.get('server') + '/' + self.get('id') + '_' + self.get('secret') + '_b.jpg';
    }
});
