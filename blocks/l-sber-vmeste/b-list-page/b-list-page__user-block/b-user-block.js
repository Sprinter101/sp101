goog.provide('sv.lSberVmeste.bListPage.bUserBlock.UserBlock');

goog.require('cl.iControl.Control');
goog.require('cl.iRequest.Request');
goog.require('sv.gButton.Button');
goog.require('sv.iUtils.Utils');



/**
 * User block control
 * @param {sv.lSberVmeste.bListPage.bUserBlock.View} view View used to render or
 *     decorate the component; defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {cl.iControl.Control}
 */
sv.lSberVmeste.bListPage.bUserBlock.UserBlock = function(
    view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

    /**
    * @type {sv.gButton.Button}
    * @private
    */
    this.button_ = null;

    /**
    * @type {Array.<Object>}
    * @private
    */
    this.categoriesData_ = null;
};
goog.inherits(sv.lSberVmeste.bListPage.bUserBlock.UserBlock,
    cl.iControl.Control);

goog.scope(function() {
    var UserBlock = sv.lSberVmeste.bListPage.bUserBlock.UserBlock,
        request = cl.iRequest.Request.getInstance(),
        Button = sv.gButton.Button,
        Utils = sv.iUtils.Utils;

    /**
     * User block events
     * @enum {string}
     */
    UserBlock.Event = {

    };

    /**
     * @override
     * @param {Element} element
     */
    UserBlock.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.createFundButton();
    };

    /**
    * @override
    */
    UserBlock.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.sendUserCategoriesRequest();
    };

    /**
    * Sends ajax request to get the categories chosen by the user
    */
    UserBlock.prototype.sendUserCategoriesRequest = function() {
        request
            .send({url: 'entity/'})
            .then(
                this.createChosenCategoriesText,
                this.handleRejection,
                this);
    };

    /**
    * Ajax successful response handler
    * @param {Object} response
    */
    UserBlock.prototype.createChosenCategoriesText = function(
        response) {
        var data = response.data || [];
        this.categoriesData_ = data;

        var categories = this.createCategoriesObject(data);

        var generatedText = this.generateCategoriesString(categories);

        this.getView().appendChosenCategoriesText(generatedText);
    };

    /**
    * Ajax rejection handler
    * @param {Object} err
    */
    UserBlock.prototype.handleRejection = function(err) {
        console.log(err);
    };

    /**
    * Creates "categories" object based on "data" array from an ajax
    * response
    * @param {Array.<Object>} data
    * @return {{
    *    topic: number,
    *    direction: number,
    *    fund: number
    *}}
    */
    UserBlock.prototype.createCategoriesObject = function(data) {
        var categories = {};

        for (var i = 0; i < data.length; i++) {

            var dataType = data[i].type,
                value = categories[dataType] ?
                    +categories[dataType] : 0;

            categories[dataType] = ++value;
        }

        return categories;
    };

    /**
    * Generates text based on categories object
    * @param {{
    *    topic: number,
    *    direction: number,
    *    fund: number
    *}} categories
    * @return {string}
    */
    UserBlock.prototype.generateCategoriesString = function(
        categories) {

        var topicCount = categories.topic,
            directionCount = categories.direction,
            fundsCount = categories.fund,
            generatedString = '',
            nbsp = '\u00A0'; //no-break space

        if (topicCount) {
            var word = Utils.declensionPrint({
                num: topicCount,
                nom: 'тема',
                gen: 'темы',
                plu: 'тем'
            });
            generatedString += topicCount + nbsp + word;
        }

        if (directionCount) {
            var word = Utils.declensionPrint({
                num: directionCount,
                nom: 'направление',
                gen: 'направления',
                plu: 'направлений'
            });
            generatedString += generatedString ? ', ' : '';
            generatedString += directionCount + nbsp + word;
        }

        if (fundsCount) {
            var word = Utils.declensionPrint({
                num: fundsCount,
                nom: 'фонд',
                gen: 'фонда',
                plu: 'фондов'
            });
            generatedString += generatedString ? ', ' : '';
            generatedString += fundsCount + nbsp + word;
        }

        return generatedString || 'Вы не выбрали ни одной категории';
    };

    /**
    * Creates Fund button
    */
    UserBlock.prototype.createFundButton = function() {
        var buttonContainer = this.getView().getDom().buttonContainer;

        var buttonConfig = {
            'data': {
                'content': 'Основать фонд',
            }
        };

        this.button_ = this.renderChild('ButtonSber',
        buttonContainer, buttonConfig);

        this.getHandler().listen(
            this.button_,
            Button.Event.CLICK,
            this.onFundButtonClick_,
            false,
            this
        );
    };

    /**
    * Creates Edit donations button
    */
    UserBlock.prototype.createEditDonationsButton = function() {
        var buttonContainer = this.getView().getDom().buttonContainer;

        var buttonConfig = {
            'data': {
                'content': '350' + 'Р',
            },
            'config': {
                'buttonStyles': ['font_l']
            }
        };

        this.button_ = this.renderChild('ButtonSber',
        buttonContainer, buttonConfig);

        this.getHandler().listen(
            this.button_,
            Button.Event.CLICK,
            this.onEditDonationsButtonClick_,
            false,
            this
        );
    };

    /**
    * Fund button click handler
    * @private
    */
    UserBlock.prototype.onFundButtonClick_ = function() {
        console.log('FUND BUTTON CLICK');
    };

    /**
    * Edit donations button ckick handler
    * @private
    */
    UserBlock.prototype.onEditDonationsButtonClick_ = function() {
        console.log('EDIT DONATIONS BUTTON CLICK');
    };

});  // goog.scope
