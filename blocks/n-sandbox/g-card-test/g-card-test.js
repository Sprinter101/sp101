goog.provide('sv.gCardTest.CardTest');

goog.require('cl.iControl.Control');



/**
 * @param {sv.gCardTest.View} view View used to render or
 *     decorate the component; defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {cl.iControl.Control}
 */
sv.gCardTest.CardTest = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

};
goog.inherits(sv.gCardTest.CardTest, cl.iControl.Control);

goog.scope(function() {
    var CardTest = sv.gCardTest.CardTest;

    /**
    * @override
    * @param {Element} element
    */
    CardTest.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);
    };

    /**
    * @override
    */
    CardTest.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');
    };

});  // goog.scope
