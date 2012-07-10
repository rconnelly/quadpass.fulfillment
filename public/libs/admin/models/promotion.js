var Promotion = Backbone.Model.extend({
    validation: {
        name: {
            required: true,
            msg: 'Name is required'
        },
        businessId: {
            required: true,
            msg: 'Selected business required'
        },
        promoId: { required: true,
        msg: 'Id is required' }
    },
    defaults: {
        _csrf: $('#_csrf').val(),
        name: '',
        businessId: '',
        promoId: ''
    },
    urlRoot: function() { return '/admin/api/promotions'; }
});

var Promotions = Backbone.Collection.extend({
    model: Promotion,
    url: '/admin/api/promotions'
});