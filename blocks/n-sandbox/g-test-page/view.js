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
        TAB: 'g-tab_sber',
<<<<<<< 0941205b2c8fa77bdef298837491f87e3d120d27
        INPUT: 'g-input_sber',
        SLIDER: 'g-slider'
=======
        INPUT: 'g-input_sber'
>>>>>>> Created a new branch for phone confirmation feature. Changed general input for more flexibility.
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dom.buttons = this.getElementsByClass(View.CssClass.BUTTON);

        this.dom.tabs = this.getElementsByClass(View.CssClass.TAB);

        this.dom.inputs = this.getElementsByClass(View.CssClass.INPUT);

        this.dom.slider = this.getElementByClass(View.CssClass.SLIDER);
    };
});  // goog.scope
