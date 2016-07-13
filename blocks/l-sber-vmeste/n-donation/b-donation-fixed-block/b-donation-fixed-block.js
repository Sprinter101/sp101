goog.provide('sv.lSberVmeste.bDonationFixedBlock.DonationFixedBlock');

goog.require('cl.iControl.Control');
goog.require('goog.dom');
goog.require('goog.events.EventType');
goog.require('goog.events.KeyCodes');
goog.require('goog.events.KeyHandler');
goog.require('sv.gButton.Button');
goog.require('sv.gInput.Input');
goog.require('sv.lSberVmeste.bDonationFixedBlock.View');



/**
 * sv.lSberVmeste.bDonationFixedBlock.DonationFixedBlock control
 * @param {sv.lSberVmeste.bDonationFixedBlock.View} view View used to render or
 *     decorate the component; defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {'cl.iControl.Control'}
 */
sv.lSberVmeste.bDonationFixedBlock.DonationFixedBlock = function(
    view, opt_domHelper) {goog.base(this, view, opt_domHelper);

    /**
    * @type {sv.gInput.Input}
    * @private
    */
    this.fixedSum_ = null;

    /**
    * @type {sv.gButton.Button}
    * @private
    */
    this.buttonReady_ = null;

};
goog.inherits(sv.lSberVmeste.bDonationFixedBlock.DonationFixedBlock,
    cl.iControl.Control);


goog.scope(function() {
    var DonationFixedBlock = sv.lSberVmeste.bDonationFixedBlock
        .DonationFixedBlock,
        View = sv.lSberVmeste.bDonationFixedBlock.View,
        Input = sv.gInput.Input,
        Button = sv.gButton.Button;

        /**
     * Key codes for managing key events
     * @const {Array}
     */
    DonationFixedBlock.KEYCODES = [
        8, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57
    ];

       /**
     * Event enum
     * @enum {string}
     */
    DonationFixedBlock.Event = {
        DONATION_FIXED_READY: 'donation-fixed-ready'
    };


    /**
    * @override
    * @param {Element} element
    */
    DonationFixedBlock.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);
        this.fixedSum_ = this.decorateChild('InputSber',
            this.getView().getDom().inputControl);

        this.buttonReady_ = this.decorateChild('ButtonSber',
            this.getView().getDom().buttonReady
            );
    };

    /**
    * @override
    */
    DonationFixedBlock.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.inputKeyHandler_ = new goog.events.KeyHandler(
            this.fixedSum_.getElement());

        this.getHandler()
            .listen(this.fixedSum_,
                Input.Event.BLUR,
                this.onFixedSumBlur_
            )
            .listen(
                this.buttonReady_,
                Button.Event.CLICK,
                this.onButtonReadyClick_
            )
            .listen(
                this.inputKeyHandler_,
                goog.events.KeyHandler.EventType.KEY,
                this.onInputKeyEvent_
            );
    };

    /**
     * Blur event handler
     * @param {sv.gInput.Input.Event.Blur} event
     * @private
     */
    DonationFixedBlock.prototype.onFixedSumBlur_ = function(event) {
        this.manageButtonReadyStyle_();
    };

    /**
     * checks if input sum is valid
     * @return {bool} if sum is valid
     * @private
     */
    DonationFixedBlock.prototype.checkInputSum_ = function() {
       return this.fixedSum_.validate();
    };

     /**
     * dispatch custom event
     * @param {sv.gButton.Button.Event.CLICK} event
     * @protected
     */
    DonationFixedBlock.prototype.dispatchReadyEvent = function(event) {
        var customEvent = new goog.events.Event(DonationFixedBlock.Event
            .DONATION_FIXED_READY, this);

        if (this.checkInputSum_()) {
          var sumValue = this.getView().getValue();
                customEvent.payload = {
                fixedSum: sumValue
                };
            this.dispatchEvent(customEvent);
        }
    };

     /**
     * Handles ready button CLICK
     * @param {sv.gButton.Button.Event.CLICK} event
     * @private
     */
    DonationFixedBlock.prototype.onButtonReadyClick_ = function(event) {
        this.dispatchReadyEvent(event);
    };

    /**
     * Handles donation input key event
     * @param {goog.events.KeyHandler.EventType.KEY} event
     * @private
     */
    DonationFixedBlock.prototype.onInputKeyEvent_ = function(event) {
        event.stopPropagation();
        var that = this;
        var digits = DonationFixedBlock.KEYCODES;
        if (event.keyCode === goog.events.KeyCodes.ENTER) {
            this.onFixedSumBlur_();
            /*var inputInput = this.getView().getDom().inputInput;
            inputInput.blur();*/
        }
    };

     /**
     * enables or disables 'ready' button
     * @private
     */
    DonationFixedBlock.prototype.manageButtonReadyStyle_ = function() {
        if (this.checkInputSum_()) {
                this.buttonReady_.enable();
            }
            else {
                this.buttonReady_.disable();
            }
    };


});  // goog.scope
