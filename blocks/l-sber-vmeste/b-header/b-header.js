goog.provide('sv.lSberVmeste.bHeader.Header');

goog.require('cl.iControl.Control');
goog.require('sv.lSberVmeste.bHeader.View');
goog.require('sv.lSberVmeste.iRouter.Route');
goog.require('sv.lSberVmeste.iRouter.Router');



/**
 * sv.lSberVmeste.bHeader.Header control
 * @param {sv.lSberVmeste.bHeader.View} view View used to render or
 *     decorate the component; defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {cl.iControl.Control}
 */
sv.lSberVmeste.bHeader.Header = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

    this.button_ = null;
};
goog.inherits(sv.lSberVmeste.bHeader.Header, cl.iControl.Control);


goog.scope(function() {
    var Header = sv.lSberVmeste.bHeader.Header,
        Route = sv.lSberVmeste.iRouter.Route,
        Router = sv.lSberVmeste.iRouter.Router,
        View = sv.lSberVmeste.bHeader.View;

    /**
     * Event enum
     * @enum {string}
     */
    Header.Event = {

    };

    /**
     * Maps paths to navigation link ids
     * @enum {number}
     */
    Header.NavLinkID = {
        'navLink1': 1
    };

    /**
     * @override
     * @param {Element} element
     */
    Header.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

    };

    /**
     * @override
     */
    Header.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.viewListen(
            View.Event.NAV_LINK_CLICKED,
            this.onNavLinkSelect
        );
    };

    /**
     * Handles navigation link selection
     * @param {goog.events.Event} event
     */
    Header.prototype.onNavLinkSelect = function(event) {
        switch (this.getView().getNavLinkTitle([event.value.id])) {
            case 'navLink1':
                Router.getInstance().changeLocation(Route.NAV_LINK_1);
                break;
            default:
                console.log('Nav Link ' + event.value.id + ' clicked!');
        }
    };

    /**
     * Converts part of url to link ID and
     * calls view method that actually marks the link as active
     * @param {string} path
     */
    Header.prototype.makeLinkActive = function(path) {
        this.getView().makeLinkActive(Header.NavLinkID[path]);
    };

    /**
     * Show header
     */
    Header.prototype.show = function() {
        this.getView().show();
    };

    /**
     * Hide header
     */
    Header.prototype.hide = function() {
        this.getView().hide();
    };

});  // goog.scope
