goog.provide('sv.lSberVmeste.bDonateBlock.DonateBlock');

goog.require('cl.iControl.Control');
goog.require('goog.dom');
goog.require('goog.events.EventType');
goog.require('sv.gInput.Input');
goog.require('sv.gButton.Button');
goog.require('sv.lSberVmeste.bDonateBlock.View');



/**
 * sv.lSberVmeste.bDonateBlock.DonateBlock control
 * @param {sv.lSberVmeste.bDonateBlock.View} view View used to render or
 *     decorate the component; defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {'cl.iControl.Control'}
 */
sv.lSberVmeste.bDonateBlock.DonateBlock = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

    /**
    * @type {sv.gInput.Input}
    * @private
    */
    this.fixedSum_ = null;

    /**
    * input for donator's monthly revenue
    * @type {sv.gInput.Input}
    * @private
    */
    this.monthlyIncome_ = null;

    /**
    * @type {sv.gButton.Button}
    * @private
    */
    this.buttonReady_ = null;

};
goog.inherits(sv.lSberVmeste.bDonateBlock.DonateBlock, cl.iControl.Control);


goog.scope(function() {
    var DonateBlock = sv.lSberVmeste.bDonateBlock.DonateBlock,
        View = sv.lSberVmeste.bDonateBlock.View,
        Input = sv.gInput.Input,
        Button = sv.gButton.Button;

       /**
     * Event enum
     * @enum {string}
     */
    DonateBlock.Event = {
        INPUT_FOCUS: 'input-focus',
        INPUT_CHANGE: 'input-change',
        SLIDER_MOVE: 'slider-move',
        BUTTON_READY_CLICK: 'button-ready-click'
    };


    /**
    * @override
    * @param {Element} element
    */
    DonateBlock.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);
        this.fixedSum_ = this.decorateChild('InputSber',
            this.getView().getDom().fixedSum, {
            MAX_NUMBER: 500000,
            MAX_CHARACTERS: 6
        });

         this.monthlyIncome_ = this.decorateChild('InputSber',
            this.getView().getDom().income, {
            MAX_NUMBER: 500000,
            MAX_CHARACTERS: 76
        });
        console.log("monthly income input: ", this.monthlyIncome_);

        this.buttonReady_ = this.decorateChild('ButtonSber',
            this.getView().getDom().buttonReady
            );
    };

    /**
    * @override
    */
    DonateBlock.prototype.enterDocument = function() {
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
            )
            .listen(
                this.monthlyIncome_,
                Input.Event.FOCUS,
                this.onMonthlyIncomeFocus
                )
            .listen(
                this.monthlyIncome_,
                Input.Event.CHANGE,
                this.onMonthlyIncomeChange
            );


    };

    /**
     * Focus event handler
     * @param {sv.gInput.Event.Focus} event
     */
    DonateBlock.prototype.onfixedSumFocus = function(event) {
        var input = this.getElementByClass('g-input__input', this);
        goog.dom.setProperties(input, {'placeholder': ""});
    };

    /**
     * Blur event handler
     * @param {sv.gInput.Input.Event.Blur} event
     */
    DonateBlock.prototype.onfixedSumBlur = function(event) {
        console.log('blur');
        var input = this.getElementByClass('g-input__input', this);
        goog.dom.setProperties(input, {'placeholder': "0"});
    };

    /**
     * Change event handler
     * @param {sv.gInput.Input.Event.Change} event
     */
     DonateBlock.prototype.onfixedSumChange = function(event) {
        console.log('changed');
    };

     /**
     * Focus event handler
     * @param {sv.gInput.Event.Focus} event
     */
    DonateBlock.prototype.onMonthlyIncomeFocus = function(event) {
        var input = this.getElementByClass('g-input__input', this);
        goog.dom.setProperties(input, {'placeholder': ""});
    };

    /**
     * Change event handler
     * @param {sv.gInput.Input.Event.Change} event
     */
     DonateBlock.prototype.onMonthlyIncomeChange = function(event) {
        console.log('changed');
    };

    /**
     * Handles ready button CLICK
     * @param {sv.gButton.Button.Event.CLICK} event
     * @protected
     */
    DonateBlock.prototype.onButtonReadyClick = function(event) {
        console.log("Ready button click");
        this.fixedSum_.onBlur();
        this.dispatchEvent({
             type: DonateBlock.Event.BUTTON_READY_CLICK
         });
    };

});  // goog.scope
