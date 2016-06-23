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
        //BUTTON_START: 'b-start-block__button_start',
        BLOCK_START: 'b-start-block'
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
    };

    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

    };
});  // goog.scope
