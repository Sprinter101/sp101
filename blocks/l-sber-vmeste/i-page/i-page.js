goog.provide('sv.lSberVmeste.iPage.Page');

goog.require('cl.iControl.Control');
goog.require('sv.lSberVmeste.iPage.View');



/**
 * sv.lSberVmeste.iPage.Page control
 * @param {sv.lSberVmeste.iPage.View} view View used to render or
 *     decorate the component; defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {cl.iControl.Control}
 */
sv.lSberVmeste.iPage.Page = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);
};
goog.inherits(sv.lSberVmeste.iPage.Page, cl.iControl.Control);


goog.scope(function() {
    var Page = sv.lSberVmeste.iPage.Page;

});  // goog.scope
