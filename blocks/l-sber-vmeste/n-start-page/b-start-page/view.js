goog.provide('sv.lSberVmeste.bStartPage.View');

goog.require('goog.dom');
goog.require('goog.dom.classlist');
goog.require('goog.soy');
goog.require('sv.lSberVmeste.iPage.View');



/**
 * sv.lSberVmeste.bStartPage.View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {sv.lSberVmeste.iPage.View}
 */
sv.lSberVmeste.bStartPage.View = function(opt_params,
    opt_template, opt_modifier)
{
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.lSberVmeste.bStartPage.View.CssClass.ROOT);

};
goog.inherits(sv.lSberVmeste.bStartPage.View, sv.lSberVmeste.iPage.View);


goog.scope(function() {
    var View = sv.lSberVmeste.bStartPage.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-page-start',
        BLOCK_START: 'b-start-block',
        USERFUNDS_PHRASE_CONTAINER: 'b-page-start__userfunds-info-phrase',
        USERFUND_BUTTON: 'b-page-start__button_userfund',
        REPORTS_BUTTON: 'b-page-start__button_reports'
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

       this.dom.startBlock = this.getElementByClass(
            View.CssClass.BLOCK_START
        );

       this.dom.userFundsPhraseContainer = this.getElementByClass(
        View.CssClass.USERFUNDS_PHRASE_CONTAINER
        );

       this.dom.userfundButton = this.getElementByClass(
        View.CssClass.USERFUND_BUTTON
        );
    };

    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

    };

     /**
     * Applies data to userfunds count phrase
     * @param {number} userfundsCount
     */
    View.prototype.printCorrectPhrase = function(
        userfundsCount) {
        var soyParams = {'data': {
            userfundsCount: userfundsCount, userfundsPhrase: true}
        };
        goog.soy.renderElement(
            this.dom.userFundsPhraseContainer,
            sv.lSberVmeste.bStartPage.Template.fundsCount,
            soyParams
        );
    };

    /**
     * Applies data to userfunds count button
     * @param {number} userfundsCount
     */
    View.prototype.printCorrectCount = function(
        userfundsCount) {
        var soyParams = {'data': {
            userfundsCount: userfundsCount, userfundsPhrase: false}
        };
        goog.soy.renderElement(
            this.dom.userfundButton,
            sv.lSberVmeste.bStartPage.Template.fundsCount,
            soyParams
        );
        this.changeUserfundButtonClass(false);
    };

    /**
     * Print content for 'manage reports' button
     */
    View.prototype.printReportsButtonContent = function() {
        goog.soy.renderElement(
            this.dom.userfundButton,
            sv.lSberVmeste.bStartPage.Template.reports
        );
        this.changeUserfundButtonClass(true);
    };

     /**
    * Change button width
    * @param {bool} change
    */
    View.prototype.changeUserfundButtonClass = function(change) {
        if (change) {
            goog.dom.classlist.add(
                this.dom.userfundButton, View.CssClass.REPORTS_BUTTON
            );
        }
        else {
            goog.dom.classlist.remove(
                this.dom.userfundButton, View.CssClass.REPORTS_BUTTON
            );
        }
    };

    /**
     * return button custom class
     * @return {bool}
     */
    View.prototype.checkUserfundButtonClass = function() {
        return goog.dom.classlist.contains(
            this.dom.userfundButton, View.CssClass.REPORTS_BUTTON
        );
    };
});  // goog.scope
