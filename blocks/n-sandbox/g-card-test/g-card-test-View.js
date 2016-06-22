goog.provide('sv.gCardTest.View');

goog.require('cl.iControl.Control');



/**
 * sv.lSberVmeste.bNavPage1.View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
*/
sv.gCardTest.View = function(opt_params, 
                                            opt_template, 
                                            opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.gCardTest.View.CssClass.ROOT);
};
goog.inherits(sv.gCardTest.View, cl.iControl.View);

goog.scope(function() {
    var View = sv.gCardTest.View;

    /**
     * CssClass enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-card-test'
    };

});  // goog.scope
