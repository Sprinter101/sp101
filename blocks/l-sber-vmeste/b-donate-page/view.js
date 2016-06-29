goog.provide('sv.lSberVmeste.bDonatePage.View');

goog.require('goog.dom');
goog.require('goog.events.EventType');
goog.require('sv.lSberVmeste.iPage.View');



/**
 * sv.lSberVmeste.bDonatePage.View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {sv.lSberVmeste.iPage.View}
 */
sv.lSberVmeste.bDonatePage.View = function(opt_params,
    opt_template, opt_modifier)
{
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.lSberVmeste.bDonatePage.View.CssClass.ROOT);

};
goog.inherits(sv.lSberVmeste.bDonatePage.View, sv.lSberVmeste.iPage.View);


goog.scope(function() {
    var View = sv.lSberVmeste.bDonatePage.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-page-donate',
        TAB: 'g-tab_sber',
        DONATE_BLOCK_FIXED_SUM: 'b-page-donate__fixed-block',
        DONATE_BLOCK_PERCENT: 'b-page-donate__percent-block'
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dom.donationTabs = this.getElementByClass(
            View.CssClass.TAB, element
        );
        this.dom.donateBlockFixedSum = this.getElementByClass(
            View.CssClass.DONATE_BLOCK_FIXED_SUM, element
        );
        this.dom.donateBlockPercent = this.getElementByClass(
            View.CssClass.DONATE_BLOCK_PERCENT, element
        );
    };

    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

    };
});  // goog.scope
