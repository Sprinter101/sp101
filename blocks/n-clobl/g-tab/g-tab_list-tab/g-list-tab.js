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

    /**
    * @type {Array}
    * @private
    */
    this.activeIcons_ = [];

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
        TAB_SELECT: View.Event.TAB_SELECT
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
            this.cardLists_.push(this.decorateChild(
                'CardList',
                domContentTabs[i].firstChild,
                {
                    cardsType: Tab.Map[i]
                }
            ));
        }
    };

    /**
     * @override
     */
    Tab.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        for (var i = 0; i < this.cardLists_.length; i++) {
            var cardList = this.cardLists_[i];
            goog.events.listen(
                cardList,
                CardList.Event.USER_CHOICE_PRESENT,
                this.onUserChoicePresent_.bind(this, i)
            );
        }
    };

    /**
     * User choice present event handler
     * @private
     */
    Tab.prototype.onUserChoicePresent_ = function(tabId) {
        this.getView().activateCheckedIcon(tabId);
    }

});  // goog.scope
