goog.provide('sv.lSberVmeste.bHeader.View');

goog.require('cl.iControl.View');
goog.require('goog.dom');
goog.require('goog.dom.classlist');
goog.require('goog.events.EventType');
goog.require('goog.object');
goog.require('goog.soy');
goog.require('sv.iMedia.Media');
goog.require('sv.iUtils.Utils');



/**
 * sv.lSberVmeste.bHeader.View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sv.lSberVmeste.bHeader.View = function(opt_params, opt_template, opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.lSberVmeste.bHeader.View.CssClass.ROOT);
};
goog.inherits(sv.lSberVmeste.bHeader.View, cl.iControl.View);

goog.scope(function() {
    var View = sv.lSberVmeste.bHeader.View,
        Media = sv.iMedia.Media,
        HIDDEN = sv.iUtils.Utils.CssClass.HIDDEN;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-header',
        ARROW_BACK_CONTAINER: 'b-header__back-wrapper',
        HELP_PHRASE_CONTAINER: 'b-header__right-column',
        HELP_PHRASE: 'b-header__help',
        BUTTON_CONTAINER: 'b-header__button-wrapper',
        BUTTON: 'g-button_sber',
        CHOICE_PHRASE: 'b-header__choice-phrase',
        LOGO_SMALL: 'g-icon_img_logo-sber_small',
        LOGO_LARGE: 'g-icon_img_logo-sber_large'
    };

    /**
     * header types const
     * @const
     */
    View.HEADER_TYPES = [
        'b-header_profile', 'b-header_list',
        'b-header_choice', 'b-header_card'
    ];

    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
        HELP_CLICK: 'help-click'
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        var arrowBackContainer = this.getElementByClass(
            View.CssClass.ARROW_BACK_CONTAINER
        );
        this.dom.arrowBack = goog.dom.getChildren(arrowBackContainer)[0];

        this.dom.buttonContainer = this.getElementByClass(
            View.CssClass.BUTTON_CONTAINER
        );

        this.dom.button = this.getElementByClass(
            View.CssClass.BUTTON
        );

        this.dom.choicePhrase = this.getElementByClass(
            View.CssClass.CHOICE_PHRASE
        );

        this.dom.HelpPhraseContainer = this.getElementByClass(
            View.CssClass.HELP_PHRASE_CONTAINER
        );

        this.dom.help = this.getElementByClass(
            View.CssClass.HELP_PHRASE
        );

        this.checkLayout();
    };

    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler()
            .listen(
                this.dom.help,
                goog.events.EventType.CLICK,
                this.onHelpClick
            );

    };

     /**
     * check media layout
     * for donation page and sber logo
     * @protected
     */
    View.prototype.checkLayout = function() {
        var element = this.getElement();
        if (goog.dom.classlist.contains(element, 'b-header_list')) {
            if ((Media.isExtraSmall()) || (Media.isSmall())) {
                goog.dom.classlist.add(this.dom.buttonContainer, HIDDEN);
                goog.dom.classlist.remove(this.dom.choicePhrase, HIDDEN);
                goog.dom.classlist.add(this.dom.HelpPhraseContainer, HIDDEN);
            }
            else {
                goog.dom.classlist.remove(this.dom.buttonContainer, HIDDEN);
                goog.dom.classlist.add(this.dom.choicePhrase, HIDDEN);
                goog.dom.classlist.remove(this.dom.HelpPhraseContainer, HIDDEN);
            }
         }
    };

    /**
     * return button custom class
     * @return {bool}
     * @protected
     */
    View.prototype.checkButtonCustomClass = function() {
        return goog.dom.classlist.contains(
            this.dom.button, 'b-header__button_me'
        );
    };

    /**
     * render choice phrase
     * @param {string} phrase
     * @protected
     */
    View.prototype.renderCorrectTitle = function(phrase) {
        var soyParams = {
            'data': {choice_phrase: phrase}
        };
        goog.soy.renderElement(
            this.dom.choicePhrase,
            sv.lSberVmeste.bHeader.Template.title,
            soyParams
        );
    };

     /**
     * handles help phrase click
     * @param {goog.events.EventType.CLICK} event
     * @protected
     */
    View.prototype.onHelpClick = function(event) {
        var customEvent = new goog.events.Event(
            View.Event.HELP_CLICK, this
        );
        this.dispatchEvent(customEvent);
    };

});  // goog.scope
