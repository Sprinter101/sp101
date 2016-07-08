goog.provide('sv.lSberVmeste.bRegistrationPage.RegistrationPage');

goog.require('cl.iControl.Control');
goog.require('goog.dom');
goog.require('goog.events.EventType');



/**
 * sv.lSberVmeste.bRegistrationPage.RegistrationPage control
 * @param {sv.lSberVmeste.bRegistrationPage.View}
 * view View used to render or decorate the component;
 * defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper,
 * used for document interaction.
 * @constructor
 * @extends {sv.lSberVmeste.iPage.Page}
 */
sv.lSberVmeste.bRegistrationPage.RegistrationPage = function(
    view, opt_domHelper) {goog.base(this, view, opt_domHelper);

};
goog.inherits(sv.lSberVmeste.bRegistrationPage.RegistrationPage,
    sv.lSberVmeste.iPage.Page);
