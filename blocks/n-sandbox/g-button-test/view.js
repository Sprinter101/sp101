goog.provide('sv.gButtonsTest.View');

goog.require('cl.iControl.View');



/**
 * sv.gButtonsTest.View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
*/
sv.gButtonsTest.View = function(opt_params, 
                                            opt_template, 
                                            opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.gButtonsTest.View.CssClass.ROOT);
};
goog.inherits(sv.gButtonsTest.View, cl.iControl.View);

goog.scope(function() {
    var View = sv.gButtonsTest.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-buttons-test',
        BUTTON: 'g-button_sber'
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dom.buttons = this.getElementsByClass(View.CssClass.BUTTON);
    };
});  // goog.scope
