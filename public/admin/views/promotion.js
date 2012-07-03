var PromotionView = Backbone.View.extend({
    events: {
        'click .add-button': 'addDialog'
    },

    addDialog: function(evt){
        console.log('add dialog show');
    }
});

var PromotionEditDialog = Backbone.View.extend({
    events: {
        'click .create-dlg-btn': 'showDialog'
    },
    showDialog: function(evt){
    }
});