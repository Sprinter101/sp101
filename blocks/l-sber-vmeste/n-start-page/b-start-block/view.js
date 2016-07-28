goog.provide('sv.lSberVmeste.bStartBlock.View');

goog.require('cl.iControl.View');
goog.require('goog.dom');
goog.require('goog.dom.classlist');
goog.require('goog.soy');



/**
 * sv.lSberVmeste.bStartBlock.View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {'cl.iControl.View'}
 */
sv.lSberVmeste.bStartBlock.View = function(opt_params,
    opt_template, opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.lSberVmeste.bStartBlock.View.CssClass.ROOT);
};
goog.inherits(sv.lSberVmeste.bStartBlock.View, cl.iControl.View);


goog.scope(function() {
    var View = sv.lSberVmeste.bStartBlock.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-start-block',
        BUTTON_CONTAINER: 'b-start-block__button-wrapper',
        BUTTON: 'g-button_sber',
        LOGO_CONTAINER: 'b-start-block__logo-wrapper',
        TITLE_CONTAINER: 'b-start-block__title-wrapper',
        MANAGE_BUTTON: 'b-start-block__button_manage',
        WIDE_BUTTON: 'g-button_wide'
    };

    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
        START_BLOCK_BUTTON_CLICK: 'start-block-button-click'
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dom.logoContainer = this.getElementByClass(
            View.CssClass.LOGO_CONTAINER
        );

         this.dom.titleContainer = this.getElementByClass(
            View.CssClass.TITLE_CONTAINER
        );

        this.dom.buttonContainer = this.getElementByClass(
            View.CssClass.BUTTON_CONTAINER
        );
    };

    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

    };

    /**
     * Render correct userfund logo
     * @param {bool} loggedIn
     */
    View.prototype.renderUserfundLogo = function(loggedIn) {
        var soyParams = {'data': {'loggedIn': loggedIn} };
        goog.soy.renderElement(
            this.dom.logoContainer,
            sv.lSberVmeste.bStartBlock.Template.logo,
            soyParams,
            {'factory': 'sber'}
        );
    };

    /**
     * render correct userfund title
     * @param {bool} loggedIn
     * @param {string} firstName
     * @param {string} lastName
     * @public
     */
    View.prototype.renderUserfundTitle = function(loggedIn,
        firstName, lastName) {
        var soyParams = {'data': { 'loggedIn': loggedIn,
            'firstName': firstName, 'lastName': lastName}
        };
        goog.soy.renderElement(
            this.dom.titleContainer,
            sv.lSberVmeste.bStartBlock.Template.titleText,
            soyParams,
            {'factory': 'sber'}
        );
    };

    /**
     * render correct icon as userfund logo
     * @param {bool} draft
     */
    View.prototype.renderStartButton = function(draft) {
        var soyParams = {'draft': draft};
        goog.soy.renderElement(
            this.dom.buttonContainer,
            sv.lSberVmeste.bStartBlock.Template.button,
            soyParams,
            {'factory': 'sber'}
        );
        this.dom.button = this.getElementByClass(
            View.CssClass.BUTTON
        );
        this.changeButtonClass_(draft);
        this.getHandler()
            .listen(
                this.dom.button,
                goog.events.EventType.CLICK,
                this.onButtonClick_
            );
    };

     /**
    * Change button custom class
    * @param {bool} draft
    * @private
    */
    View.prototype.changeButtonClass_ = function(draft) {
        if (!draft) {
            goog.dom.classlist.add(
                this.dom.button, View.CssClass.MANAGE_BUTTON
            );
            goog.dom.classlist.add(
                this.dom.button, View.CssClass.WIDE_BUTTON
            );
        }
        else {
            goog.dom.classlist.remove(
                this.dom.button, View.CssClass.MANAGE_BUTTON
            );
            goog.dom.classlist.remove(
                this.dom.button, View.CssClass.WIDE_BUTTON
            );
        }
    };

    /**
     * return button custom class
     * @return {bool}
     */
    View.prototype.checkStartButtonClass = function() {
        return goog.dom.classlist.contains(
            this.dom.button, View.CssClass.MANAGE_BUTTON
        );
    };

     /**
     * handles button click
     * @param {goog.events.EventType.CLICK} event
     * @private
     */
    View.prototype.onButtonClick_ = function(event) {
        var customEvent = new goog.events.Event(
            View.Event.START_BLOCK_BUTTON_CLICK, this
        );
        this.dispatchEvent(customEvent);
    };

});  // goog.scope
