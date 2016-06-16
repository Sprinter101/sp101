goog.provide('sv.lSberVmeste.bHeader.View');

goog.require('sv.iUtils.Utils');
goog.require('cl.iControl.View');
goog.require('goog.dom');
goog.require('goog.events.EventType');



/**
 * sv.lSberVmeste.bHeader.View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sv.lSberVmeste.bHeader.View = function(opt_params, opt_template, opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.lSberVmeste.bHeader.View.CssClass.ROOT);

    /**
     * Tracks currently active nav link
     * @type {number}
     * @private
     */
    this.activeNavLink_ = 0;

    /**
     * Maps all available header menu items to their respective links and icons
     * @private
     */
    this.navLinksMap_ = [
        {
            title: 'navLink1'
        }
    ];
};
goog.inherits(sv.lSberVmeste.bHeader.View, cl.iControl.View);

goog.scope(function() {
    var View = sv.lSberVmeste.bHeader.View,
        Utils = sv.iUtils.Utils;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-header',
        NAV_LINK: 'b-header__nav-link',
        NAV_LINK_ACTIVE: 'b-header__nav-link_active'
    };

    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
        CLICK: goog.events.EventType.CLICK,
        NAV_LINK_CLICKED: 'nav_link-clicked'
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dom.links = this.getElementsByClass(View.CssClass.NAV_LINK);

        this.makeLinkActive(this.activeNavLink_);
    };

    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        Array.prototype.forEach.call(this.dom.links, function(link, i) {
            this.getHandler().listen(
                link,
                View.Event.CLICK,
                this.onNavLinkClick.bind(this, i)
            );
        }.bind(this));
    };

    /**
     * Show header
     */
    View.prototype.show = function() {
        goog.dom.classlist.remove(this.getElement(), Utils.CssClass.HIDDEN);
    };

    /**
     * Hide header
     */
    View.prototype.hide = function() {
        goog.dom.classlist.add(this.getElement(), Utils.CssClass.HIDDEN);
    };

    /**
     * Navigation link title getter
     * @param {number} id
     * @return {string}
     */
    View.prototype.getNavLinkTitle = function(id) {
        return this.navLinksMap_[id].title;
    };

    /**
     * Navigation link click handler
     * Highlights active link and emits event with active link id
     * @param {number} id
     * @param {goog.events.Event} event
     * @protected
     */
    View.prototype.onNavLinkClick = function(id, event) {
        if (id != this.activeNavLink_) {
            this.makeLinkActive(id);

            this.dispatchEvent({
                type: View.Event.NAV_LINK_CLICKED,
                value: {
                    id: id
                }
            });
        }
    };

    /**
     * Highlights currently active link
     * @param {number} id
     */
    View.prototype.makeLinkActive = function(id) {
        if (this.activeNavLink_ != undefined) {
            var current = this.activeNavLink_;

            goog.dom.classlist.remove(
                this.dom.links[current],
                View.CssClass.NAV_LINK_ACTIVE
            );
        }

        this.activeNavLink_ = id;

        goog.dom.classlist.add(
            this.dom.links[id],
            View.CssClass.NAV_LINK_ACTIVE
        );
    };

});  // goog.scope
