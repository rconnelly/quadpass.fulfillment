var GridView = Backbone.View.extend({
    events:{
        'click .load-more': 'onLoadMore',
        'click tbody td': 'onSelectRow'
    },
    //tagName: 'table',
    addHeader:function () {
        var header = new GridHeaderView({model:this.options.columns, propertyName:'title' });
        var th = header.render().el;
        var thead = $('<thead>').append(th);
        $(this.el).append(thead);

    },
    addFooter:function () {
        if(!this.options.footer)
            return;

        var footer = new GridFooterView({model:this.options.footer.model, template:this.options.footer.template,
            columnCount:this.options.columns.length});
        var td = footer.render().el;
        var thead = $('<tfoot>').append(td);
        $(this.el).append(thead);

    },
    addOne:function (model) {
        var rowView = new GridRowView({model:model, columns:this.options.columns, buttonOptions:this.options.buttonOptions });
        $(this.el).append(rowView.render().el);
    },
    addAll:function (model_) {
        $(this.el).html('');
        this.addHeader();
        this.addFooter();

        model_.each(function (m) {
            this.addOne(m);
        }, this);
    },
    onLoadMore:function (evt) {
        this.page++;
        this.model.trigger('loadmore',{data: {page: this.page}, add: true})
    },
    onSelectRow:function (evt) {
        var m = $(evt.target).data('model');
        this.trigger('grid:selected',{targetRow: $(evt.target).parent(), model: m})
    },
    showDialog:function (model_) {
    },
    render:function () {
        this.addAll(this.model);
        return this;
    },
    initialize:function (opts) {
        opts.model.bind('add', this.addOne, this);
        opts.model.bind('edit', this.showDialog, this);
        opts.model.bind('reset', this.addAll, this);
        opts.model.bind('change', this.render, this);

        this.page = 1;


        var btnDefaults = {
            editClassName:'edit-btn',
            createDialogClassName:'create-dlg-btn',
            editDialogClassName:'edit-dlg-btn',
            delClassName:'destroy-btn',
            createClassName:'create-btn',
            allClassName:'btn'
        };

        this.options.buttonOptions = $.extend(opts.buttonOptions, btnDefaults);
    }
});

var GridHeaderView = Backbone.View.extend({
    tagName:'tr',
    events:{
    },
    render:function () {
        _.each(this.model, function (col) {
            var cellView = new GridHeaderCellView({model:col, propertyName:this.options.propertyName });
            $(this.el).append(cellView.render().el);
        }, this);
        return this;
    }
});

var GridFooterView = Backbone.View.extend({
    tagName:'tr',
    events:{
    },
    render:function () {
        var td = $('<td>');
        td.attr('colspan',this.options.columnCount);
        var tpl = $(_.template(this.options.template)(this.model));
        td.append(tpl);
        $(this.el).append(td);
        return this;
    }
});

var GridRowView = Backbone.View.extend({
    tagName:'tr',
    events:{
    },
    render:function () {
        _.each(this.options.columns, function (col) {
            var cellView = new GridCellView({model:this.model, template:col.template });
            $(this.el).append(cellView.render().el);
        }, this);
        return this;
    }
});

var GridCellView = Backbone.View.extend({
    tagName:'td',
    events:{
    },
    render:function () {
        $(this.el).html(this.text(this.options.template));
        $(this.el).data('model',this.model);
        return this;
    },
    text:function (tpl) {
        return _.template(tpl)(this.model.toJSON());
    }
});

var GridHeaderCellView = Backbone.View.extend({
    tagName:'th',
    events:{
    },
    render:function () {
        $(this.el).html(this.text(this.options.propertyName));
        return this;
    },
    text:function (propertyName) {
        return this.model[propertyName];
    }
});

