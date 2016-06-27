goog.provide('sv.lSberVmeste.bListPage.View');

goog.require('sv.lSberVmeste.iPage.View');



/**
 * sv.lSberVmeste.bListPage.View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {sv.lSberVmeste.iPage.View}
 */
sv.lSberVmeste.bListPage.View = function(opt_params,
                                            opt_template,
                                            opt_modifier)
{
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.lSberVmeste.bListPage.View.CssClass.ROOT);

};
goog.inherits(sv.lSberVmeste.bListPage.View, sv.lSberVmeste.iPage.View);


goog.scope(function() {
    var View = sv.lSberVmeste.bListPage.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-list-page',
        TAB: 'g-tab_sber'
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dom.tabSber = this.getElementByClass(View.CssClass.TAB);
    };

    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');
    };
});  // goog.scope
