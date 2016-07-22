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
        View = sv.lSberVmeste.bStartBlock.View;

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

    };

     /**
    * @override
    */
    StartBlock.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.viewListen(
           View.Event.START_BLOCK_BUTTON_CLICK,
            this.onStartButtonClick_
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
        this.renderUserfundLogo_(loggedIn);
        this.renderUserfundTitle_(loggedIn, firstName, lastName);
        this.renderStartButton_(draft);
    };

    /**
    * render correct icon as userfund logo
    * @param {bool} loggedIn
    * @private
    */
    StartBlock.prototype.renderUserfundLogo_ = function(loggedIn) {
        this.getView().renderUserfundLogo(loggedIn);
    };

    /**
    * render correct icon as userfund logo
    * @param {bool} loggedIn
    * @param {string} firstName
    * @param {string} lastName
    * @private
    */
    StartBlock.prototype.renderUserfundTitle_ = function(loggedIn,
        firstName, lastName) {
        this.getView().renderUserfundTitle(loggedIn, firstName, lastName);
    };

    /**
    * render correct icon as userfund logo
    * @param {bool} draft
    * @private
    */
    StartBlock.prototype.renderStartButton_ = function(draft) {
        this.getView().renderStartButton(draft);

        this.startButton_ = this.decorateChild(
            'ButtonSber',
            this.getView().getDom().button
        );
    };

    /**
     * detect start button type to correct event's handle
     * @private
     * @return {bool}
    */
    StartBlock.prototype.checkStartButtonClass_ = function() {
        return this.getView().checkStartButtonClass();
    };

    /**
     * Handles view click event by pushing it
     * to the start page
     * @param {View.Event.BUTTON_START_CLICK} event
     * @private
     */
    StartBlock.prototype.onStartButtonClick_ = function(event) {
        var customEvent;
        if (this.checkStartButtonClass_()) {
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
