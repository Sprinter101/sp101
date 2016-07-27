goog.provide('sv.lSberVmeste.bDonationPercentBlock.DonationPercentBlock');

goog.require('cl.iControl.Control');
goog.require('goog.dom');
goog.require('goog.events.EventType');
goog.require('sv.gButton.Button');
goog.require('sv.gInput.Input');
goog.require('sv.gSlider.Slider');
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
     * donation percent slider
     * @type {sv.gSlider.Slider}
    * @private
    */
    this.donationSlider_ = null;

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
goog.inherits(sv.lSberVmeste.bDonationPercentBlock
    .DonationPercentBlock,
    cl.iControl.Control);


goog.scope(function() {
    var DonationPercentBlock = sv.lSberVmeste.bDonationPercentBlock.
            DonationPercentBlock,
        View = sv.lSberVmeste.bDonationPercentBlock.View,
        Input = sv.gInput.Input,
        Button = sv.gButton.Button,
        Slider = sv.gSlider.Slider;

       /**
     * Event enum
     * @enum {string}
     */
    DonationPercentBlock.Event = {
        DONATION_PERCENT_READY: 'donation-percent-ready'
    };

     /**
     * Max donation sum
     */
    DonationPercentBlock.MAX_RESULT_SUM = 500000;

    /**
    * @override
    * @param {Element} element
    */
    DonationPercentBlock.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);
        this.monthlyIncome_ = this.decorateChild('InputSber',
            this.getView().getDom().inputControl
        );

        this.donationSlider_ = this.decorateChild('SliderSber',
            this.getView().getDom().slider);

        this.buttonReady_ = this.decorateChild('ButtonSber',
            this.getView().getDom().buttonReady
            );

        this.initView_();
    };

    /**
    * @override
    */
    DonationPercentBlock.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

       this.KeyHandler_ = new goog.events.KeyHandler(document);

        this.getHandler()
            .listen(
                this.monthlyIncome_,
                Input.Event.BLUR,
                this.onMonthlyIncomeBlur_
            )
             .listen(this.monthlyIncome_,
                Input.Event.INPUT,
                this.onMonthlyIncomeInput_
            )
            .listen(
                this.buttonReady_,
                Button.Event.CLICK,
                this.onButtonReadyClick_
            )
            .listen(
                this.donationSlider_,
                Slider.Event.SLIDER_MOVE,
                this.onSliderMove_
            )
           .listen(
                this.monthlyIncome_,
                Input.Event.ENTER_KEY_PRESS,
                this.onEnterPress_
            )
           .listen(
                this.KeyHandler_,
                goog.events.KeyHandler.EventType.KEY,
                this.onCommonKeyEvent_
            );
    };

    /**
     * init block view
     * @private
     */
    DonationPercentBlock.prototype.initView_ = function() {
        var currentPercent = this.donationSlider_.getValue();
        this.currentPercent_ = parseInt(currentPercent, 10);
        var sum = this.monthlyIncome_.getValue();
        if (sum) {
            this.monthlyIncome_.sum = parseInt(sum, 10);
            this.resultSum_ = this.CalculateDonation_(
                this.monthlyIncome_.sum, currentPercent);
            this.showResultSum_(this.resultSum_);
        }
        else {
            this.monthlyIncome_.sum = 0;
            this.manageButtonReadyStyle_(this.resultSum_);
        }

    };

    /**
     * Input event handler
     * @param {sv.gInput.Input.Event.Input} event
     * @private
     */
    DonationPercentBlock.prototype.onMonthlyIncomeInput_ = function(event) {
        this.buttonReady_.enable();
        this.donationSlider_.enable();
    };

    /**
     * Blur event handler
     * @param {sv.gInput.Input.Event.Blur} event
     * @private
     */
    DonationPercentBlock.prototype.onMonthlyIncomeBlur_ = function(event) {
        this.monthlyIncome_.sum = this.monthlyIncome_.getValue();
        var currentPercent = this.donationSlider_.getValue();

        if (this.checkMonthlyIncomeSum_()) {
        this.checkResultSum_(currentPercent);
        this.manageSliderStyle_();
        this.manageButtonReadyStyle_(this.resultSum_);
        }
        else {
            this.hideResultSum_();
            this.resultSum_ = 0;
        }
    };

     /**
     * Check result donation sum and manage result block view
     * @param {number} currentPercent - donation percent from slider
     * @private
     */
     DonationPercentBlock.prototype.checkResultSum_ = function(currentPercent) {
        var resultSum = this.CalculateDonation_(this.monthlyIncome_.sum,
            currentPercent);
        var mode = true;
        this.resultSum_ = resultSum;
        if (resultSum > DonationPercentBlock.MAX_RESULT_SUM) {
            mode = false;
            this.resultSum_ = 0;
        }
        this.showResultSum_(resultSum, mode);
        this.manageButtonReadyStyle_(this.resultSum_);

     };

    /**
     * Calculate donation sum
     * @param {string} sum - user monthly income
     * @param {number} percent - donation percent from slider
     * @return {number} resultSum
     * @private
     */
     DonationPercentBlock.prototype.CalculateDonation_ = function(
        sum, percent) {
        sum = parseInt(sum, 10);
        percent /= 100;
        var resultSum = sum * percent;
        resultSum = Math.round(resultSum);
        return resultSum;
    };

     /**
     * Handles ready button CLICK
     * @param {sv.gButton.Button.Event.CLICK} event
     * @private
     */
    DonationPercentBlock.prototype.onButtonReadyClick_ = function(event) {
        var customEvent = new goog.events.Event(DonationPercentBlock.Event
            .DONATION_PERCENT_READY, this);

        if (this.resultSum_) {
            customEvent.payload = {
                percentSum: this.resultSum_
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
        return this.monthlyIncome_.validate();
    };

     /**
     * slider move event handler
     * @param {sv.gSlider.Event.SLIDER_MOVE} event
     * @private
     */
    DonationPercentBlock.prototype.onSliderMove_ = function(event) {
        this.monthlyIncome_.sum = this.monthlyIncome_.getValue();
        var currentPercent = event.payload.percent;
        if (this.checkMonthlyIncomeSum_()) {
            this.checkResultSum_(currentPercent);
        }
        this.manageButtonReadyStyle_(this.resultSum_);
    };

     /**
     * Handles Enter press key event
     * @param {sv.gInput.Input.Event.ENTER_KEY_PRESS} event
     * @private
     */
    DonationPercentBlock.prototype.onEnterPress_ = function(event) {
        event.stopPropagation();
        this.onMonthlyIncomeBlur_();
        var inputInput = this.getView().getDom().inputInput;
        inputInput.blur();
    };

    /**
     * Handles 'enter' event
     * @param {goog.events.KeyHandler.EventType.KEY} event
     * @private
     */
    DonationPercentBlock.prototype.onCommonKeyEvent_ = function(event) {
        event.stopPropagation();
        var that = this;
        var digits = DonationPercentBlock.KEYCODES;
        if (event.keyCode === goog.events.KeyCodes.ENTER) {
            this.manageButtonReadyStyle_(this.resultSum_);
            this.manageSliderStyle_();
        }
    };

     /**
     * enables or disables 'ready' button
     * @param {number} resultSum - sum of donation
     * @private
     */
    DonationPercentBlock.prototype.manageButtonReadyStyle_ = function(
        resultSum) {
        if (resultSum) {
            this.buttonReady_.enable();
        }
        else {
            this.buttonReady_.disable();
        }
    };

     /**
     * enables or disables percent slider
     * @private
     */
    DonationPercentBlock.prototype.manageSliderStyle_ = function() {
        if (this.checkMonthlyIncomeSum_()) {
            this.donationSlider_.enable();
        }
        else {
            this.donationSlider_.disable();
        }
    };

     /**
     * Show result sum of donation
     * @param {string} sumValue
     * @param {bool} mode
     * @private
     */
    DonationPercentBlock.prototype.showResultSum_ = function(sumValue, mode) {
        this.getView().showResultSum(sumValue, mode);
    };

     /**
     * hides donation sum because income is not valid
     * @private
     */
    DonationPercentBlock.prototype.hideResultSum_ = function() {
        this.getView().hideResultSum();
    };

});  // goog.scope
