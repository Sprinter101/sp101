goog.provide('sv.lSberVmeste.bStartPage.View');

goog.require('goog.dom');
goog.require('goog.events.EventType');
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
        USERFUNDS_COUNT_CONTAINER: 'b-page-start__userfunds-info-count'
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

       this.dom.userFundsCountContainer = this.getElementByClass(
        View.CssClass.USERFUNDS_COUNT_CONTAINER
        );
    };

    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

    };
});  // goog.scope
