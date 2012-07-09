var PromoPopupView = Backbone.View.extend({
    el: $('#create-dlg'),
    events:{
        'submit #promotionBizSearch':'onSearch',
        'click #btn-next':'goToNextTab',
        'click #btn-prev':'goToPrevTab',
        'click .nav-pills a':'goToPrevTab',
        'shown a[data-toggle="tab"]':'onTabShow'
    },
    onTabLink:function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
    },
    onSearch:function (e) {
        e.preventDefault();
        $(this).addClass('disabled');
        var d = {data:{term:$('#term').val(), location:$('#location').val()}};
        this.businesses.search(d);
    },
    onLoadMore:function (loadMoreOptions) {
        this.businesses.search(loadMoreOptions);
    },
    onGridSelect:function (args) {
        this.selectedModel = args.model;
        $(args.targetRow).find('.radio').attr('checked', 'checked');
        $('#create-dlg li.active').next().find('a').tab('show');

        this.selectedBusinessView = new SelectedBusinessView({model:this.selectedModel}).render();
    },
    show:function (evt) {
        $('#create-dlg').modal({backdrop:'static'});
    },
    goToNextTab:function (evt) {
        evt.preventDefault();

        if ($('#edit').hasClass('active')) {
            $('form.promo').ajaxSubmit({target: 'myResultsDiv'});
        } else {
            $('#create-dlg li.active').next().find('a').tab('show');
        }
    },
    goToPrevTab:function (evt) {
        evt.preventDefault();
        $('#create-dlg li.active').prev().find('a').tab('show');
    },
    onTabShow:function (evt) {
        if ($('#edit').hasClass('active')) {
            $('#btn-prev').removeClass('hide');
            $('#btn-next').removeClass('hide');
        }
        else {
            $('#btn-prev').addClass('hide');
            $('#btn-next').addClass('hide');
        }
    },
    onSubmitForm:function (evt) {
        evt.preventDefault();
    },
    initialize:function (options) {
        this.businesses = new Businesses();
        this.selectedModel = null;
        this.selectedBusinessView = null;
        this.listTemplate = '<strong>{{ name }}</strong> - {{ location.address }}, {{ location.city }}, {{ location.state_code }}';
        this.actionTemplate = '<input type="radio" name="selectedBusiness" class="radio business-radio" />';
        this.loadMoreTemplate = '<button class="btn btn-large btn-inverse load-more">Load More</button>';
        this.columns = [
            {title:'Results', template:this.listTemplate},
            {title:'', template:this.actionTemplate}
        ];
        this.grid = new GridView({el:$('#businessSearchGrid'), model:this.businesses, columns:this.columns,
            footer:{ template:this.loadMoreTemplate }});

        // handle model events
        this.businesses.on('loadmore', this.onLoadMore, this);
        this.grid.on('grid:selected', this.onGridSelect, this);

        $('form.promo').ajaxForm();

        // add validation
        Backbone.Validation.bind(this);
    }
});

var SelectedBusinessView = Backbone.View.extend({
    el: $('.selected-business'),
    initialize: function(opts) {
        this.template = _.template($('#selectedModelTemplate').html());
    },
    render: function() {
        $(this.el).html(this.template(this.model.toJSON()));
        $('#businessId').val(this.model.get('id'));
        return this;
    }
});