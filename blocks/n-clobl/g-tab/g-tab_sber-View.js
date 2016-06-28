goog.provide('sv.gTab.View');

goog.require('cl.gTab.View');



/**
 * Tab View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.gTab.View}
 */
sv.gTab.View = function(opt_params, opt_template, opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.gTab.View.CssClass.ROOT);
};
goog.inherits(sv.gTab.View, cl.gTab.View);


goog.scope(function() {
    var View = sv.gTab.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'g-tab',
        TAB: 'g-tab__tab',
        SELECTED_TAB: 'g-tab__tab_selected',
        CONTENT: 'g-tab__content'
    };

    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
        TAB_SELECT: 'tab-select'
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);
        
        this.dom.contentTabs = this.getElementsByClass(
            View.CssClass.CONTENT,
            this.getElement()
        );
    };

});  // goog.scope
