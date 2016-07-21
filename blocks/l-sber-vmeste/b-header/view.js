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
        LOGOUT_PHRASE: 'b-header__help_logout',
        BUTTON_CONTAINER: 'b-header__button-wrapper',
        BUTTON: 'g-button_sber',
        CHOICE_PHRASE: 'b-header__choice-phrase',
        ME_BUTTON: 'b-header__button_me',
        CLOSE_BUTTON: 'b-header__button_close'
    };

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

        this.dom.choicePhrase = this.getElementByClass(
            View.CssClass.CHOICE_PHRASE
        );

        this.dom.HelpPhraseContainer = this.getElementByClass(
            View.CssClass.HELP_PHRASE_CONTAINER
        );

        this.checkLayout();
    };

    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

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
     * check if button has 'me' class
     * @return {bool}
     * @protected
     */
    View.prototype.checkButtonCustomClass = function() {
        return goog.dom.classlist.contains(
            this.dom.button, View.CssClass.ME_BUTTON
        );
    };

    /**
     * check if help has 'logout' class
     * @return {bool}
     * @protected
     */
    View.prototype.checkHelpClass = function() {
        return goog.dom.classlist.contains(
            this.dom.help, View.CssClass.LOGOUT_PHRASE
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
     * render help phrase
     * @param {string} help_phrase
     * @protected
     */
    View.prototype.renderCorrectHelp = function(help_phrase) {
        var soyParams = {'help_phrase': help_phrase};
        goog.soy.renderElement(
            this.dom.HelpPhraseContainer,
            sv.lSberVmeste.bHeader.Template.help,
            soyParams
        );

        this.dom.help = this.getElementByClass(
            View.CssClass.HELP_PHRASE
        );
        this.getHandler()
            .listen(
                this.dom.help,
                goog.events.EventType.CLICK,
                this.onHelpClick
            );
    };

    /**
     * render correct button
     * @param {string} content
     * @protected
     */
    View.prototype.renderButton = function(content) {
        var soyParams = {'roundButton': content};
        goog.soy.renderElement(
            this.dom.buttonContainer,
            sv.lSberVmeste.bHeader.Template.button,
            soyParams,
            {'factory': 'sber'}
        );
        this.dom.button = this.getElementByClass(
            View.CssClass.BUTTON
        );
        this.changeButtonClass(content);
    };

    /**
    * Change button class
    * @param {string} content
    * @protected
    */
    View.prototype.changeButtonClass = function(content) {
        if (content === 'x') {
            goog.dom.classlist.add(
                this.dom.button, View.CssClass.CLOSE_BUTTON
            );
            goog.dom.classlist.remove(
                 this.dom.button, View.CssClass.ME_BUTTON
            );
        }
        else {
                goog.dom.classlist.add(
                this.dom.button, View.CssClass.ME_BUTTON
            );
                goog.dom.classlist.remove(
                this.dom.button, View.CssClass.CLOSE_BUTTON
            );
        }
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
