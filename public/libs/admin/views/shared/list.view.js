var SearchResultListView = Backbone.View.extend({
    events:{
    },
    addHeader:function () {
        var header = new GridHeaderView({model:this.options.columns, propertyName:'title' });
        var th = header.render().el;
        var thead = $('<thead>').append(th);
        $(this.el).append(thead);

    },
    addOne:function (m) {
        var rowView = new GridRowView({model:model, columns:this.options.columns,
            buttonOptions:this.options.buttonOptions });
        $(this.el).append(this.template(m.toJSON()).el);
    },
    addAll:function (model_) {
        $(this.el).html('');
        this.addHeader();

        model_.each(function (m) {
            this.addOne(m);
        }, this);
    },
    render:function () {
        this.addAll(this.model);
        return this;
    },
    initialize: function(opts)
    {
        opts.model.bind('all', this.render, this);
    }
});