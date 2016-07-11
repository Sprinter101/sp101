goog.provide('sv.lSberVmeste.bRegistrationPage.View');

goog.require('cl.iControl.View');



/**
 * Registration page View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sv.lSberVmeste.bRegistrationPage.View = function(opt_params, opt_template,
    opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.lSberVmeste.bRegistrationPage.View.CssClass.ROOT);
};
goog.inherits(sv.lSberVmeste.bRegistrationPage.View, cl.iControl.View);


goog.scope(function() {
    var View = sv.lSberVmeste.bRegistrationPage.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-registration-page',
        REGISTRATION_BLOCK: 'b-registration-page__registration-block'
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dom.registrationBlock = this.getElementByClass(
            View.CssClass.REGISTRATION_BLOCK,
            this.getElement()
        );
    };

    /**
    * @override
    */
    View.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');
    };

});  // goog.scope
