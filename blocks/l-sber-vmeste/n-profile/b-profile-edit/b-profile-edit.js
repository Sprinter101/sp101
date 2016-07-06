goog.provide('sv.lSberVmeste.bProfileEdit.ProfileEdit');

goog.require('cl.iControl.Control');
goog.require('sv.gButton.Button');



/**
 * Card List control
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
    this.confirmButton_ = null;
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
        CONFIRM_BUTTON_CLICK: 'profile-edit-confirm-button-click'
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

        this.confirmButton_ = this.decorateChild('ButtonSber',
            this.getView().getDom().confirmButton);

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
            this.confirmButton_,
            Button.Event.CLICK,
            this.onConfirmButtonClick_,
            false,
            this
        );
    };

    /**
    * Confirm button click handler
    * @private
    */
    ProfileEdit.prototype.onConfirmButtonClick_ = function() {
        this.userInfo_.firstName =
            this.getView().getFirstNameInputValue();
        this.userInfo_.lastName =
            this.getView().getLastNameInputValue();
        this.userInfo_.phoneNumber =
            this.getView().getPhoneNumberInputValue();

        this.dispatchEvent({
            'type': ProfileEdit.Event.CONFIRM_BUTTON_CLICK,
            'userInfo': this.userInfo_
        });
    };

});  // goog.scope
