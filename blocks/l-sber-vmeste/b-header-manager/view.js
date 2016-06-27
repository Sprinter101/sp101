goog.provide('sv.lSberVmeste.bHeaderManager.View');

goog.require('cl.iControl.View');
goog.require('sv.lSberVmeste.bHeader.View');



/**
 * sv.lSberVmeste.bHeaderManager.View
 * @param {Object=} opt_params
 * @param {Function=} opt_temp - template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sv.lSberVmeste.bHeaderManager.View = function(opt_params, 
    opt_temp, opt_modifier)
{
    goog.base(this, opt_params, opt_temp, opt_modifier);

    this.setCssClass(sv.lSberVmeste.bHeaderManager.View.CssClass.ROOT);
};
goog.inherits(sv.lSberVmeste.bHeaderManager.View, cl.iControl.View);


goog.scope(function() {
    var View = sv.lSberVmeste.bHeaderManager.View,
        HeaderView = sv.lSberVmeste.bHeader.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-header-manager'

    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dom.header = this.getElementByClass(HeaderView.CssClass.ROOT);
    };

    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');
    };
});  // goog.scope
