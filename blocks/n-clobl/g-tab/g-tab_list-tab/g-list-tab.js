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
     * Map enum
     * @enum {string}
     */
    Tab.Map = {
        0: 'topic',
        1: 'fund'
    };

    /**
     * @override
     * @param {Element} element
     */
    Tab.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        var domContentTabs = this.getView().getDom().contentTabs;

        for (var i = 0; i < domContentTabs.length; i++) {
            this.cardLists_.push(
                this.decorateChild(
                    'CardList',
                    domContentTabs[i].firstChild,
                    { cardsType: Tab.Map[i] }
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
                    CardList.Event.CARD_LOADED,
                    this.onCardLoaded_,
                    null,
                    this
                );
        }

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
    * 
    */
    Tab.prototype.addWindowResizeListener = function() {
        this.getHandler().listen(
            window,
            goog.events.EventType.RESIZE,
            this.onResize_,
            null,
            this);
    }

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
    }

    /**
    * Window resize event handler
    * @private
    */
    Tab.prototype.onCardLoaded_ = function() {
        this.getView().resizeActiveTab();
    }
});  // goog.scope
