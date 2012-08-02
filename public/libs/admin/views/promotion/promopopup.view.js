var PromoPopupView = Backbone.View.extend({
    el:$('#create-dlg'),
    events:{
        'submit #promotionBizSearch':'onSearch',
        'show a[data-toggle="tab"]':'onTabShow',
        'click #btn-next':'goToNextTab',
        'click #btn-prev':'goToPrevTab',
        'click .nav-pills a':'goToPrevTab'
    },
    onModalHide:function (e) {
        this.selectedModel = null;
        document.getElementById('promoForm').reset();
        this.businesses.reset();
        $('#create-dlg li.active').prev().find('a').tab('show');
        if(this.selectedBusinessView)
            this.selectedBusinessView.reset();
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
        this.model = new Promotion();
        this.render();
        $('#create-dlg').modal({backdrop:'static'});
    },
    goToNextTab:function (evt) {
        evt.preventDefault();
        if ($('#edit').hasClass('active')) {
            this.model.save($('form.promo').toJSON(), {
                success:function (response) {
                    $('#create-dlg').modal('hide');
                }, error:function (error) {

                }});
        }
    },
    goToPrevTab:function (evt) {
        evt.preventDefault();
        $('#create-dlg li.active').prev().find('a').tab('show');
    },
    onTabShow:function (evt) {
        if ($('#edit').hasClass('active')) {
            $('#btn-prev').addClass('hide');
            $('#btn-next').addClass('hide');
        }
        else {
            if (!this.selectedModel) {
                return false;
            }
            $('#btn-prev').removeClass('hide');
            $('#btn-next').removeClass('hide');
        }
    },
    initialize:function (options) {
        options = options || {};
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
        $('#create-dlg').on('hide', _.bind(this.onModalHide, this));
        this.grid.on('grid:selected', this.onGridSelect, this);
        //this.modelBinder = (options.modelBinder) || new Backbone.ModelBinder();

    },
    render:function () {
        //this.modelBinder.bind(this.model, $('form.promo'));
        Backbone.Validation.bind(this, {forceUpdate: false});
        return this;
    }
});

var SelectedBusinessView = Backbone.View.extend({
    el:$('.selected-business'),
    initialize:function (opts) {
        this.template = _.template($('#selectedModelTemplate').html());
    },
    reset: function() { $(this.el).html(''); },
    render:function () {
        $(this.el).html(this.template(this.model.toJSON()));
        $('#businessId').val(this.model.get('id'));
        return this;
    }
});