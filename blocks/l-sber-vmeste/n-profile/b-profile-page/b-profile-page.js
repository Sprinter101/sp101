goog.provide('sv.lSberVmeste.bProfilePage.ProfilePage');

goog.require('cl.iControl.Control');



/**
 * Card List control
 * @param {sv.lSberVmeste.bProfilePage.View} view
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sv.lSberVmeste.bProfilePage.ProfilePage = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);
};
goog.inherits(sv.lSberVmeste.bProfilePage.ProfilePage,
    cl.iControl.Control);

goog.scope(function() {
    var ProfilePage = sv.lSberVmeste.bProfilePage.ProfilePage;

    /**
     * Events
     * @enum {string}
     */
    ProfilePage.Event = {};

});  // goog.scope
