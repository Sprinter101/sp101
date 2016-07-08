goog.provide('sv.lSberVmeste.bRegistrationPage.View');

goog.require('goog.dom');
goog.require('goog.events.EventType');
goog.require('sv.lSberVmeste.iPage.View');



/**
 * sv.lSberVmeste.bRegistrationPage.View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {sv.lSberVmeste.iPage.View}
 */
sv.lSberVmeste.bRegistrationPage.View = function(opt_params,
    opt_template, opt_modifier)
{
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.lSberVmeste.bRegistrationPage.View.CssClass.ROOT);

};
goog.inherits(sv.lSberVmeste.bRegistrationPage.View, sv.lSberVmeste.iPage.View);

goog.scope(function() {
    var View = sv.lSberVmeste.bRegistrationPage.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-registration-page'
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);
    };

});  // goog.scope
