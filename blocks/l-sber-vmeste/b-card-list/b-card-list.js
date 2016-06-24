goog.provide('sv.lSberVmeste.bCardList.CardList');

goog.require('cl.iControl.Control');



/**
 * Card List control
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.Control}
 */
sv.lSberVmeste.bCardList.CardList = function(opt_params, opt_template, opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);
};
goog.inherits(sv.lSberVmeste.bCardList.CardList, cl.iControl.Control);

goog.scope(function() {
    var CardList = sv.lSberVmeste.bCardList.CardList;

});  // goog.scope
