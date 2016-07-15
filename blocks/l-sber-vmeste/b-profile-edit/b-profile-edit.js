goog.provide('sv.lSberVmeste.bProfileEdit.ProfileEdit');

goog.require('cl.iControl.Control');
goog.require('sv.gButton.Button');



/**
 * Profile edit block control
 * @param {sv.lSberVmeste.bProfileEdit.View} view
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sv.lSberVmeste.bProfileEdit.ProfileEdit = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

    /**
    * @type {{
    *   firstName: string,
    *   lastName: string,
    *   phoneNumber: string
    * }}
    * @private
    */
    this.userInfo_ = goog.object.clone(this.params.userInfo);

    /**
    * @type {boolean}
    * @private
    */
    this.registrationState_ = !!this.params.registrationState;

    /**
    * @type {sv.gInput.Input}
    * @private
    */
    this.firstNameInput_ = null;

    /**
    * @type {sv.gInput.Input}
    * @private
    */
    this.lastNameInput_ = null;

    /**
    * @type {sv.gInput.Input}
    * @private
    */
    this.phoneNumberInput_ = null;

    /**
    * @type {sv.gButton.Button}
    * @private
    */
    this.button_ = null;
};
goog.inherits(sv.lSberVmeste.bProfileEdit.ProfileEdit,
    cl.iControl.Control);

goog.scope(function() {
    var ProfileEdit = sv.lSberVmeste.bProfileEdit.ProfileEdit,
        Button = sv.gButton.Button,
        Input = sv.gInput.Input;

    /**
     * Events
     * @enum {string}
     */
    ProfileEdit.Event = {
        EDITING_FINISHED: 'profile-edit-editing-finished'
    };

    /**
     * @override
     * @param {Element} element
     */
    ProfileEdit.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.firstNameInput_ = this.decorateChild('InputSber',
            this.getView().getDom().inputs.firstName);

        this.lastNameInput_ = this.decorateChild('InputSber',
            this.getView().getDom().inputs.lastName);

        this.phoneNumberInput_ = this.decorateChild('InputSber',
            this.getView().getDom().inputs.phoneNumber);

        this.createButton(this.registrationState_);

        this.setInputsValues();

        this.phoneNumberInput_.disable();
    };

    /**
     * @override
     */
    ProfileEdit.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler()
        .listen(
            this.button_,
            Button.Event.CLICK,
            this.onButtonClick_,
            false,
            this
        )
        .listen(
            this.button_,
            Button.Event.ENTER_KEY_PRESS,
            this.onButtonEnterKeyPress_,
            false,
            this
        );

        this.addInputsListeners();
    };

    /**
    * Button creator
    * @param {boolean} isRegistration
    */
    ProfileEdit.prototype.createButton = function(isRegistration) {
        var domButtonBlock = this.getView().getDom().button;

        this.button_ = this.decorateChild('ButtonSber', domButtonBlock);

        this.button_.setValue(
            isRegistration ? 'Продолжить' : 'Сохранить'
        );

        if (isRegistration) {
            this.button_.disable();
        }
    };

    /**
    * Adds input listeners
    */
    ProfileEdit.prototype.addInputsListeners = function() {
        var inputs = [
            this.firstNameInput_,
            this.lastNameInput_,
            this.phoneNumberInput_
        ];

        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i];

            this.getHandler()
            .listen(
                input,
                Input.Event.NOT_VALID,
                this.onInputNotValid_,
                false,
                this
            )
            .listen(
                input,
                Input.Event.VALID,
                this.onInputValid_,
                false,
                this
            )
            .listen(
                input,
                Input.Event.ENTER_KEY_PRESS,
                this.onInputEnterKeyPress_,
                false,
                this
            );
        }
    };

    /**
    * Input values setter
    */
    ProfileEdit.prototype.setInputsValues = function() {
        this.firstNameInput_.setValue(
            this.userInfo_.firstName || '');
        this.lastNameInput_.setValue(
            this.userInfo_.lastName || '');
        this.phoneNumberInput_.setValue(
            this.userInfo_.phoneNumber || '');
    };

    /**
    * assigns userInfo_ object properties with 
    * the current inputs' values
    */
    ProfileEdit.prototype.updateUserInfo = function() {
        this.userInfo_.firstName =
            this.firstNameInput_.getValue().trim();
        this.userInfo_.lastName =
            this.lastNameInput_.getValue().trim();
        this.userInfo_.phoneNumber =
            this.phoneNumberInput_.getValue().trim();
    };

    /**
    * Input's NOT_VALID event handler
    * @private
    */
    ProfileEdit.prototype.onInputNotValid_ = function() {
        this.button_.disable();
    };

    /**
    * Input's VALID event handler
    * @private
    */
    ProfileEdit.prototype.onInputValid_ = function() {
        if (this.areAllInputsValid()) {
            this.button_.enable();
        }
    };

    /**
    * Checks if all of the inputs are valid
    * @return {Boolean}
    */
    ProfileEdit.prototype.areAllInputsValid = function() {
        return this.firstNameInput_.isValid() &&
            this.lastNameInput_.isValid() &&
            this.phoneNumberInput_.isValid();
    };

    /**
    * Dispatches EDITING_FINISHED event 
    * with the updated userInfo_ object
    */
    ProfileEdit.prototype.finishEditing = function() {
        this.updateUserInfo();

        this.dispatchEvent({
            'type': ProfileEdit.Event.EDITING_FINISHED,
            'userInfo': this.userInfo_
        });
    };

    /**
    * Button click handler
    * @private
    */
    ProfileEdit.prototype.onButtonClick_ = function() {
        this.finishEditing();
    };

    /**
    * Confirm button enter key press event handler
    * @private
    */
    ProfileEdit.prototype.onButtonEnterKeyPress_ = function() {
        this.finishEditing();
    };

    /**
    * Input enter key press event handler
    * @private
    */
    ProfileEdit.prototype.onInputEnterKeyPress_ = function() {
        if (this.areAllInputsValid()) {
            this.finishEditing();
        }
    };

});  // goog.scope
