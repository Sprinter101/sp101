goog.provide('sv.lSberVmeste.bDonationPercentBlock.DonationPercentBlock');

goog.require('cl.iControl.Control');
goog.require('goog.dom');
goog.require('goog.events.EventType');
goog.require('sv.gButton.Button');
goog.require('sv.gInput.Input');
goog.require('sv.lSberVmeste.bDonationPercentBlock.View');



/**
 * sv.lSberVmeste.bDonationPercentBlock.DonationPercentBlock control
 * @param {sv.lSberVmeste.bDonationPercentBlock.View} view
 * View used to render or decorate the component;
 * defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper,
 * used for document interaction.
 * @constructor
 * @extends {'cl.iControl.Control'}
 */
sv.lSberVmeste.bDonationPercentBlock.DonationPercentBlock = function(
    view, opt_domHelper) {goog.base(this, view, opt_domHelper);

    /**
     * user's monthly income
     * @type {sv.gInput.Input}
     * @private
     */
    this.monthlyIncome_ = null;

    /**
     * temporary input for donation sum (instead of slider)
     * @type {sv.gInput.Input}
    * @private
    */
    this.donationInput_ = null;

    /**
    * @type {sv.gButton.Button}
    * @private
    */
    this.buttonReady_ = null;

};
goog.inherits(sv.lSberVmeste.bDonationPercentBlock
    .DonationPercentBlock,
    cl.iControl.Control);


goog.scope(function() {
    var DonationPercentBlock = sv.lSberVmeste.bDonationPercentBlock.
            DonationPercentBlock,
        View = sv.lSberVmeste.bDonationPercentBlock.View,
        Input = sv.gInput.Input,
        Button = sv.gButton.Button;

       /**
     * Event enum
     * @enum {string}
     */
    DonationPercentBlock.Event = {
        INPUT_FOCUS: 'input-focus',
        INPUT_CHANGE: 'input-change',
        SLIDER_MOVE: 'slider-move',
        DONATION_PERCENT_READY: 'donation-percent-ready'
    };


    /**
    * @override
    * @param {Element} element
    */
    DonationPercentBlock.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);
        this.monthlyIncome_ = this.decorateChild('InputSber',
            this.getView().getDom().inputControl, {
            MAX_NUMBER: 50000000,
            MAX_CHARACTERS: 8,
            MIN_INCOME: 1000
        });

        this.donationInput_ = this.decorateChild('InputSber',
            this.getView().getDom().sliderInput, {
            MAX_NUMBER: 500000,
            MAX_CHARACTERS: 6,
            MIN_DONATION: 100
        });

        this.buttonReady_ = this.decorateChild('ButtonSber',
            this.getView().getDom().buttonReady
            );
    };

    /**
    * @override
    */
    DonationPercentBlock.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.keyHandler_ = new goog.events.KeyHandler(document);

        this.getHandler()
            .listen(
                this.monthlyIncome_,
                Input.Event.FOCUS,
                this.onMonthlyIncomeFocus
            ).listen(
                this.monthlyIncome_,
                Input.Event.BLUR,
                this.onMonthlyIncomeBlur
            )
            .listen(
                this.monthlyIncome_,
                Input.Event.CHANGE,
                this.onMonthlyIncomeChange
            )
            .listen(
                this.buttonReady_,
                Button.Event.CLICK,
                this.onButtonReadyClick
            )
            .listen(
                this.donationInput_,
                Input.Event.FOCUS,
                this.onDonationInputFocus
            ).listen(
                this.donationInput_,
                Input.Event.BLUR,
                this.onDonationInputBlur
            )
            .listen(
                this.keyHandler_,
                goog.events.KeyHandler.EventType.KEY,
                this.onEnterEvent_
            );


    };

    /**
     * Focus event handler
     * @param {sv.gInput.Event.Focus} event
     */
    DonationPercentBlock.prototype.onMonthlyIncomeFocus = function(event) {
        var input = this.getView().getDom().inputControlInput;
        goog.dom.setProperties(input, {'placeholder': ''});
    };

    /**
     * Blur event handler
     * @param {sv.gInput.Input.Event.Blur} event
     */
    DonationPercentBlock.prototype.onMonthlyIncomeBlur = function(event) {
        var input = this.getView().getDom().inputControlInput;
        goog.dom.setProperties(input, {'placeholder': '0'});
        this.manageButtonReadyStyle_();
    };

    /**
     * Change event handler
     * @param {sv.gInput.Input.Event.Change} event
     */
     DonationPercentBlock.prototype.onMonthlyIncomeChange = function(event) {
        console.log('changed');
    };

     /**
     * Handles ready button CLICK
     * @param {sv.gButton.Button.Event.CLICK} event
     * @protected
     */
    DonationPercentBlock.prototype.onButtonReadyClick = function(event) {
        var customEvent = new goog.events.Event(DonationPercentBlock.Event
            .DONATION_PERCENT_READY, this);

        if (this.checkDonationInputSum_()) {
            var inputSliderInput = this.getView().getDom().inputSliderInput;
            var sumValue = inputSliderInput.value;
                customEvent.payload = {
                percentSum: sumValue
                };
            this.dispatchEvent(customEvent);
        }
    };

    /**
     * checks if income sum is valid
     * @return {bool} if income sum is valid
     * @private
     */
    DonationPercentBlock.prototype.checkMonthlyIncomeSum_ = function() {
        var inputControlInput = this.getView().getDom().inputControlInput;
        inputControlInput.blur();
        return this.monthlyIncome_.validate();
    };

    /**
     * checks if donation sum is valid
     * @return {bool} if input sum is valid
     * @private
     */
    DonationPercentBlock.prototype.checkDonationInputSum_ = function() {
        var inputSliderInput = this.getView().getDom().inputSliderInput;
        inputSliderInput.blur();
        return this.donationInput_.validate();
    };

    /**
     * Focus event handler
     * @param {sv.gInput.Event.Focus} event
     */
    DonationPercentBlock.prototype.onDonationInputFocus = function(event) {
        var inputSliderInput = this.getView().getDom().inputSliderInput;
        goog.dom.setProperties(inputSliderInput, {'placeholder': ''});
    };

    /**
     * Blur event handler
     * @param {sv.gInput.Input.Event.Blur} event
     */
    DonationPercentBlock.prototype.onDonationInputBlur = function(event) {
        var inputSliderInput = this.getView().getDom().inputSliderInput;
        goog.dom.setProperties(inputSliderInput, {'placeholder': '0'});
        var sumValue = inputSliderInput.value;
        this.showResultSym(sumValue);
    };

     /**
     * Handles 'enter' event
     * @param {goog.events.KeyHandler.EventType.KEY} event
     * @private
     */
    DonationPercentBlock.prototype.onEnterEvent_ = function(event) {
        event.stopPropagation();
        var that = this;

        if (event.keyCode === goog.events.KeyCodes.ENTER) {
            this.manageButtonReadyStyle_();
        }
    };

     /**
     * enables or disables 'ready' button
     * @private
     */
    DonationPercentBlock.prototype.manageButtonReadyStyle_ = function() {
        if (this.checkMonthlyIncomeSum_()) {
                this.buttonReady_.enable();
            }
            else {
                this.buttonReady_.disable();
            }
    };

     /**
     * Show result sum of donation
     * @param {string} sumValue
     * @protected
     */
    DonationPercentBlock.prototype.showResultSym = function(sumValue) {
        this.getView().showResultSym(sumValue);
    };

});  // goog.scope
