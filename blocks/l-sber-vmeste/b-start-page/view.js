goog.provide('sv.lSberVmeste.bStartPage.View');

goog.require('sv.lSberVmeste.iPage.View');



/**
 * sv.lSberVmeste.bStartPage.View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {sv.lSberVmeste.iPage.View}
 */
sv.lSberVmeste.bStartPage.View = function(opt_params,
    opt_template, opt_modifier)
{
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.lSberVmeste.bStartPage.View.CssClass.ROOT);
};
goog.inherits(sv.lSberVmeste.bStartPage.View, sv.lSberVmeste.iPage.View);


goog.scope(function() {
    var View = sv.lSberVmeste.bStartPage.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-start-page'
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);
    };
});  // goog.scope
