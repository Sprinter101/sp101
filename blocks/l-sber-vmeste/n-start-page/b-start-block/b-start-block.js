goog.provide('sv.lSberVmeste.bStartBlock.StartBlock');

goog.require('cl.iControl.Control');
goog.require('goog.dom');
goog.require('goog.events.EventType');
goog.require('sv.gButton.Button');
goog.require('sv.lSberVmeste.bStartBlock.View');



/**
 * sv.lSberVmeste.bStartBlock.StartBlock control
 * @param {sv.lSberVmeste.bStartBlock.View} view View used to render or
 *     decorate the component; defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {'cl.iControl.Control'}
 */
sv.lSberVmeste.bStartBlock.StartBlock = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

    /**
     * start button
     * @type {sv.gButton.Button}
     * @private
     */
    this.startButton_ = null;
};
goog.inherits(sv.lSberVmeste.bStartBlock.StartBlock, cl.iControl.Control);


goog.scope(function() {
    var StartBlock = sv.lSberVmeste.bStartBlock.StartBlock,
        View = sv.lSberVmeste.bStartBlock.View,
        Button = sv.gButton.Button;

    /**
     * Event enum
     * @enum {string}
     */
    StartBlock.Event = {
        START_CREATING_USERFUND: 'start-creating-userfund',
        MANAGE_USERFUND: 'manage-userfund'
    };

    /**
    * @override
    * @param {Element} element
    */
    StartBlock.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.startButton_ = this.decorateChild(
            'ButtonSber',
            this.getView().getDom().startButton
        );
    };

     /**
    * @override
    */
    StartBlock.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler().listen(
            this.startButton_,
            Button.Event.CLICK,
            this.onStartButtonClick
        );
    };

     /**
    * Ajax success handler
    * @param {Object} params
    */
    StartBlock.prototype.handleLoginCheck = function(params) {
        var loggedIn = params.loggedIn;
        var firstName = params.firstName;
        var lastName = params.lastName;
        var draft = params.draft;
        this.renderUserfundLogo(loggedIn);
        this.renderUserfundTitle(loggedIn, firstName, lastName);
        this.renderStartButtonContent(loggedIn, draft);
    };

    /**
    * render correct icon as userfund logo
    * @param {bool} loggedIn
    */
    StartBlock.prototype.renderUserfundLogo = function(loggedIn) {
        this.getView().renderUserfundLogo(loggedIn);
    };

    /**
    * render correct icon as userfund logo
    * @param {bool} loggedIn
    * @param {string} firstName
    * @param {string} lastName
    */
    StartBlock.prototype.renderUserfundTitle = function(loggedIn,
        firstName, lastName) {
        this.getView().renderUserfundTitle(loggedIn, firstName, lastName);
    };

    /**
    * render correct icon as userfund logo
    * @param {bool} loggedIn
    * @param {bool} draft
    */
    StartBlock.prototype.renderStartButtonContent = function(loggedIn, draft) {
        this.getView().renderStartButtonContent(loggedIn, draft);
    };

    /**
     * detect start button type to correct event's handle
     * @return {bool}
    */
    StartBlock.prototype.checkStartButtonClass = function() {
        return this.getView().checkStartButtonClass();
    };

    /**
     * Handles view click event by pushing it
     * to the start page
     * @param {View.Event.BUTTON_START_CLICK} event
     */
    StartBlock.prototype.onStartButtonClick = function(event) {
        var customEvent;
        if (this.checkStartButtonClass()) {
            customEvent = new goog.events.Event(StartBlock.Event
            .MANAGE_USERFUND, this);
        }
        else {
            customEvent = new goog.events.Event(StartBlock.Event
            .START_CREATING_USERFUND, this);
        }
        this.dispatchEvent(customEvent);
    };

});  // goog.scope
