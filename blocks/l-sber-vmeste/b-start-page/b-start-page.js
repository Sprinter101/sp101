goog.provide('sv.lSberVmeste.bStartPage.StartPage');

goog.require('cl.iControl.Control');
goog.require('goog.dom');
goog.require('goog.events.EventType');
goog.require('sv.lSberVmeste.bStartPage.View');
goog.require('sv.lSberVmeste.iPage.Page');
goog.require('sv.lSberVmeste.iRouter.Route');
goog.require('sv.lSberVmeste.iRouter.Router');



/**
 * sv.lSberVmeste.bStartPage.StartPage control
 * @param {sv.lSberVmeste.bStartPage.View} view View used to render or
 *     decorate the component; defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {sv.lSberVmeste.iPage.Page}
 */
sv.lSberVmeste.bStartPage.StartPage = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

    /**
     * start block control
     * @type {Object}
     * @private
     */
    this.startBlock_ = null;

    /**
     * start button control
     * @type {Object}
     * @private
     */
    this.startButton_ = null;

};
goog.inherits(sv.lSberVmeste.bStartPage.StartPage, sv.lSberVmeste.iPage.Page);


goog.scope(function() {
    var StartPage = sv.lSberVmeste.bStartPage.StartPage,
    Route = sv.lSberVmeste.iRouter.Route,
    Router = sv.lSberVmeste.iRouter.Router,
    View = sv.lSberVmeste.bStartPage.View;

    /**
    * @override
    * @param {Element} element
    */
    StartPage.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.startBlock_ = this.decorateChild(
            'StartBlock',
            this.getView().getDom().startBlock
        );
        debugger;
        this.startButton_ = this.decorateChild(
            'ButtonSber',
            this.getView().getDom().startButton
        );
    };

    /**
    * @override
    */
    StartPage.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');
        debugger;
        this.viewListen(View.Event.BUTTON_START_CLICK,
            this.onStartButtonClick
        );
    };

    /**
     * Handles start button CLICK
     * @param {goog.events.BrowserEvent} event Click event
     * @protected
     */
    StartPage.prototype.onStartButtonClick = function(event) {

        Router.getInstance().changeLocation(Route.TEST);
    };

});  // goog.scope
