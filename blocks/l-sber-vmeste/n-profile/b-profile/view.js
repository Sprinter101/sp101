goog.provide('sv.lSberVmeste.bProfile.View');

goog.require('cl.iControl.View');



/**
 * Card List View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sv.lSberVmeste.bProfile.View = function(opt_params, opt_template,
    opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.lSberVmeste.bProfile.View.CssClass.ROOT);
};
goog.inherits(sv.lSberVmeste.bProfile.View, cl.iControl.View);


goog.scope(function() {
    var View = sv.lSberVmeste.bProfile.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-profile'
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);
    };

});  // goog.scope
