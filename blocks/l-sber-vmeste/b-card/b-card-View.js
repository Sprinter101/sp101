goog.provide('sv.lSberVmeste.bCard.View');

goog.require('cl.iControl.Control');



/**
 * sv.lSberVmeste.bNavPage1.View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
*/
sv.lSberVmeste.bCard.View = function(opt_params, 
                                            opt_template, 
                                            opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.lSberVmeste.bCard.View.CssClass.ROOT);

}
goog.inherits(sv.lSberVmeste.bCard.View, cl.iControl.View);

goog.scope(function() {
    var View = sv.lSberVmeste.bCard.View;

    View.CssClass = {
    	ROOT: ''
    }
});