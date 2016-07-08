goog.provide('sv.lSberVmeste.bUserBlock.UserBlock');

goog.require('cl.iControl.Control');
goog.require('cl.iRequest.Request');
goog.require('goog.soy');
goog.require('sv.gButton.Button');
goog.require('sv.iUtils.Utils');



/**
 * User block control
 * @param {sv.lSberVmeste.bUserBlock.View} view View used to render or
 *     decorate the component; defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {cl.iControl.Control}
 */
sv.lSberVmeste.bUserBlock.UserBlock = function(
    view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

    /**
    * @type {sv.gButton.Button}
    * @private
    */
    this.button_ = null;

};
goog.inherits(sv.lSberVmeste.bUserBlock.UserBlock,
    cl.iControl.Control);

goog.scope(function() {
    var UserBlock = sv.lSberVmeste.bUserBlock.UserBlock,
        request = cl.iRequest.Request.getInstance(),
        Button = sv.gButton.Button,
        Utils = sv.iUtils.Utils;

    /**
     * User block events
     * @enum {string}
     */
    UserBlock.Event = {
        BUTTON_CLICK: 'user-block-button-click'
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
    * user block initializer
    * @param {{
    *    topic: Object,
    *    direction: Object,
    *    fund: Object
    *}} categories
    */
    UserBlock.prototype.init = function(categories) {
        //var generatedText = this.generateCategoriesText(categories);
        this.generateCategoriesText(categories);
        //this.getView().appendCategoriesText(generatedText);
    };

    /**
    * Generates text based on categories object
    * @param {{
    *    topic: Object,
    *    direction: Object,
    *    fund: Object
    *}} categories
    * @return {string}
    */
    UserBlock.prototype.generateCategoriesText = function(
        categories) {

        var topicCount = categories.topic &&
                categories.topic.length,
            directionCount = categories.direction &&
                categories.direction.length,
            fundsCount = categories.fund &&
                categories.fund.length,
            generatedString = '',
            nbsp = '\u00A0'; //no-break space
        //debugger;
        goog.soy.renderElement(this.getView().getDom().chosenCategories,
            sv.lSberVmeste.bUserBlock.Template.generateCategoriesText,
            {topicCount: topicCount, directionCount: directionCount, 
                fundsCount: fundsCount}
        );

        // if (topicCount) {
        //     var word = Utils.declensionPrint({
        //         num: topicCount,
        //         nom: 'тема',
        //         gen: 'темы',
        //         plu: 'тем'
        //     });
        //     generatedString += topicCount + nbsp + word;
        // }

        // if (directionCount) {
        //     var word = Utils.declensionPrint({
        //         num: directionCount,
        //         nom: 'направление',
        //         gen: 'направления',
        //         plu: 'направлений'
        //     });
        //     generatedString += generatedString ? ', ' : '';
        //     generatedString += directionCount + nbsp + word;
        // }

        // if (fundsCount) {
        //     var word = Utils.declensionPrint({
        //         num: fundsCount,
        //         nom: 'фонд',
        //         gen: 'фонда',
        //         plu: 'фондов'
        //     });
        //     generatedString += generatedString ? ', ' : '';
        //     generatedString += fundsCount + nbsp + word;
        // }

        //return generatedString || 'Вы не выбрали ни одной категории';
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
        this.dispatchEvent(UserBlock.Event.BUTTON_CLICK);
    };

    /**
    * Edit donations button ckick handler
    * @private
    */
    UserBlock.prototype.onEditDonationsButtonClick_ = function() {
        this.dispatchEvent(UserBlock.Event.BUTTON_CLICK);
    };

});  // goog.scope
