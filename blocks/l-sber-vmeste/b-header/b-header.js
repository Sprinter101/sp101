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

    /**
     * 'back' icon
     * @type {string}
     * @private
     */
    this.arrowBack_ = null;

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
        GO_TO_PREVIOUS_PAGE: 'go-to-previous-page'
    };

    /**
     * @override
     * @param {Element} element
     */
    Header.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.arrowBack_ = this.decorateChild(
            'IconSber',
            this.getView().getDom().arrowBack
            );
    };

    /**
     * Handles view click event by pushing it
     * to the header manager
     * @param {View.Event.ARROW_BACK_CLICK} event
     */
    Header.prototype.onArrowBackClick = function(event) {
        Router.getInstance().returnLocation();
        /*this.dispatchEvent({
            type: Header.Event.GO_TO_PREVIOUS_PAGE
           });*/
    };

    /**
     * @override
     */
    Header.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.viewListen(View.Event.ARROW_BACK_CLICK,
            this.onArrowBackClick
        );
    };

});  // goog.scope

