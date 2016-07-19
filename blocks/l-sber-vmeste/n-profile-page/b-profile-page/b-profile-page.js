goog.provide('sv.lSberVmeste.bProfilePage.ProfilePage');

goog.require('cl.iControl.Control');
goog.require('cl.iRequest.Request');
goog.require('sv.lSberVmeste.bProfile.Profile');
goog.require('sv.lSberVmeste.bProfileEdit.ProfileEdit');
goog.require('sv.lSberVmeste.iRouter.Route');
goog.require('sv.lSberVmeste.iRouter.Router');



/**
 * Profile page control
 * @param {sv.lSberVmeste.bProfilePage.View} view
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sv.lSberVmeste.bProfilePage.ProfilePage = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

    /**
    * @type {{
    *   firstName: string,
    *   lastName: string,
    *   phone: string,
    * }}
    * @private
    */
    this.userInfo_ = {};

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
        request = cl.iRequest.Request.getInstance(),
        Route = sv.lSberVmeste.iRouter.Route,
        Router = sv.lSberVmeste.iRouter.Router,
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

        this.sendGetUserInfoRequest();
    };

    /**
    * Sends ajax request to get the user info
    */
    ProfilePage.prototype.sendGetUserInfoRequest = function() {
        request
            .send({url: 'user/'})
            .then(
                this.onGetUserInfoResponse,
                this.onGetUserInfoRejection,
                this);
    };

    /**
    * Successful user info request response handler
    * @param {Object} response
    */
    ProfilePage.prototype.onGetUserInfoResponse = function(response) {
        var response = response.data;

        if (response.loggedIn) {

            goog.object.extend(this.userInfo_, response);

            this.createProfileBlock();
        } else {
            this.redirectToRegistrationPage();
        }
    };

    /**
    * Rejected user info request response handler
    * @param {Object} err
    */
    ProfilePage.prototype.onGetUserInfoRejection = function(err) {
        console.log(err);
    };

    /**
    * Redirects user to registration page
    */
    ProfilePage.prototype.redirectToRegistrationPage = function() {
        Router.getInstance().changeLocation(Route['REGISTRATION']);
    };

    /**
    * Profile block creator
    */
    ProfilePage.prototype.createProfileBlock = function() {
        this.removeProfileBlock_();

        var domProfileBlock = this.getView().getDom().profileBlock;

        this.profileBlock_ = this.renderChild('Profile',
            domProfileBlock, {userInfo: this.userInfo_});

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
            domProfileBlock, {userInfo: this.userInfo_});

        this.getHandler().listen(
            this.profileBlock_,
            ProfileEdit.Event.EDITING_FINISHED,
            this.onProfileEditingFinished_,
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
    * ProfileEdit EDITING_FINISHED event handler
    * @param {Object} event
    * @private
    */
    ProfilePage.prototype.onProfileEditingFinished_ = function(event) {
        goog.object.extend(this.userInfo_, event.userInfo);
        this.sendEditUserDetailsRequest();
    };

    /**
    * Sends ajax request to get the user info
    */
    ProfilePage.prototype.sendEditUserDetailsRequest = function() {
        request
            .send({url: 'user/',
                type: 'PUT',
                data: this.userInfo_
            })
            .then(
                this.onEditUserDetailsResponse,
                this.onEditUserDetailsRejection,
                this);
    };

    /**
    * Successful user info request response handler
    * @param {Object} response
    */
    ProfilePage.prototype.onEditUserDetailsResponse = function(response) {
        this.createProfileBlock();
    };

    /**
    * Rejected user info request response handler
    * @param {Object} err
    */
    ProfilePage.prototype.onEditUserDetailsRejection = function(err) {
        console.log(err);
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
