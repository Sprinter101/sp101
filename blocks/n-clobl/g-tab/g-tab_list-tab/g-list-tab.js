goog.provide('sv.gTab.gListTab.Tab');

goog.require('cl.gTab.Tab');
goog.require('sv.gTab.gListTab.View');



/**
 * List tab control
 * @param {sv.gTab.gListTab.View} view ControlRenderer
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {cl.gTab.Tab}
 */
sv.gTab.gListTab.Tab = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);
};
goog.inherits(sv.gTab.gListTab.Tab, cl.gTab.Tab);


goog.scope(function() {
    var Tab = sv.gTab.gListTab.Tab,
        View = sv.gTab.gListTab.View;

    /**
     * Event enum
     * @enum {string}
     */
    Tab.Event = {
        TAB_SELECT: View.Event.TAB_SELECT,
        TAB_CHANGE: View.Event.TAB_CHANGE
    };

    /**
     * Tab map
     * @type {Array.<string>}
     */
    Tab.Tabs = ['topics', 'funds'];

    /**
     * @override
     */
    Tab.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler()
            .listen(
                window,
                goog.events.EventType.RESIZE,
                this.onResize_,
                null,
                this);

        this.viewListen(View.Event.TAB_CHANGE, this.onTabChange_);

        setTimeout(this.resizeActiveTab.bind(this), 0);
    };

    /**
    * @return {Array.<Element>}
    */
    Tab.prototype.getContentTabs = function() {
        return this.getView().getDom().contentTabs;
    };

    /**
    * @param {string} category
    */
    Tab.prototype.setActiveTab = function(category) {
        var tabId = Tab.Tabs.indexOf(category);

        if (category && tabId + 1) {
            this.getView().changeTab(tabId, true);
        }
    };

    /**
    * Calls View's resizeActiveTab function
    */
    Tab.prototype.resizeActiveTab = function() {
        this.getView().resizeActiveTab();
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
                'data': { 'type': ['checked']},
                'config': {}
            }
        );

        goog.dom.appendChild(tab, iconContainer);

        if (tabId != this.getView().getCurrentTabId())
        {
            this.getView().showTabIcon(tab);
        }
    };

    /**
    * Window resize event handler
    * @private
    */
    Tab.prototype.onResize_ = function() {
        this.resizeActiveTab();
    };

    /**
     * Tab change event handler
     * @param {Object} event
     * @private
     */
    Tab.prototype.onTabChange_ = function(event) {
        var tabCategory = Tab.Tabs[event.tabId];

        this.dispatchEvent({
            'type': Tab.Event.TAB_CHANGE,
            'tabId': event.tabId,
            'tabCategory': tabCategory
        });
    };

});  // goog.scope
