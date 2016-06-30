goog.provide('sv.lSberVmeste.bCard.Card');

goog.require('cl.iControl.Control');
goog.require('sv.gButton.Button');
goog.require('sv.lSberVmeste.bCard.View');



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

    this.cardId_ = this.params.cardId;
};
goog.inherits(sv.lSberVmeste.bCard.Card, cl.iControl.Control);

goog.scope(function() {
    var Card = sv.lSberVmeste.bCard.Card;
    var View = sv.lSberVmeste.bCard.View;

    /**
     * Event enum
     * @enum {string}
     */
    Card.Event = {
        CLICK: 'card-click'
    };

    /**
    * @override
    */
    Card.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.viewListen(View.Event.CLICK, this.onCardClick_);
    };

    /**
    * Card click handler
    * @param {Event} event
    * @private
    */
    Card.prototype.onCardClick_ = function(event) {
        var customEvent = new goog.events.Event(Card.Event.CLICK, this);

        customEvent.payload = {
            cardId: this.params.cardId
        };

        this.dispatchEvent(customEvent);
    };
});  // goog.scope
