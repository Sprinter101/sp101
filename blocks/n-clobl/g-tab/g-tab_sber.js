goog.provide('sv.gTab.Tab');

goog.require('cl.gTab.Tab');
goog.require('sv.gTab.View');



/**
 * Tab control
 * @param {Object} view
 * @param {Object=} opt_params
 * @param {Object=} opt_domHelper
 * @constructor
 * @extends {cl.gTab.Tab}
 */
sv.gTab.Tab = function(view, opt_params, opt_domHelper) {
    goog.base(this, view, opt_params, opt_domHelper);

    this.setAllowTextSelection(false);
};
goog.inherits(sv.gTab.Tab, cl.gTab.Tab);


goog.scope(function() {
    var Tab = sv.gTab.Tab,
        View = sv.gTab.View;
});  // goog.scope
