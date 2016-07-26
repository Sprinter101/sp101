goog.provide('sv.lSberVmeste.bUserBlock.UserBlock');

goog.require('cl.iControl.Control');
goog.require('goog.object');
goog.require('sv.gButton.Button');



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
    * @type {{
    *    topic: Object,
    *    direction: Object,
    *    fund: Object
    *}}
    * @private
    */
    this.categories_ = goog.object.clone(this.params.categories);

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
        Button = sv.gButton.Button;

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

        var draft = this.params.draft;
        this.createFundButton_(draft);
    };

    /**
    * @override
    */
    UserBlock.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.createCategoriesText();
    };

    /**
    * Generates text based on categories object
    */
    UserBlock.prototype.createCategoriesText = function() {
        var categories = this.categories_;

        var topicCount = categories.topic,
            directionCount = categories.direction,
            fundsCount = categories.fund;

        var soyParams = {
            'data': {
                topicCount: topicCount,
                directionCount: directionCount,
                fundsCount: fundsCount
            }
        };

        this.getView().appendCategoriesText(soyParams);
    };

    /**
    * Creates Fund button
    * @param {bool} draft
    * @private
    */
    UserBlock.prototype.createFundButton_ = function(draft) {
        var buttonContainer = this.getView().getDom().buttonContainer;
        var content, buttonStyle;
        if (!draft) {
            content = 'Завершить редактирование';
            buttonStyles = ['width_xl'];
        }
        else {
            content = 'Основать фонд';
            buttonStyles = [];
        }
        var buttonConfig = {
            'data': {
                'content': content
            },
            config: {
                'buttonStyles': buttonStyles
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
    * Fund button click handler
    * @private
    */
    UserBlock.prototype.onFundButtonClick_ = function() {
        this.dispatchEvent(UserBlock.Event.BUTTON_CLICK);
    };

});  // goog.scope
