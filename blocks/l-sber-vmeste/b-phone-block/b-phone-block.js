goog.provide('sv.lSberVmeste.bPhoneBlock.PhoneBlock');

goog.require('cl.iControl.Control');
goog.require('cl.iRequest.Request');
goog.require('sv.gButton.Button');
goog.require('sv.gInput.Input');
goog.require('sv.lSberVmeste.bPhoneBlock.View');

/**
 * @param {sv.lSberVmeste.bPhoneBlock.View} view View used to render or
 *     decorate the component; defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {cl.iControl.Control}
 */

sv.lSberVmeste.bPhoneBlock.PhoneBlock = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

    /**
     *
     * @type {sv.gInput.Input}
     * @private
     */
    this.textPhone_ = null;

    /**
     *
     * @type {sv.gInput.Input}
     * @private
     */
    this.textInfo_ = null;

    /**
     * @type {sv.gInput.Input}
     * @private
     */
    this.inputPhoneNumber_ = null;

    /**
     * @type {sv.gInput.Input}
     * @private
     */
    this.inputVerificationCode_ = null;

    /**
     * @type {Array}
     * @private
     */
    this.buttons_ = [];
};
goog.inherits(sv.lSberVmeste.bPhoneBlock.PhoneBlock, cl.iControl.Control);

