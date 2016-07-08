goog.provide('sv.gTab.Tab');

goog.require('cl.gTab.Tab');
goog.require('cl.gTab.View');



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

};
goog.inherits(sv.gTab.Tab, cl.gTab.Tab);


goog.scope(function() {
    var Tab = cl.gTab.Tab,
        View = cl.gTab.View;

    /**
     * Event enum
     * @enum {string}
     */
    Tab.Event = {
        TAB_SELECT: View.Event.TAB_SELECT
    };
});  // goog.scope
