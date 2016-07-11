goog.provide('sv.lSberVmeste.bPhonePage.View');

goog.require('goog.dom');
goog.require('goog.events.EventType');
goog.require('sv.lSberVmeste.iPage.View');

/**
 * sv.lSberVmeste.bPhonePage.View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {sv.lSberVmeste.iPage.View}
 */
sv.lSberVmeste.bPhonePage.View = function(opt_params,
                                          opt_template, opt_modifier)
{
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.lSberVmeste.bPhonePage.View.CssClass.ROOT);
};
goog.inherits(sv.lSberVmeste.bPhonePage.View,sv.lSberVmeste.iPage.View);

goog.scope(function() {
    var View = sv.lSberVmeste.bPhonePage.View;
    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-page-phone',
        BLOCK_PHONE: 'b-phone-block'
    };

    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dom.phoneBlock = this.getElementByClass(
            View.CssClass.BLOCK_PHONE
        );
    };

    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

    };
}); //goog.scope
