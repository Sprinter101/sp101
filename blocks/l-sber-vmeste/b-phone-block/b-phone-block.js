goog.provide('sv.lSberVmeste.bPhoneBlock.PhoneBlock');

goog.require('cl.iControl.Control');
goog.require('cl.iRequest.Request');
goog.require('sv.gButton.Button');
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
     * @type {Array}
     * @private
     */
    this.inputs_ = [];

    /**
     * @type {Array}
     * @private
     */
    this.buttons_ = [];
    
};
goog.inherits(sv.lSberVmeste.bPhoneBlock.PhoneBlock, cl.iControl.Control);

goog.scope(function() {
    var Block = sv.lSberVmeste.bPhoneBlock.PhoneBlock,
        Button = sv.gButton.Button;

        Block.Event = {
            CLICK: 'view-phone-click',
            VERIFIED: 'verify_success',
            VERIFICATION_ERROR: 'verify_fail'
        };

        Block.prototype.decorateInternal = function(element) {
            goog.base(this, 'decorateInternal', element);

            var domInputs = this.getView().getDom().inputs;
            var domButtons = this.getView().getDom().buttons;

            for (var i in domInputs){
                this.inputs_.push(this.decorateChild('InputSber', domInputs[i]));
            }

            for (var i in domButtons) {
                this.buttons_.push(this.decorateChild('ButtonSber', domButtons[i]));
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
            phoneTextField = document.getElementsByClassName(
                                        "b-phone-block__phone-number-view")[0],
            inputNumberField = document.getElementsByClassName(
                                        "g-input__input_phone")[0],
            inputConfirmBlock = document.getElementsByClassName(
                                        "b-phone-block__input_confirmation")[0],
            inputConfirmField = document.getElementsByClassName(
                                        "g-input__input_confirmation")[0],
            inputNumberBlock = document.getElementsByClassName(
                                        "b-phone-block__input_phone")[0],
            infoTextField = document.getElementsByClassName(
                                        "b-phone-block__text")[0],
            inputValue = inputNumberField.value;


        switch(ParentClass) {
            case 'b-phone-block__enter-button':
                var confirmButton = document.getElementsByClassName("b-phone-block__confirm-button")[0];
                var phoneNumJSON = {
                    "phone" : inputValue.toString()
                };

                Request.getInstance().send({
                    url: '/auth/sms',
                    type: 'POST',
                    data: phoneNumJSON
                }).then(this.handleSuccess,
                        this.handleRejection,
                        this
                    );

                phoneTextField.innerText = inputValue;
                infoTextField.innerText = 'Введите 5-ти значный пароль из СМС';

                /** TODO Wrap it up in function
                 */
                inputConfirmBlock.style.display = 'block';
                inputNumberBlock.style.display = 'none';
                confirmButton.style.display = 'block';
                Parent.style.display = 'none';                
                break;

            case 'b-phone-block__confirm-button':
                var codeJSON = {
                    "code":inputConfirmField.value.toString()
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
     *
     * @param {Object} err
     */
    Block.prototype.handleRejection = function(err) {
        console.log(err);
    };

    /**
     *
     * @param {Object} success
     */
    Block.prototype.handleSuccess = function(success) {
        console.log("everything is fine");
    };

    /**
     * Verification error handler
     * TODO functionality
     * @param err
     */
    Block.prototype.handleVerificationRejection = function(err) {
       console.log(err)
    };

    /**
     * Verification success handler
     * TODO functionality
     * @param {Object} success
     */
    Block.prototype.handleVerificationSuccess = function(success) {
        var eventVer = {
            type: Block.Event.VERIFIED,
            detail: {
                phone: document.getElementsByClassName(
                    "b-phone-block__phone-number-view")[0].innerText.toString(),
                response: success.data
            }
        };
        this.dispatchEvent(eventVer);

    };

}); //goog.scope