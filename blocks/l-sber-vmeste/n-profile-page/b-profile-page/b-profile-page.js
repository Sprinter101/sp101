goog.provide('sv.lSberVmeste.bProfilePage.ProfilePage');

goog.require('cl.iControl.Control');
goog.require('sv.lSberVmeste.bProfile.Profile');
goog.require('sv.lSberVmeste.bProfileEdit.ProfileEdit');



/**
 * Profile page control
 * @param {sv.lSberVmeste.bProfilePage.View} view
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sv.lSberVmeste.bProfilePage.ProfilePage = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

    //SERVER RESPONSE INFO EMULATION
    this.userInfo = {
        firstName: 'Павел',
        lastName: 'Козлов',
        phoneNumber: '+79254487098'
    };
    //

    /**
    * @type {sv.lSberVmeste.bProfile.Profile|
    * sv.lSberVmeste.bProfileEdit.ProfileEdit}
    * @private
    */
    this.profileBlock_ = null;
};
goog.inherits(sv.lSberVmeste.bProfilePage.ProfilePage,
    cl.iControl.Control);

goog.scope(function() {
    var ProfilePage = sv.lSberVmeste.bProfilePage.ProfilePage,
        Profile = sv.lSberVmeste.bProfile.Profile,
        ProfileEdit = sv.lSberVmeste.bProfileEdit.ProfileEdit;

    /**
     * Events
     * @enum {string}
     */
    ProfilePage.Event = {};

    /**
    * @override
    * @param {Element} element
    */
    ProfilePage.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);
    };

    /**
    * @override
    */
    ProfilePage.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.createProfileBlock();
    };


    /**
    * Profile block creator
    */
    ProfilePage.prototype.createProfileBlock = function() {
        this.removeProfileBlock_();

        var domProfileBlock = this.getView().getDom().profileBlock;

        this.profileBlock_ = this.renderChild('Profile',
            domProfileBlock, {userInfo: this.userInfo});

        this.getHandler().listen(
            this.profileBlock_,
            Profile.Event.EDIT_BUTTON_CLICK,
            this.onProfileButtonClick_,
            false,
            this
        );
    };

    /**
    * Profile edit block creator
    */
    ProfilePage.prototype.createProfileEditBlock = function() {
        this.removeProfileBlock_();

        var domProfileBlock = this.getView().getDom().profileBlock;

        this.profileBlock_ = this.renderChild('ProfileEdit',
            domProfileBlock, {userInfo: this.userInfo});

        this.getHandler().listen(
            this.profileBlock_,
            ProfileEdit.Event.EDITING_FINISHED,
            this.onProfileEditButtonClick_,
            false,
            this
        );
    };

    /**
    * Profile button click handler
    * @private
    */
    ProfilePage.prototype.onProfileButtonClick_ = function() {
        this.createProfileEditBlock();
    };

    /**
    * ProfileEdit button click handler
    * @param {Object} event
    * @private
    */
    ProfilePage.prototype.onProfileEditButtonClick_ = function(event) {
        goog.object.extend(this.userInfo, event.userInfo);
        this.createProfileBlock();
    };

    /**
    * Removes current block
    * @private
    */
    ProfilePage.prototype.removeProfileBlock_ = function() {
        if (this.profileBlock_) {
            this.profileBlock_.dispose();
            this.profileBlock_ = null;
        }
    };

});  // goog.scope
