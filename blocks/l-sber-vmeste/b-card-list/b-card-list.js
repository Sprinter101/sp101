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
    * @type {Array}
    * @private
    */
    this.cards_ = [];

    /**
     * @type {Array}
     * @private
     */
    this.cardsCustomClasses_ = this.params.cardsCustomClasses || [];
};
goog.inherits(sv.lSberVmeste.bCardList.CardList, cl.iControl.Control);

goog.scope(function() {
    var CardList = sv.lSberVmeste.bCardList.CardList,
        Card = sv.lSberVmeste.bCard.Card;

    /**
     * Card list events
     * @enum {string}
     */
    CardList.Event = {
        SELECTED_CARDS_PRESENT: 'card-list-user-choice-present',
        CARD_CLICK: 'card-list-card-click',
        CARDS_RENDERED: 'card-list-cards-rendered'
    };

    /**
     * cards renderer
     * @param {Array} cards
     * @param {String} pageType
     */
    CardList.prototype.renderCards = function(cards, pageType) {
        var domCardsBlock = this.getView().getDom().cardsBlock;

        for (var i = 0; cards && i < cards.length; i++) {
            var card = cards[i];

            if (card.checked) {
                this.dispatchEvent(
                    CardList.Event.SELECTED_CARDS_PRESENT
                );
            }

            var cardParams = {
                data: {
                    logoSrc: card.imgUrl,
                    title: card.title,
                    places: (pageType == 'CARD') ?
                        this.parseCardType_(card.type.toString()) : ''
                },
                config: {
                    customClasses: this.cardsCustomClasses_,
                    isSelected: !!card.checked
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

        }

        this.dispatchEvent(CardList.Event.CARDS_RENDERED);
    };

    /**
     * Parser for card type
     * @param {string} type
     * @return {string}
     * @private
     */
    CardList.prototype.parseCardType_ = function(type) {
        switch (type) {
            case 'topic':
                return 'Тема';
                break;
            case 'direction':
                return 'Направление';
                break;
            case 'fund':
                return 'Фонд';
                break;
            default :
                return '';
                break;
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
