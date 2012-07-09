var PromotionView = Backbone.View.extend({
    events: {
        'click .create-dlg-btn': 'showDialog'
    },

    showDialog: function(evt){
        this.popup.show();
    },

    initialize: function(options)
    {
        // handle events

        this.promotions = new Promotions();
        this.cols = [{title:'Name', template:'{{ name }}'}, {title:'Id', template:'{{ locationId }}'}];
        this.grid = new GridView({el: $('#promotionGrid'), model:this.promotions, columns:this.cols});
        this.promotions.fetch();
        this.popup = new PromoPopupView();
    }
});