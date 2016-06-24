goog.provide('sv.lSberVmeste.bCardList.View');

goog.require('cl.iControl.View');



/**
 * Card List View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sv.lSberVmeste.bCardList.View = function(opt_params, opt_template, opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.lSberVmeste.bCardList.View.CssClass.ROOT);
};
goog.inherits(sv.lSberVmeste.bCardList.View, cl.iControl.View);


goog.scope(function() {
    var View = sv.lSberVmeste.bCardList.View;

});  // goog.scope
