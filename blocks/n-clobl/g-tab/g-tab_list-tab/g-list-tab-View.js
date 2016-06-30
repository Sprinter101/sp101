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
        ICON_CHECKED: 'g-tab__icon-checked',
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
    * Icon classes enum
    * @enum {string}
    */
    View.IconCheckedClasses = {
        0: 'g-tab__icon-checked_align_left',
        1: 'g-tab__icon-checked_align_right'
    };

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

        this.initCurrentTabId();
    };

    /**
    * Removes ICON_INACTIVE class from a tab icon
    * @param {number} tabId
    */
    View.prototype.activateCheckedIcon = function(tabId) {
        var tab = this.dom.tabs[tabId];

        var iconChecked = this.getElementByClass(
            View.CssClass.ICON_CHECKED,
            tab
        );

        goog.dom.classlist.remove(
            iconChecked,
            View.CssClass.ICON_INACTIVE
        );

        goog.dom.classlist.add(
            iconChecked,
            View.IconCheckedClasses[tabId]
        );

        if (!this.isSelectedTab(tab))
        {
            this.showCheckedIcon(tab);
        }
    }

    /**
    * 
    * @param {element} tab
    */
    View.prototype.showCheckedIcon = function(tab) {
        var iconChecked = this.getElementByClass(
            View.CssClass.ICON_CHECKED,
            tab
        );

        if (!this.isIconInactive(iconChecked)) {
            goog.dom.classlist.remove(
                iconChecked,
                View.CssClass.HIDDEN
            );
        }
    }

    /**
    * 
    * @param {element} tab
    */
    View.prototype.hideCheckedIcon = function(tab) {
        var iconChecked = this.getElementByClass(
            View.CssClass.ICON_CHECKED,
            tab
        );
        
        if (!this.isIconInactive(iconChecked)) {
            goog.dom.classlist.add(
                iconChecked,
                View.CssClass.HIDDEN
            );
        }
    }

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

        if (!this.isSelectedTab(tab))
        {
            this.showCheckedIcon(tab);
        }
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

        if (this.isSelectedTab(tab))
        {
            this.hideCheckedIcon(tab);
        }
    };

    /**
    * Checks if a tab is selected
    * @param {element} tab
    * @return {boolean}
    */
    View.prototype.isSelectedTab = function(tab) {
        return !!goog.dom.classlist.contains(tab, 
            View.CssClass.SELECTED_TAB);
    };

    /**
    * Checks if an icon is inactive
    * @param {element} icon
    * @return {boolean}
    */
    View.prototype.isIconInactive = function(icon) {
        return !!goog.dom.classlist.contains(icon, 
            View.CssClass.ICON_INACTIVE);
    }

});  // goog.scope
