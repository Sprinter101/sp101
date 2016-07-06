goog.provide('sv.lSberVmeste.bProfile.Profile');

goog.require('cl.iControl.Control');
goog.require('sv.gButton.Button');



/**
 * Card List control
 * @param {sv.lSberVmeste.bProfile.View} view
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sv.lSberVmeste.bProfile.Profile = function(view, opt_domHelper) {
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
    * @type {sv.gButton.Button}
    * @private
    */
    this.editButton_ = null;
};
goog.inherits(sv.lSberVmeste.bProfile.Profile, cl.iControl.Control);

goog.scope(function() {
    var Profile = sv.lSberVmeste.bProfile.Profile,
        Button = sv.gButton.Button;

    /**
     * Events
     * @enum {string}
     */
    Profile.Event = {
        EDIT_BUTTON_CLICK: 'profile-edit-button-click'
    };

    /**
    * @override
    * @param {Element} element
    */
    Profile.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        var domEditButton = this.getView().getDom().editButton;

        this.getView().setProfileText(this.userInfo_.firstName);

        this.getView().setName(this.userInfo_.firstName,
            this.userInfo_.lastName);

        this.getView().setPhoneNumber(this.userInfo_.phoneNumber);

        this.editButton_ = this.decorateChild('ButtonSber',
            domEditButton);
    };

    /**
    * @override
    */
    Profile.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler().listen(
            this.editButton_,
            Button.Event.CLICK,
            this.onEditButtonClick_,
            false,
            this
        );
    };

    /**
    * Edit button ckick event handler
    * @private
    */
    Profile.prototype.onEditButtonClick_ = function() {
        this.dispatchEvent(Profile.Event.EDIT_BUTTON_CLICK);
    };

});  // goog.scope
