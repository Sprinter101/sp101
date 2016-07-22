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
        BUTTON_START: 'b-start-block__button_start',
        LOGO_CONTAINER: 'b-start-block__logo-wrapper',
        TITLE_CONTAINER: 'b-start-block__title-wrapper',
        WIDE_BUTTON: 'g-button_wide'
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

        this.dom.startButton = this.getElementByClass(
            View.CssClass.BUTTON_START
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
     * @public
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
    * @param {bool} loggedIn
    * @param {bool} draft
    * @public
    */
    View.prototype.renderStartButtonContent = function(loggedIn, draft) {
        var soyParams = {'data': { 'loggedIn': loggedIn, 'draft': draft}};
        goog.soy.renderElement(
            this.dom.startButton,
            sv.lSberVmeste.bStartBlock.Template.buttonContent,
            soyParams,
            {'factory': 'sber'}
        );
        this.changeButtonWidth_(loggedIn, draft);
    };

     /**
    * Change button width
    * @param {bool} loggedIn
    * @param {bool} draft
    * @private
    */
    View.prototype.changeButtonWidth_ = function(loggedIn, draft) {
        if (loggedIn && !draft) {
            goog.dom.classlist.add(
                this.dom.startButton, View.CssClass.WIDE_BUTTON
            );
        }
        else {
            goog.dom.classlist.remove(
                this.dom.startButton, View.CssClass.WIDE_BUTTON
            );
        }
    };

    /**
     * return button custom class
     * @return {bool}
     * @public
     */
    View.prototype.checkStartButtonClass = function() {
        return goog.dom.classlist.contains(
            this.dom.startButton, View.CssClass.WIDE_BUTTON
        );
    };

});  // goog.scope
