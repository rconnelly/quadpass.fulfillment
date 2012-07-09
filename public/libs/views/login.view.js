var LoginView = Backbone.View.extend({
    events: {
        //'submit form.login-form': 'showDialog'
    },
    initialize: function(options)
    {
        Backbone.Validation.bind(this);
    },

    validation: {
        login: {
            required: true,
            msg: 'Email is required'
        }
    }
});