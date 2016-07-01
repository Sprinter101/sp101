goog.provide('sv.lSberVmeste.bStartBlock.View');

goog.require('cl.iControl.View');
goog.require('goog.dom');
goog.require('goog.events.EventType');



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
        BUTTON_START: 'b-start-block__button_start'
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

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
});  // goog.scope
