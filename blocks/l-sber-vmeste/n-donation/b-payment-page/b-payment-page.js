goog.provide('sv.lSberVmeste.bPaymentPage.PaymentPage');

goog.require('cl.iControl.Control');
goog.require('sv.lSberVmeste.bPaymentPage.View');



/**
 * sv.lSberVmeste.bPaymentPage.PaymentPage control
 * @param {sv.lSberVmeste.bPaymentPage.View} view View used to render or
 *     decorate the component; defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {sv.lSberVmeste.iPage.Page}
 */
sv.lSberVmeste.bPaymentPage.PaymentPage = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

};
goog.inherits(sv.lSberVmeste.bPaymentPage.PaymentPage, sv.lSberVmeste.iPage.Page);