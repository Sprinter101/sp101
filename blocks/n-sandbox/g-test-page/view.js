goog.provide('sv.gTestPage.View');

goog.require('cl.iControl.View');



/**
 * sv.gTestPage.View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
*/
sv.gTestPage.View = function(opt_params, 
                                            opt_template, 
                                            opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.gTestPage.View.CssClass.ROOT);
};
goog.inherits(sv.gTestPage.View, cl.iControl.View);

goog.scope(function() {
    var View = sv.gTestPage.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-test-page',
        BUTTON: 'g-button_sber',
        TAB: 'g-tab_sber',
        LIST: 'g-list_sber'
        BUTTON: 'g-button_sber'
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dom.buttons = this.getElementsByClass(View.CssClass.BUTTON);

        this.dom.tab = this.getElementByClass(View.CssClass.TAB);

        this.dom.list = this.getElementByClass(View.CssClass.LIST);
    };
});  // goog.scope
