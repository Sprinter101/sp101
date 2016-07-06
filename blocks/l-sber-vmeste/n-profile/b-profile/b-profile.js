goog.provide('sv.lSberVmeste.bProfile.Profile');

goog.require('cl.iControl.Control');



/**
 * Card List control
 * @param {sv.lSberVmeste.bProfile.View} view
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sv.lSberVmeste.bProfile.Profile = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);
};
goog.inherits(sv.lSberVmeste.bProfile.Profile, cl.iControl.Control);

goog.scope(function() {
    var Profile = sv.lSberVmeste.bProfile.Profile;

    /**
     * Events
     * @enum {string}
     */
    Profile.Event = {};

});  // goog.scope
