goog.provide('sv.lSberVmeste.bPhoneBlock.PhoneBlock');

goog.require('cl.iControl.Control');
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
        View = sv.lSberVmeste.bPhoneBlock.View;
        Button = cl.gButton.Button;

        Block.prototype.decorateInternal = function(element) {
            goog.base(this, 'decorateInternal', element);

            var domInputs = this.getView().getDom().inputs;
            var domButtons = this.getView().getDom().buttons;

            for (var i = 0 ; i < domInputs.length; i++){
                this.inputs_.push(this.decorateChild('InputSber', domInputs[i]));
            }

            for (var i = 0 ; i < domButtons.length; i++) {
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
                this.onButtonClick_
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
                                        "b-phone-block__welcome")[0];

        var testJSON = '{"confirmPass":"66666"}',
            testParsed = JSON.parse(testJSON);


        switch(ParentClass) {
            case 'b-phone-block__enter-button':
                var confirmButton = document.getElementsByClassName("b-phone-block__confirm-button")[0],
                    registryButton = document.getElementsByClassName("b-phone-block__registry-button")[0],
                    inputValue = inputNumberField.value.toString();
                    
                //Temporary object, may have more attributes in future
                var phoneNumJSON = {
                    phoneNum : inputValue,
                    timeStamp : Date.now()
                }

                /** TO-DO
                 * check input validation state
                 */

                phoneTextField.innerText = inputValue;
                infoTextField.innerText = 'Введите 5-ти значный пароль из СМС';

                inputConfirmBlock.style.display = 'block';
                inputNumberBlock.style.display = 'none';
                confirmButton.style.display = 'block';
                Parent.style.display = 'none';
                registryButton.style.display = 'none';
                
                break;

            case 'b-phone-block__confirm-button':
                //var enterButton = document.getElementsByClassName("b-phone-block__enter-button")[0];
                //
                // enterButton.style.display = 'block';
                // Parent.style.display = 'none';
                if(testParsed.confirmPass == inputConfirmField.value.toString())
                {
                    alert('Success');
                }

                break;

            default:
                break;
        }

        console.log(JSON.stringify(phoneNumJSON));
    };
    
}); //goog.scope