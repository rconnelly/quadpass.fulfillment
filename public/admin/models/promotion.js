var Promotion = Backbone.Model.extend({
});

var Promotions = Backbone.Collection.extend({
    model: Promotion,
    url: '/admin/api/promotions'
});