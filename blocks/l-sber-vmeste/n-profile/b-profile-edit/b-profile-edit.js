goog.provide('sv.lSberVmeste.bProfileEdit.ProfileEdit');

goog.require('cl.iControl.Control');



/**
 * Card List control
 * @param {sv.lSberVmeste.bProfileEdit.View} view
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sv.lSberVmeste.bProfileEdit.ProfileEdit = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);
};
goog.inherits(sv.lSberVmeste.bProfileEdit.ProfileEdit,
    cl.iControl.Control);

goog.scope(function() {
    var ProfileEdit = sv.lSberVmeste.bProfileEdit.ProfileEdit;

    /**
     * Events
     * @enum {string}
     */
    ProfileEdit.Event = {};

});  // goog.scope
