goog.provide('sv.lSberVmeste.bRegistrationPage.RegistrationPage');

goog.require('cl.iControl.Control');



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
};
goog.inherits(sv.lSberVmeste.bRegistrationPage.RegistrationPage,
    cl.iControl.Control);

goog.scope(function() {
    var RegistrationPage = sv.lSberVmeste.bRegistrationPage.RegistrationPage,
        ProfileEdit = sv.lSberVmeste.bProfileEdit.ProfileEdit;

    /**
     * Events
     * @enum {string}
     */
    RegistrationPage.Event = {};

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

        this.createUserInfoBlock();
    };

    /**
    * User info block creator
    */
    RegistrationPage.prototype.createUserInfoBlock = function() {
        this.removeRegistrationBlock_();

        var domRegistrationBlock =
            this.getView().getDom().registrationBlock;

        this.registrationBlock_ = this.renderChild('ProfileEdit',
            domRegistrationBlock, {userInfo: this.userInfo,
                registrationState: true});

        this.getHandler().listen(
            this.registrationBlock_,
            ProfileEdit.Event.EDITING_FINISHED,
            this.onContinueButtonClick_,
            false,
            this
        );
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
    * Profile edit button click handler;
    * @private
    */
    RegistrationPage.prototype.onContinueButtonClick_ = function() {
        console.log('<<HANDLED!!!>>');
    };

});  // goog.scope
