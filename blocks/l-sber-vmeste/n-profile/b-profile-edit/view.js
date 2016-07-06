goog.provide('sv.lSberVmeste.bProfileEdit.View');

goog.require('cl.iControl.View');



/**
 * Card List View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sv.lSberVmeste.bProfileEdit.View = function(opt_params, opt_template,
    opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.lSberVmeste.bProfileEdit.View.CssClass.ROOT);
};
goog.inherits(sv.lSberVmeste.bProfileEdit.View, cl.iControl.View);


goog.scope(function() {
    var View = sv.lSberVmeste.bProfileEdit.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-profile-edit'
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);
    };

});  // goog.scope
