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
        INPUT_FOCUS: 'input-focus',
        INPUT_CHANGE: 'input-change',
        SLIDER_MOVE: 'slider-move',
        DONATION_FIXED_READY: 'donation-fixed-ready'
    };


    /**
    * @override
    * @param {Element} element
    */
    DonationFixedBlock.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);
        this.fixedSum_ = this.decorateChild('InputSber',
            this.getView().getDom().inputControl, {
            MAX_NUMBER: 500000,
            MAX_CHARACTERS: 6
        });

        this.buttonReady_ = this.decorateChild('ButtonSber',
            this.getView().getDom().buttonReady
            );
    };

    /**
    * @override
    */
    DonationFixedBlock.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler()
            .listen(
                this.fixedSum_,
                Input.Event.FOCUS,
                this.onfixedSumFocus
            ).listen(
                this.fixedSum_,
                Input.Event.BLUR,
                this.onfixedSumBlur
            )
            .listen(
                this.fixedSum_,
                Input.Event.CHANGE,
                this.onfixedSumChange
            )
            .listen(
                this.buttonReady_,
                Button.Event.CLICK,
                this.onButtonReadyClick
            );
    };

    /**
     * Focus event handler
     * @param {sv.gInput.Event.Focus} event
     */
    DonationFixedBlock.prototype.onfixedSumFocus = function(event) {
        var input = this.getElementByClass('g-input__input', this);
        goog.dom.setProperties(input, {'placeholder': ''});
    };

    /**
     * Blur event handler
     * @param {sv.gInput.Input.Event.Blur} event
     */
    DonationFixedBlock.prototype.onfixedSumBlur = function(event) {
        var input = this.getElementByClass('g-input__input', this);
        goog.dom.setProperties(input, {'placeholder': '0'});
    };

    /**
     * Change event handler
     * @param {sv.gInput.Input.Event.Change} event
     */
     DonationFixedBlock.prototype.onfixedSumChange = function(event) {
        console.log('changed');
    };

    /**
     * checks if input sum is valid
     * @return {bool} if sum is valid
     * @protected
     */
    DonationFixedBlock.prototype.checkInputSum = function() {
        var inputInput = this.getView().getDom().inputInput;
        inputInput.blur();
        return this.fixedSum_.validate();
    };

     /**
     * Handles ready button CLICK
     * @param {sv.gButton.Button.Event.CLICK} event
     * @protected
     */
    DonationFixedBlock.prototype.onButtonReadyClick = function(event) {

        var customEvent = new goog.events.Event(DonationFixedBlock.Event
            .DONATION_FIXED_READY, this);

        if (this.checkInputSum()) {
            var inputInput = this.getView().getDom().inputInput;
            var sumValue = inputInput.value;
                customEvent.payload = {
                fixedSum: sumValue
                };
            this.dispatchEvent(customEvent);
        }
    };

});  // goog.scope
