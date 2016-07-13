goog.provide('sv.lSberVmeste.bHeader.Header');

goog.require('cl.gIcon.Icon');
goog.require('cl.iControl.Control');
goog.require('goog.events');
goog.require('sv.gButton.Button');
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
     * @type {cl.gIcon.Icon}
     * @private
     */
    this.arrowBack_ = null;

    /**
     * header button
     * @type {cl.gButton.Button}
     * @private
     */
    this.button_ = null;


};
goog.inherits(sv.lSberVmeste.bHeader.Header, cl.iControl.Control);


goog.scope(function() {
    var Header = sv.lSberVmeste.bHeader.Header,
        Button = sv.gButton.Button,
        Icon = cl.gIcon.Icon,
        View = sv.lSberVmeste.bHeader.View,
        Route = sv.lSberVmeste.iRouter.Route,
        Router = sv.lSberVmeste.iRouter.Router;

    /**
     * Event enum
     * @enum {string}
     */
    Header.Event = {
        ARROW_BACK_CLICK: 'arrow-back-click',
        BUTTON_ME_CLICK: 'button-me-click',
        BUTTON_CLOSE_CLICK: 'button-close-click'
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

        this.button_ = this.decorateChild(
            'ButtonSber',
            this.getView().getDom().button
        );

        this.checkListHeaderLayout;

    };

    /**
     * @override
     */
    Header.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler().listen(
            this.arrowBack_,
            Icon.Event.CLICK,
            this.onArrowBackClick
        )
        .listen(
            this.button_,
            Button.Event.CLICK,
            this.onButtonClick
        );
    };

    /**
    * Get current header type
    * @return {string}
    * @protected
    */
    Header.prototype.getCurrentHeaderType = function() {
        return this.getView().getCurrentHeaderType();
    };

    /**
    * Render correct help phrase
    * @protected
    */
    Header.prototype.checkListHeaderLayout = function() {
        this.getView().checkLayout();
    };

     /**
     * Handles 'back' click event
     * @param {cl.gIcon.Icon.Event.CLICK} event
     */
    Header.prototype.onArrowBackClick = function(event) {
        var customEvent = new goog.events.Event(
            Header.Event.ARROW_BACK_CLICK, this);
            this.dispatchEvent(customEvent);
            Router.getInstance().returnLocation();
    };

    /**
     * Handles 'me' button click event
     * @param {sv.gButton.Button} event
     */
    Header.prototype.onButtonClick = function(event) {


        if (this.getView().checkButtonCustomClass()) {
            var customEvent = new goog.events.Event(
            Header.Event.BUTTON_ME_CLICK, this);
            this.dispatchEvent(customEvent);
             Router.getInstance().changeLocation(
            Route.PROFILE);
        }
        else {
            var customEvent = new goog.events.Event(
            Header.Event.BUTTON_CLOSE_CLICK, this);
            this.dispatchEvent(customEvent);
            Router.getInstance().returnLocation();
        }
    };

});  // goog.scope

