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
        SELECTED_CARDS_PRESENT: 'card-list-user-choice-present',
        CARD_CLICK: 'card-list-card-click',
        CARDS_LOADED: 'card-list-cards-loaded'
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
    * Ajax successful response handler
    * @param {Object} response
    */
    CardList.prototype.handleResponse = function(response) {
        this.renderCards(response.data);
    };

    /**
    * Ajax rejection handler
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

        for (var i = 0; i < cards.length; i++) {

            var card = cards[i];

            if (/*card.isSelected*/true) {
                this.dispatchEvent(
                    CardList.Event.SELECTED_CARDS_PRESENT
                );
            }

            var cardParams = {
                data: {
                    logoSrc: 'http://lorempixel.com/79/87/?hash' +
                        i + card.type,
                    title: card.title
                },
                cardId: card.id
            };

            var cardInstance = this.renderChild(
                'Card',
                domCardsBlock,
                cardParams
            );

            this.cards_.push(cardInstance);

            this.getHandler().listen(
                cardInstance,
                Card.Event.CLICK,
                this.onCardClick_,
                null,
                this
            );

            if (i + 1 === cards.length) {
                this.dispatchEvent(CardList.Event.CARDS_LOADED);
            }
        }

        if (cards.length % 2 === 0) {
            this.getView().addEvenCardsNumberClass();
        }

    };

    /**
     * Card click handler
     * @param {Object} event
     * @private
     */
    CardList.prototype.onCardClick_ = function(event) {
        this.dispatchEvent({
            type: CardList.Event.CARD_CLICK,
            cardId: event.payload.cardId
        });
    };

});  // goog.scope
