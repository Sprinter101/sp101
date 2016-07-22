goog.provide('sv.lSberVmeste.iPage.View');

goog.require('cl.iControl.View');
goog.require('goog.dom');



/**
 * sv.lSberVmeste.iPage.View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sv.lSberVmeste.iPage.View = function(opt_params, opt_template, opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.lSberVmeste.iPage.View.CssClass.ROOT);
};
goog.inherits(sv.lSberVmeste.iPage.View, cl.iControl.View);


goog.scope(function() {
    var View = sv.lSberVmeste.iPage.View;
    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'i-page'
    };

});  // goog.scope
