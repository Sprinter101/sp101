goog.provide('sv.lSberVmeste.bCard.Card');

goog.require('cl.iControl.Control');



/**
 * @param {sv.lSberVmeste.bCard.View} view View used to render or
 *     decorate the component; defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {cl.iControl.Control}
 */
sv.lSberVmeste.bCard.Card = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

};
goog.inherits(sv.lSberVmeste.bCard.Card, cl.iControl.Control);

goog.scope(function() {
    var Card = sv.lSberVmeste.bCard.Card;

    /**
    * @override
    * @param {Element} element
    */
    Card.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);
    };

    /**
    * @override
    */
    Card.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');
    };
});