goog.provide('sv.gTab.gListTab.View');

goog.require('cl.gTab.View');
goog.require('goog.dom.classlist');
goog.require('sv.iUtils.Utils');



/**
 * List tab View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.gTab.View}
 */
sv.gTab.gListTab.View = function(opt_params, opt_template,
    opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.gTab.gListTab.View.CssClass.ROOT);
};
goog.inherits(sv.gTab.gListTab.View, cl.gTab.View);


goog.scope(function() {
    var View = sv.gTab.gListTab.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'g-tab',
        TAB: 'g-tab__tab',
        SELECTED_TAB: 'g-tab__tab_selected',
        CONTENT: 'g-tab__content',
        TAB_ICON: 'g-tab__icon',
        ICON_INACTIVE: 'g-tab__icon_inactive',
        HIDDEN: sv.iUtils.Utils.CssClass.HIDDEN
    };

    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
        TAB_SELECT: 'tab-select'
    };

    /**
    * Icon classes array
    * @type {Array}
    */
    View.IconClasses = [
        'g-tab__icon_align_left',
        'g-tab__icon_align_right'
    ];

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dom.tabs = this.getElementsByClass(
            View.CssClass.TAB,
            this.getElement()
        );

        this.dom.contentTabs = this.getElementsByClass(
            View.CssClass.CONTENT,
            this.getElement()
        );
    };

    /**
    * Shows tab icon
    * @param {element} tab
    */
    View.prototype.showTabIcon = function(tab) {
        var tabIcon = this.getElementByClass(
            View.CssClass.TAB_ICON,
            tab
        );

        if (tabIcon) {
            goog.dom.classlist.remove(
                tabIcon,
                View.CssClass.HIDDEN
            );
        }
    };

    /**
    * Hides tab icon
    * @param {element} tab
    */
    View.prototype.hideTabIcon = function(tab) {
        var tabIcon = this.getElementByClass(
            View.CssClass.TAB_ICON,
            tab
        );

        if (tabIcon) {
            goog.dom.classlist.add(
                tabIcon,
                View.CssClass.HIDDEN
            );
        }
    };

    /**
     * Change tab
     * @param {number} id
     */
    View.prototype.changeTab = function(id) {
        this.closeTab(this.currentTabId_);
        this.openTab(id);

        this.currentTabId_ = id;
        this.resizeActiveTab();
    };

    /**
     * Hide tab
     * @param {number} tabId
     */
    View.prototype.closeTab = function(tabId) {
        var tab = this.dom.tabs[tabId];

        goog.dom.classlist.add(
            this.dom.contents[tabId],
            View.CssClass.HIDDEN
        );
        goog.dom.classlist.remove(
            tab,
            View.CssClass.SELECTED_TAB
        );

        this.showTabIcon(tab);
    };

    /**
     * Show tab
     * @param {number} tabId
     */
    View.prototype.openTab = function(tabId) {
        var tab = this.dom.tabs[tabId];

        goog.dom.classlist.remove(
            this.dom.contents[tabId],
            View.CssClass.HIDDEN
        );
        goog.dom.classlist.add(
            tab,
            View.CssClass.SELECTED_TAB
        );

        this.hideTabIcon(tab);
    };

    /**
     * resizes Active content tab
     */
    View.prototype.resizeActiveTab = function() {
        var contentTab = this.dom.contentTabs[this.getCurrentTabId()];

            contentTab.style.height = '';

        var documentHeight = goog.dom.getDocumentHeight(),
            contentTabHeight = contentTab.offsetHeight,
            minContentTabHeight = documentHeight -
                contentTab.offsetTop;

        if (contentTabHeight < minContentTabHeight) {
            contentTab.style.height = minContentTabHeight + 'px';
        }
    };

});  // goog.scope
