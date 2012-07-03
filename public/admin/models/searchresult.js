var BusinessSearchResult = Backbone.Model.extend({
    url: '/admin/api/businesses/search',
    initialize: function(){
        this.businesses = new Businesses();
    }
});