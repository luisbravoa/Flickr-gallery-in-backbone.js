var FlickrRouter = Backbone.Router.extend({
    routes: {
        "main":                 "main",
        "photo/:id":        "photoDetail"
    },
    initialize: function(){
        var self = this;

    },
    main: function(){
        var self = this;
        console.log('main');
    },
    openModal : function(){
        var self = this;
        if($('.photoModal').hasClass('in')) return;
        $('.photoModal').modal();
        $('.photoModal').on('hide.bs.modal', function (e) {
            console.log('unbind');
            $(document).unbind('keydown');
            self.navigate('main', {trigger: true});
        });
    },
    closeModal: function(){
        var self = this;
        $('.photoModal').modal('hide');
    },
    photoDetail: function(id) {
        var self = this;
        var current = flickr.get(id);
        if(!current){
            self.closeModal();
            return;
        }
        document.title = current.get('title');
        flickr.current = flickr.indexOf(current);
        var next = flickr.next();
        var prev = flickr.prev();
        var templateData = {
            current: current.toJSON(),
            prev: (prev != null)? prev.toJSON() : null,
            next: (next != null)? next.toJSON() : null
        };
        templateData.current.src = current.src('z');
        templateData.current.url = current.url();
        var template =  '' +
            '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                '<h4 class="modal-title">{{current.title}}</h4>' +
            '</div>' +
            '<div class="modal-body">' +
                '<div class="prev">' +
                    '{{#if prev}}' +
                    '<a href="#photo/{{prev.id}}" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-chevron-left"></span></a>' +
                    '{{/if}}' +
                '</div>' +
                '<div class="detailedPhoto">' +
                    '<a href="{{current.url}}" target="_blank"><img src="{{current.src}}"></a>' +
                '</div>' +
                '<div class="next">' +
                '{{#if next}}' +
                '<a href="#photo/{{next.id}}" class="btn btn-default btn-lg"><span class="glyphicon glyphicon-chevron-right"></span></a>' +
                '{{/if}}' +
                '</div>' +
            '</div>' +
            '<div class="modal-footer">' +
                '<p>One fine body&hellip;</p>' +
            '</div>'
            ;
        var compiledTemplate = Handlebars.compile(template);
        var html = compiledTemplate(templateData);
        $(document).bind('keydown',function(e) {
            var key = e.keyCode;
            if(key == 39 && next != null){
                console.log('photo/' + next.get('id'));
                $(document).unbind('keydown');
                flickrRouter.navigate('photo/' + next.get('id'), {trigger: true});
            }
            if(key == 37 && prev != null){
                $(document).unbind('keydown');
                flickrRouter.navigate('photo/' + prev.get('id'), {trigger: true});
            }
        });
        $('.modal-content').html(html);
        self.openModal();
    }
});