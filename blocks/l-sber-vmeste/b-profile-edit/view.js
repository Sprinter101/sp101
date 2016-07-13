goog.provide('sv.lSberVmeste.bProfileEdit.View');

goog.require('cl.iControl.View');



/**
 * Profile edit block view View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sv.lSberVmeste.bProfileEdit.View = function(opt_params, opt_template,
    opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.lSberVmeste.bProfileEdit.View.CssClass.ROOT);
};
goog.inherits(sv.lSberVmeste.bProfileEdit.View, cl.iControl.View);


goog.scope(function() {
    var View = sv.lSberVmeste.bProfileEdit.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-profile-edit',
        FIRST_NAME_INPUT: 'b-profile-edit__first-name-input',
        LAST_NAME_INPUT: 'b-profile-edit__last-name-input',
        PHONE_NUMBER_INPUT: 'b-profile-edit__phone-number-input',
        BUTTON: 'b-profile-edit__button'
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dom = {
            inputs: {
                firstName: this.getElementByClass(
                    View.CssClass.FIRST_NAME_INPUT,
                    this.getElement()).firstChild,
                lastName: this.getElementByClass(
                    View.CssClass.LAST_NAME_INPUT,
                    this.getElement()).firstChild,
                phoneNumber: this.getElementByClass(
                    View.CssClass.PHONE_NUMBER_INPUT,
                    this.getElement()).firstChild
            },
            button: this.getElementByClass(
                View.CssClass.BUTTON,
                this.getElement()).firstChild
        };
    };

});  // goog.scope