goog.scope(function() {
    var Block = sv.lSberVmeste.bPhoneBlock.PhoneBlock,
        Button = sv.gButton.Button,
        Input = sv.gInput.Input;


    /**
     * Events
     * @enum {string}
     */
    Block.Event = {
        CLICK: 'view-phone-click',
        VERIFIED: 'verify_success',
        VERIFICATION_ERROR: 'verify_fail'
    };

    /**
     * @override
     * @param {Element} element
     */
    Block.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        var domTexts = this.getView().getDom().texts;
        var domInputs = this.getView().getDom().inputs;
        var domButtons = this.getView().getDom().buttons;

        this.textPhone_ = domTexts.textPhoneNumber;
        this.textInfo_ = domTexts.textOntopInput;

        this.inputPhoneNumber_ = this.decorateChild(
                        'InputSber', domInputs.phoneNumber);
        this.inputVerificationCode_ = this.decorateChild(
                        'InputSber', domInputs.confirmCode);

        for (var i in domButtons) {
            this.buttons_.push(
                this.decorateChild('ButtonSber', domButtons[i])
            );
        }

        for (var i = 0; i < this.buttons_.length; i++) {
            this.buttons_[i].disable();
        }
    };

    /**
     * @override
     */
    Block.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        for (var i = 0; i < this.buttons_.length; i++) {
            goog.events.listen(
                this.buttons_[i],
                Button.Event.CLICK,
                this.onButtonClick_,
                false,
                this
            );
        }

        this.addInputsListeners();
    };

    /**
     * Inputs listeners adder
     */
    Block.prototype.addInputsListeners = function() {
        var inputs = [
            this.inputPhoneNumber_,
            this.inputVerificationCode_
        ];
        this.getHandler()
            .listen(
                inputs[0],
                Input.Event.NOT_VALID,
                this.onPhoneInputNotValid_,
                false,
                this
            )
            .listen(
                inputs[0],
                Input.Event.VALID,
                this.onPhoneInputValid_,
                false,
                this
            );

        this.getHandler()
            .listen(
                inputs[1],
                Input.Event.NOT_VALID,
                this.onCodeInputNotValid_,
                false,
                this
            )
            .listen(
                inputs[1],
                Input.Event.VALID,
                this.onCodeInputValid_,
                false,
                this
            );

    };

    /**
     * Button click handler
     * @param {Event} event
     * @private
     */
    Block.prototype.onButtonClick_ = function(event) {
        var Parent = event.target.element_.parentElement,
            ParentClass = Parent.classList[0],
            Request = cl.iRequest.Request,

            inputNumberField = this.inputPhoneNumber_.element_.firstChild,
            inputConfirmField = this.inputVerificationCode_.element_.firstChild,

            inputValue = inputNumberField.value;

        switch (ParentClass) {
            case 'b-phone-block__enter-button':
                var phoneNumJSON = {
                    'phone': inputValue.toString()
                };

                Request.getInstance().send({
                    url: '/auth/sms',
                    type: 'POST',
                    data: phoneNumJSON
                }).then(
                    this.handleSuccess,
                    this.handleRejection,
                    this
                );


                break;

            case 'b-phone-block__confirm-button':
                var codeJSON = {
                    'code': inputConfirmField.value.toString()
                };
                Request.getInstance().send({
                    url: '/auth/verify',
                    type: 'POST',
                    data: codeJSON
                }).then(this.handleVerificationSuccess,
                    this.handleVerificationRejection,
                    this
                );

                break;

            default:
                break;
        }
    };

    /**
     * Phone input reject handler
     * @param {Object} err
     */
    Block.prototype.handleRejection = function(err) {
        console.error(err);
    };

    /**
     * Phone input success handler
     * success.data contains verification code for the next step
     * @param {Object} success
     */
    Block.prototype.handleSuccess = function(success) {
        if (success.data) {
            console.log(success);
            this.inputVerificationCode_.setValue(success.data);
        }
        var infoTextField = this.textInfo_,
            phoneTextField = this.textPhone_,

            buttonEnter = this.buttons_[0].element_.parentElement,
            confirmButton = this.buttons_[1].element_.parentElement,

            inputNumberBlock = this.inputPhoneNumber_.element_.parentElement,
            inputNumberField = this.inputPhoneNumber_.element_.firstChild,
            inputConfirmBlock =
                this.inputVerificationCode_.element_.parentElement;

        phoneTextField.innerText = inputNumberField.value;
        infoTextField.innerText = 'Введите 3-х значный пароль из СМС';

        this.hideElements([inputNumberBlock, buttonEnter]);
        this.showElements([inputConfirmBlock, confirmButton], 'block');
    };

    /**
     * Verification error handler
     * @param {Object} err
     */
    Block.prototype.handleVerificationRejection = function(err) {
        console.error(err);
        var eventVerSuccess = {
            type: Block.Event.VERIFICATION_ERROR,
            detail: {
                phone: this.textPhone_.innerText.toString(),
                response: err.data
            }
        };
        this.dispatchEvent(eventVerSuccess);
    };

    /**
     * Verification success handler
     * @param {Object} success
     */
    Block.prototype.handleVerificationSuccess = function(success) {
        var eventVerSuccess = {
            type: Block.Event.VERIFIED,
            detail: {
                phone: this.textPhone_.innerText.toString(),
                response: success.data
            }
        };
        this.dispatchEvent(eventVerSuccess);
    };

    /**
     * hide Block objects
     * @param {Array} array
     */
    Block.prototype.hideElements = function(array) {
        for (var i = 0; i < array.length; i++) {
            array[i].style.display = 'none';
        }
    };

    /**
     * hide Block objects
     * @param {Object} object
     */
    Block.prototype.hideElement = function(object) {
        object.style.display = 'none';
    };
    /**
     * Show Block object
     * @param {Array} array
     * @param {String} showType
     */
    Block.prototype.showElements = function(array, showType) {
        for (var i = 0; i < array.length; i++) {
            array[i].style.display = showType;
        }
    };

    /**
     * verification Code VALID handler
     * @private
     */
    Block.prototype.onCodeInputValid_ = function() {
        this.buttons_[1].enable();
    };

    /**
     * verification Code NOT_VALID handler
     * @private
     */
    Block.prototype.onCodeInputNotValid_ = function() {
        this.buttons_[1].disable();
    };

    /**
     * Phone Number VALID handler
     * @private
     */
    Block.prototype.onPhoneInputValid_ = function() {
        this.buttons_[0].enable();
    };

    /**
     * Phone Number NOT_VALID handler
     * @private
     */
    Block.prototype.onPhoneInputNotValid_ = function() {
        this.buttons_[0].disable();
    };

});  // goog.scope
