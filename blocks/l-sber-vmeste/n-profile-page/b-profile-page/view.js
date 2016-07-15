goog.provide('sv.lSberVmeste.bProfilePage.View');

goog.require('cl.iControl.View');



/**
 * Profile page View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sv.lSberVmeste.bProfilePage.View = function(opt_params, opt_template,
    opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.lSberVmeste.bProfilePage.View.CssClass.ROOT);
};
goog.inherits(sv.lSberVmeste.bProfilePage.View, cl.iControl.View);


goog.scope(function() {
    var View = sv.lSberVmeste.bProfilePage.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-profile-page',
        PROFILE_BLOCK: 'b-profile-page__profile-block'
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dom.profileBlock = this.getElementByClass(
            View.CssClass.PROFILE_BLOCK,
            element
        );
    };

});  // goog.scope
