goog.provide('sv.gTab.Tab');

goog.require('cl.gTab.Tab');
goog.require('sv.gTab.View');



/**
 * Tab control
 * @param {sv.gTab.View} view View used to render or
 *     decorate the component; defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 * @constructor
 * @extends {cl.gTab.Tab}
 */
sv.gTab.Tab = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

    this.setAllowTextSelection(false);
};
goog.inherits(sv.gTab.Tab, cl.gTab.Tab);


goog.scope(function() {
    var Tab = sv.gTab.Tab,
        View = sv.gTab.View;

    /**
     * Event enum
     * @enum {string}
     */
    Tab.Event = {
        TAB_SELECT: View.Event.TAB_SELECT
    };

});  // goog.scope
