goog.provide('sv.lSberVmeste.bListPage.ListPage');

goog.require('cl.iRequest.Request');
goog.require('sv.gTab.gListTab.Tab');
goog.require('sv.lSberVmeste.bCardList.CardList');
goog.require('sv.lSberVmeste.bListPage.View');
goog.require('sv.lSberVmeste.iPage.Page');
goog.require('sv.lSberVmeste.iRouter.Route');
goog.require('sv.lSberVmeste.iRouter.Router');



/**
 * sv.lSberVmeste.bListPage.ListPage control
 * @param {sv.lSberVmeste.bListPage.View} view
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {sv.lSberVmeste.iPage.Page}
 */
sv.lSberVmeste.bListPage.ListPage = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

    /**
    * @type {string}
    * @private
    */
    this.listTabCategory_ = this.params.category || null;

    /**
    * @type {sv.gTab.Tab}
    * @private
    */
    this.listTab_ = null;

    /**
    * @type {Array.<sv.lSberVmeste.bCardList.CardList>}
    * @private
    */
    this.cardLists_ = [];
};
goog.inherits(sv.lSberVmeste.bListPage.ListPage, sv.lSberVmeste.iPage.Page);


goog.scope(function() {
    var ListPage = sv.lSberVmeste.bListPage.ListPage,
        ListTab = sv.gTab.gListTab.Tab,
        request = cl.iRequest.Request.getInstance(),
        Route = sv.lSberVmeste.iRouter.Route,
        Router = sv.lSberVmeste.iRouter.Router,
        CardList = sv.lSberVmeste.bCardList.CardList;

    /**
    * Array of card types
    * @type {Array.<string>}
    */
    ListPage.CardTypes = ['direction', 'fund'];

    /**
    * @override
    * @param {Element} element
    */
    ListPage.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.listTab_ = this.decorateChild('ListTab',
            this.getView().getDom().listTab);

        this.listTab_.setActiveTab(this.listTabCategory_);

        var listTabContentTabs = this.listTab_.getContentTabs();

        for (var i = 0; i < listTabContentTabs.length; i++) {

            this.cardLists_.push(
                this.decorateChild(
                    'CardList',
                    listTabContentTabs[i].firstChild
                )
            );
        }
    };

    /**
    * @override
    */
    ListPage.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.addListCardsListeners();

        this.sendCardsRequests();
    };

    /**
    * Sends ajax requests for cards
    */
    ListPage.prototype.sendCardsRequests = function() {
        for (var i = 0; i < this.cardLists_.length; i++) {
            request
                .send({url: 'entity/' +
                    ListPage.CardTypes[i]
                })
                .then(this.handleResponse.bind(this, i),
                    this.handleRejection,
                    this);
        }
    };

    /**
    * Ajax successful response handler
    * @param {number} cardListIndex
    * @param {Object} response
    */
    ListPage.prototype.handleResponse = function(cardListIndex,
        response) {
        var cardList = this.cardLists_[cardListIndex];

        cardList.renderCards(response.data);
    };

    /**
    * Ajax rejection handler
    * @param {Object} err
    */
    ListPage.prototype.handleRejection = function(err) {
        console.log(err);
    };

    /**
    * Adds event listeners to ListCards' events
    */
    ListPage.prototype.addListCardsListeners = function() {
        for (var i = 0; i < this.cardLists_.length; i++) {

            var cardList = this.cardLists_[i];

            this.getHandler()
                .listenOnce(
                    cardList,
                    CardList.Event.SELECTED_CARDS_PRESENT,
                    this.onSelectedCardsPresent_.bind(this, i)
                )
                .listen(
                    cardList,
                    CardList.Event.CARD_CLICK,
                    this.onCardListCardClick_,
                    null,
                    this
                )
                .listen(
                    cardList,
                    CardList.Event.CARDS_RENDERED,
                    this.onCardsRendered_,
                    null,
                    this
                );
        }
    };

    /**
     * Gets called if there is a user-chosen card in a card list
     * @param {number} tabId
     * @private
     */
    ListPage.prototype.onSelectedCardsPresent_ = function(tabId) {
        this.listTab_.createIcon(tabId);
    };

    /**
    * Card list card click handler
    * @param {Object} event
    * @private
    */
    ListPage.prototype.onCardListCardClick_ = function(event) {
        Router.getInstance().changeLocation(Route['CARD'], {
            id: event.cardId
        });
    };

    /**
     * CARDS_RENDERED event handler
     * @private
     */
    ListPage.prototype.onCardsRendered_ = function() {
        this.listTab_.resizeActiveTab();
    };

});  // goog.scope
