goog.provide('sv.gTab.View');

goog.require('cl.gTab.View');



/**
 * Button View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.gTab.View}
 */
sv.gTab.View = function(opt_params, opt_template, opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.gTab.View.CssClass.ROOT);
};
goog.inherits(sv.gTab.View, cl.gTab.View);


goog.scope(function() {
    var View = sv.gTab.View;
});  // goog.scope