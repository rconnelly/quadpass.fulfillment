var Promotion = Backbone.Model.extend({
    validation: {
        name: {
            required: true,
            msg: 'Name is required'
        }
    }
});

var Promotions = Backbone.Collection.extend({
    model: Promotion,
    url: '/admin/api/promotions'
});