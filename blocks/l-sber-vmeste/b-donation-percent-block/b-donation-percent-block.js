goog.provide('sv.lSberVmeste.bDonationPercentBlock.DonationPercentBlock');

goog.require('cl.iControl.Control');
goog.require('goog.dom');
goog.require('goog.events.EventType');
goog.require('sv.gInput.Input');
goog.require('sv.gButton.Button');
goog.require('sv.lSberVmeste.bDonationPercentBlock.View');



/**
 * sv.lSberVmeste.bDonationPercentBlock.DonationPercentBlock control
 * @param {sv.lSberVmeste.bDonationPercentBlock.View} view View used to render or
 *     decorate the component; defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {'cl.iControl.Control'}
 */
sv.lSberVmeste.bDonationPercentBlock.DonationPercentBlock = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

    /**
    * @type {sv.gInput.Input}
    * @private
    */
    this.monthlyIncome = null;

    /**
    * @type {sv.gButton.Button}
    * @private
    */
    this.buttonReady_ = null;

};
goog.inherits(sv.lSberVmeste.bDonationPercentBlock.DonationPercentBlock, cl.iControl.Control);


goog.scope(function() {
    var DonationPercentBlock = sv.lSberVmeste.bDonationPercentBlock.DonationPercentBlock,
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
        BUTTON_READY_CLICK: 'button-ready-click'
    };


    /**
    * @override
    * @param {Element} element
    */
    DonationPercentBlock.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);
        this.monthlyIncome_ = this.decorateChild('InputSber',
            this.getView().getDom().input, {
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
    DonationPercentBlock.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

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
            );


    };

    /**
     * Focus event handler
     * @param {sv.gInput.Event.Focus} event
     */
    DonationPercentBlock.prototype.onMonthlyIncomeFocus = function(event) {
        var input = this.getElementByClass('g-input__input', this);
        goog.dom.setProperties(input, {'placeholder': ""});
    };

    /**
     * Blur event handler
     * @param {sv.gInput.Input.Event.Blur} event
     */
    DonationPercentBlock.prototype.onMonthlyIncomeBlur = function(event) {
        console.log('blur');
        var input = this.getElementByClass('g-input__input', this);
        goog.dom.setProperties(input, {'placeholder': "0"});
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
        console.log("Ready button click");
        this.monthlyIncome_.onBlur();
        this.dispatchEvent({
             type: DonationPercentBlock.Event.BUTTON_READY_CLICK
         });
    };

});  // goog.scope
