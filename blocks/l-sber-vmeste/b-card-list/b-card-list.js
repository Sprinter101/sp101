goog.provide('sv.lSberVmeste.bCardList.CardList');

goog.require('cl.iControl.Control');
goog.require('cl.iRequest.Request');
goog.require('sv.lSberVmeste.bCard.Card');



/**
 * Card List control
 * @param {sv.lSberVmeste.bCardList.View} view View used to render or
 *     decorate the component; defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {cl.iControl.Control}
 */
sv.lSberVmeste.bCardList.CardList = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

    /**
    * @type {string}
    * @private
    */
    this.cardsType_ = this.params.cardsType || null;

    /**
    * @type {Array}
    * @private
    */
    this.cards_ = [];
};
goog.inherits(sv.lSberVmeste.bCardList.CardList, cl.iControl.Control);

goog.scope(function() {
    var CardList = sv.lSberVmeste.bCardList.CardList,
        request = cl.iRequest.Request.getInstance(),
        Card = sv.lSberVmeste.bCard.Card;

    /**
     * Card list events
     * @enum {string}
     */
    CardList.Event = {
        USER_CHOICE_PRESENT: 'user-choice-present'
    };

    /**
     * @override
     * @param {Element} element
     */
    CardList.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        request
            .send({url: 'entity/' + this.cardsType_})
            .then(this.handleResponse,
                this.handleRejection,
                this);
    };

    /**
    * Ajax response handler
    * @param {Object} response
    */
    CardList.prototype.handleResponse = function(response) {
        this.renderCards(response.data);
    };

    /**
    * Ajax response handler
    * @param {Object} err
    */
    CardList.prototype.handleRejection = function(err) {
        console.log(err);
    };

    /**
     * cards renderer
     * @param {Array} cards
     */
    CardList.prototype.renderCards = function(cards) {
        var domCardsBlock = this.getView().getDom().cardsBlock;
        console.log(cards);

        for (var i = 0; i < cards.length; i++) {

            var card = cards[i];

            cardParams = {
                data: {
                    logoSrc: 'http://lorempixel.com/79/87/?hash' +
                        i + card.type,
                    title: card.title
                }
            };

            this.cards_.push(this.renderChild(
                'Card',
                domCardsBlock,
                cardParams
            ));
        }

        for (var i = 0; i < this.cards_.length; i++) {

            var card = this.cards_[i];

            goog.events.listen(
                card,
                Card.Event.CLICK,
                this.onCardClick_.bind(this, i)
            );
        }
    };

    /**
     * @param {number} cardId
     * @private
     */
    CardList.prototype.onCardClick_ = function(cardId) {
        this.dispatchEvent(CardList.Event.USER_CHOICE_PRESENT);
    };

    /**
    * Checks if the list has at least one card, chosen by the user
    */
    CardList.prototype.hasChosenCards = function() {
        this.dispatchEvent(CardList.Event.USER_CHOICE_PRESENT);
    };

});  // goog.scope
