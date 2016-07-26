goog.provide('sv.lSberVmeste.bDonationFixedBlock.DonationFixedBlock');

goog.require('cl.iControl.Control');
goog.require('goog.dom');
goog.require('goog.events.EventType');
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

     /**
    * result donation sum
    * type {number}
    * @private
    */
    this.resultSum_ = 0;

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

        this.initView_();
    };

     /**
     * init block view
     * @private
     */
    DonationFixedBlock.prototype.initView_ = function() {
        var sum = this.fixedSum_.getValue();
        if (sum) {
            this.resultSum_ = parseInt(sum, 10);
        }
        else {
            this.resultSum_ = 0;
            this.buttonReady_.disable();
        }
    };

    /**
    * @override
    */
    DonationFixedBlock.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler()
            .listen(this.fixedSum_,
                Input.Event.BLUR,
                this.onFixedSumBlur_
            )
            .listen(
                this.fixedSum_,
                Input.Event.ENTER_KEY_PRESS,
                this.onEnterPress_
            )
            .listen(
                this.buttonReady_,
                Button.Event.CLICK,
                this.onButtonReadyClick_
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
     * @private
     */
    DonationFixedBlock.prototype.dispatchReadyEvent_ = function(event) {
        var customEvent = new goog.events.Event(DonationFixedBlock.Event
            .DONATION_FIXED_READY, this);

        if (this.checkInputSum_()) {
          this.resultSum_ = this.fixedSum_.getValue();
          this.resultSum_ = parseInt(this.resultSum_, 10);
                customEvent.payload = {
                fixedSum: this.resultSum_
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
        this.dispatchReadyEvent_(event);
    };

     /**
     * Handles Enter press key event
     * @param {sv.gInput.Input.Event.ENTER_KEY_PRESS} event
     * @private
     */
    DonationFixedBlock.prototype.onEnterPress_ = function(event) {
        event.stopPropagation();
        this.onFixedSumBlur_();
        var inputInput = this.getView().getDom().inputInput;
        inputInput.blur();
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
