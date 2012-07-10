
var LoginView = Backbone.View.extend({
    events: {
        'submit form.login-form': 'submitForm'
    },
    submitForm: function(evt){
        this.model.set($('form.login-form').toJSON());
        return this.model.isValid();
    },
    initialize: function(options)
    {
        this.model = new Login();
    },
    render: function()
    {
        Backbone.Validation.bind(this);
        return this;
    }
});