goog.provide('sv.lSberVmeste.bStartPage.View');

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
        BLOCK_START: 'b-page-start__start-block'
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
     * Simply passing through an event from view
     * @param {goog.events.Event} event
     */
    View.prototype.onStartBlockClick = function(event) {
        this.dispatchEvent(event);
    };

    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler().listen(
            this.dom.startBlock,
            View.Event.BUTTON_START_CLICK,
            this.onStartBlockClick
        );
    };
});  // goog.scope
