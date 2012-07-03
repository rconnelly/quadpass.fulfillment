var Location = Backbone.Model.extend({

});

var Query = Backbone.Model.extend({
    initialize:function () {
        this.location = new Location();
    }
});

var Business = Backbone.Model.extend({
    initialize:function () {
        this.location = new Location();
    }
});

var Businesses = Backbone.QueryCollection.extend({
    model:Business,
    url:'/admin/api/businesses',
    initialize:function () {
        this.prevQuery = {term: null, location: null, page: 1, limit: 20};
    },
    search: function(options)
    {
        options.data = options.data || {};
        options.cached = true;
        options.data.limit = options.data.limit || this.prevQuery.limit;
        options.data.page = options.data.page || this.prevQuery.page;
        options.data.location = options.data.location || this.prevQuery.location;
        options.data.term = options.data.term || this.prevQuery.term;
        this.fetch(options);
        // store for later
        this.prevQuery.location = options.data.location;
        this.prevQuery.term = options.data.term;
    }
});