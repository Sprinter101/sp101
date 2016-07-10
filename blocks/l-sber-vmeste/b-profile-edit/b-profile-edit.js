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
        Button = sv.gButton.Button;

    /**
     * Events
     * @enum {string}
     */
    ProfileEdit.Event = {
        BUTTON_CLICK: 'profile-edit-button-click'
    };

    /**
     * @override
     * @param {Element} element
     */
    ProfileEdit.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        // this.firstNameInput = this.decorateChild('InputSber',
        //     this.getView().getDom().inputs.firstName);

        // this.lastNameInput = this.decorateChild('InputSber',
        //     this.getView().getDom().inputs.lastName);

        // this.phoneNumberInput = this.decorateChild('InputSber',
        //     this.getView().getDom().inputs.phoneNumber);

        this.createButton(this.registrationState_);

        this.getView().setFirstNameInputValue(this.userInfo_.firstName);
        this.getView().setLastNameInputValue(this.userInfo_.lastName);
        this.getView().setPhoneNumberInputValue(
            this.userInfo_.phoneNumber);
    };

    /**
     * @override
     */
    ProfileEdit.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler().listen(
            this.button_,
            Button.Event.CLICK,
            this.onButtonClick_,
            false,
            this
        );
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
    };

    /**
    * Confirm button click handler
    * @private
    */
    ProfileEdit.prototype.onButtonClick_ = function() {
        this.userInfo_.firstName =
            this.getView().getFirstNameInputValue();
        this.userInfo_.lastName =
            this.getView().getLastNameInputValue();
        this.userInfo_.phoneNumber =
            this.getView().getPhoneNumberInputValue();

        this.dispatchEvent({
            'type': ProfileEdit.Event.BUTTON_CLICK,
            'userInfo': this.userInfo_
        });
    };

});  // goog.scope
