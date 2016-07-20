goog.provide('sv.lSberVmeste.bRegistrationPage.RegistrationPage');

goog.require('cl.iControl.Control');
goog.require('cl.iRequest.Request');
goog.require('sv.lSberVmeste.bPhoneBlock.PhoneBlock');
goog.require('sv.lSberVmeste.iRouter.Route');
goog.require('sv.lSberVmeste.iRouter.Router');



/**
 * Registration page control
 * @param {sv.lSberVmeste.bRegistrationPage.View} view
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sv.lSberVmeste.bRegistrationPage.RegistrationPage = function(view,
    opt_domHelper) {
    goog.base(this, view, opt_domHelper);

    /**
    * @type {Object}
    * @private
    */
    this.registrationBlock_ = null;

    /**
    * @type {{
    *    phone: string
    * }}
    * @private
    */
    this.userInfo_ = {};
};
goog.inherits(sv.lSberVmeste.bRegistrationPage.RegistrationPage,
    cl.iControl.Control);

goog.scope(function() {
    var RegistrationPage = sv.lSberVmeste.bRegistrationPage.RegistrationPage,
        ProfileEdit = sv.lSberVmeste.bProfileEdit.ProfileEdit,
        request = cl.iRequest.Request.getInstance(),
        Route = sv.lSberVmeste.iRouter.Route,
        Router = sv.lSberVmeste.iRouter.Router,
        Block = sv.lSberVmeste.bPhoneBlock.PhoneBlock;

    /**
    * @override
    * @param {Element} element
    */
    RegistrationPage.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.headerManager_ = this.params.headerManager_;
        this.headerManager_.setProfileHeader({'pageType': 'registration'});
    };

    /**
    * @override
    */
    RegistrationPage.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.createPhoneBlock();
    };

    /**
    * Phone block creator
    */
    RegistrationPage.prototype.createPhoneBlock = function() {
        this.removeRegistrationBlock_();

        var domRegistrationBlock =
            this.getView().getDom().registrationBlock;

        this.registrationBlock_ = this.renderChild('PhoneBlock',
            domRegistrationBlock);

        this.getHandler().listen(
            this.registrationBlock_,
            Block.Event.VERIFIED,
            this.onVerified_,
            false,
            this
        );
    };

    /**
    * User info block creator
    */
    RegistrationPage.prototype.createUserInfoBlock = function() {
        this.removeRegistrationBlock_();

        var domRegistrationBlock =
            this.getView().getDom().registrationBlock;

        this.registrationBlock_ = this.renderChild('ProfileEdit',
            domRegistrationBlock, {userInfo: this.userInfo_,
                registrationState: true});

        this.getHandler().listen(
            this.registrationBlock_,
            ProfileEdit.Event.EDITING_FINISHED,
            this.onEditingFinished_,
            false,
            this
        );
    };

    /**
    * Sends a POST request to register the user
    */
    RegistrationPage.prototype.sendRegisterUserRequest = function() {
        request
            .send({
                url: 'auth/',
                type: 'POST',
                data: this.userInfo_
            })
            .then(
                this.handleResponse,
                this.handleRejection,
                this);
    };

    /**
    * Successful ajax response handler
    * @param {Object} response
    */
    RegistrationPage.prototype.handleResponse = function(response) {
        this.redirectToStartPage();
    };

    /**
    * Ajax rejection handler
    * @param {Object} err
    */
    RegistrationPage.prototype.handleRejection = function(err) {
        console.log(err);
    };

    /**
    * redirects user to start page
    */
    RegistrationPage.prototype.redirectToStartPage = function() {
        Router.getInstance().changeLocation(Route['START']);
    };

    /**
    * Removes current block
    * @private
    */
    RegistrationPage.prototype.removeRegistrationBlock_ = function() {
        if (this.registrationBlock_) {
            this.registrationBlock_.dispose();
            this.registrationBlock_ = null;
        }
    };

    /**
    * Phone block's VERIFIED event handler
    * @param {Object} event
    * @private
    */
    RegistrationPage.prototype.onVerified_ = function(event) {
        var eventData = event.detail;

        if (eventData.response.data === 'need register') {
            this.userInfo_.phone = eventData.phone;
            this.createUserInfoBlock();
        } else {
            this.redirectToStartPage();
        }
    };

    /**
    * Profile edit button click handler;
    * @param {Object} event
    * @private
    */
    RegistrationPage.prototype.onEditingFinished_ = function(event) {
        goog.object.extend(this.userInfo_, event.userInfo);
        this.sendRegisterUserRequest();
    };

});  // goog.scope
