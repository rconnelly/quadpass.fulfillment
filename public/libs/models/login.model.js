var Login = Backbone.Model.extend({
    initialize:function () {
    },
    defaults: {
        _csrf: $('#_csrf').val()
    },
    validation:{
        login:{
            required:true,
            msg:'Email is required'
        },
        password:{
            required:true,
            msg:'Password is required'
        }
    }
});