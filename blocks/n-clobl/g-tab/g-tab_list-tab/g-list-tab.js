goog.provide('sv.gTab.gListTab.Tab');

goog.require('cl.gTab.Tab');
goog.require('sv.gTab.gListTab.View');
goog.require('sv.lSberVmeste.bCardList.CardList');



/**
 * List tab control
 * @param {sv.gTab.gListTab.View} view ControlRenderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {cl.gTab.Tab}
 */
sv.gTab.gListTab.Tab = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

    /**
    * @type {Array}
    * @private
    */
    this.cardLists_ = [];

};
goog.inherits(sv.gTab.gListTab.Tab, cl.gTab.Tab);


goog.scope(function() {
    var Tab = sv.gTab.gListTab.Tab,
        View = sv.gTab.gListTab.View,
        CardList = sv.lSberVmeste.bCardList.CardList;

    /**
     * Event enum
     * @enum {string}
     */
    Tab.Event = {
        TAB_SELECT: View.Event.TAB_SELECT,
        CHANGE_PAGE_REQUEST: 'list-tab-change-page-request'
    };

    /**
     * Tab map
     * @type {Object}
     */
    Tab.TabMap = {
        'directions' : {
            id: 0,
            cardsType: 'direction'
        },
        'funds': {
            id: 1,
            cardsType: 'fund'
        }
    };

    /**
     * @override
     * @param {Element} element
     */
    Tab.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        var domContentTabs = this.getView().getDom().contentTabs;

        for (key in Tab.TabMap) {

            var tab = Tab.TabMap[key];

            this.cardLists_.push(
                this.decorateChild(
                    'CardList',
                    domContentTabs[tab.id].firstChild,
                    { cardsType: tab.cardsType }
                )
            );
        }

    };

    /**
     * @override
     */
    Tab.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.addWindowResizeListener();

        this.addListCardsListeners();
    };

    /**
    * Adds event listeners to ListCards' events
    */
    Tab.prototype.addListCardsListeners = function() {
        for (var i = 0; i < this.cardLists_.length; i++) {

            var cardList = this.cardLists_[i];

            this.getHandler()
                .listenOnce(
                    cardList,
                    CardList.Event.SELECTED_CARDS_PRESENT,
                    this.onUserChoicePresent_.bind(this, i)
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
                    CardList.Event.CARDS_LOADED,
                    this.onCardsLoaded_,
                    null,
                    this
                );
        }
    };

    /**
    * Adds event listener for 'resize' window event
    */
    Tab.prototype.addWindowResizeListener = function() {
        this.getHandler().listen(
            window,
            goog.events.EventType.RESIZE,
            this.onResize_,
            null,
            this);
    };

    /**
     * Creates icon and appends it into a tab
     * @param {number} tabId
     */
    Tab.prototype.createIcon = function(tabId) {
        var tab = this.getView().getDom().tabs[tabId],
            iconContainer = goog.dom.createDom('div',
                ['g-tab__icon',
                View.CssClass.HIDDEN,
                View.IconClasses[tabId]
                ]
            );

        this.renderChild('IconSber', iconContainer,
            {
                'config': { 'iconStyles': ['check-mark']}
            }
        );

        goog.dom.appendChild(tab, iconContainer);

        if (tabId != this.getView().getCurrentTabId())
        {
            this.getView().showTabIcon(tab);
        }
    };

    /**
    * @param {string} category
    */
    Tab.prototype.setActiveTab = function(category) {
        if (category && Tab.TabMap[category]) {
            this.getView().changeTab(Tab.TabMap[category].id);
        }
    };

    /**
     * Gets called if there is a user-chosen card in a card list
     * @param {number} tabId
     * @private
     */
    Tab.prototype.onUserChoicePresent_ = function(tabId) {
        this.createIcon(tabId);
    };


    /**
     * Activates tab icon if there is a user-chosen card in a card list
     * @param {Object} event
     * @private
     */
    Tab.prototype.onCardListCardClick_ = function(event) {
        this.dispatchEvent({
            type: Tab.Event.CHANGE_PAGE_REQUEST,
            page: 'CARD',
            cardId: event.cardId
        });
    };

    /**
    * Window resize event handler
    * @private
    */
    Tab.prototype.onResize_ = function() {
        this.getView().resizeActiveTab();
    };

    /**
    * Event handler for CARDS_LOADED event
    * @private
    */
    Tab.prototype.onCardsLoaded_ = function() {
        this.getView().resizeActiveTab();
    };
});  // goog.scope
