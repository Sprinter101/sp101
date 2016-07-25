goog.provide('sv.lSberVmeste.bRegistrationPage.RegistrationPage');

goog.require('cl.iControl.Control');
goog.require('cl.iRequest.Request');
goog.require('sv.lSberVmeste.bPhoneBlock.PhoneBlock');
goog.require('sv.lSberVmeste.iRouter.Route');
goog.require('sv.lSberVmeste.iRouter.Router');
goog.require('sv.lSberVmeste.iUserService.UserService');



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
     * @type {string} where to redirect the user after the registration
     * @private
     */
    this.redirectTo_ = this.params.action || null;

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
        Block = sv.lSberVmeste.bPhoneBlock.PhoneBlock,
        UserService = sv.lSberVmeste.iUserService.UserService;
    /**
    * @override
    * @param {Element} element
    */
    RegistrationPage.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.header_ = this.params.header;
        if (this.header_) {
            var that = this;
            UserService.isUserLoggedIn()
                .then(function(result) {
                    var params = that.handleSuccessLoginCheck_(result);
                    that.header_.renderButton(params);
                    that.header_.renderCorrectHelp(params);
            }, function(err) {
                    var params = that.handleRejectionLoginCheck_(err);
                    that.header_.renderButton(params);
                }
            );
        }
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
        this.redirectUser();
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
    RegistrationPage.prototype.redirectUser = function() {
        if (this.redirectTo_) {
            Router.getInstance().changeLocation(Route[this.redirectTo_]);
        } else {
            Router.getInstance().changeLocation(Route['START']);
        }
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
            this.redirectUser();
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

    /**
    * Ajax success handler
    * @param {Object} response
    * @return {Object}
    * @private
    */
    RegistrationPage.prototype.handleSuccessLoginCheck_ = function(response) {
        var loggedIn = response.data.loggedIn;
        var firstName = response.data.firstName;
        var lastName = response.data.lastName;
        var pageType = 'registration';
        return {'loggedIn': loggedIn, 'firstName': firstName,
            'lastName': lastName, 'pageType': pageType
        };
    };

    /**
    * Ajax rejection handler
    * @param {Object} err
    * @return {Object}
    * @private
    */
    RegistrationPage.prototype.handleRejectionLoginCheck_ = function(err) {
        console.log(err);
        var default_params = {'loggedIn': true, 'firstName': undefined,
            'lastName': undefined, 'pageType': 'registration'};
        return default_params;
    };

});  // goog.scope
