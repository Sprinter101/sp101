goog.provide('sv.lSberVmeste.bDonatePage.DonatePage');

goog.require('cl.iControl.Control');
goog.require('cl.iRequest.Request');
goog.require('goog.dom');
goog.require('goog.events.EventType');
goog.require('sv.lSberVmeste.bDonatePage.View');
goog.require('sv.lSberVmeste.bDonationFixedBlock.DonationFixedBlock');
goog.require('sv.lSberVmeste.bDonationPercentBlock.DonationPercentBlock');
goog.require('sv.lSberVmeste.iPage.Page');
goog.require('sv.lSberVmeste.iRouter.Route');
goog.require('sv.lSberVmeste.iRouter.Router');
goog.require('sv.lSberVmeste.iUserService.UserService');



/**
 * sv.lSberVmeste.bDonatePage.DonatePage control
 * @param {sv.lSberVmeste.bDonatePage.View} view View used to render or
 *     decorate the component; defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {sv.lSberVmeste.iPage.Page}
 */
sv.lSberVmeste.bDonatePage.DonatePage = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

     /**
    * tab for choosing donation type
    * @type {sv.gTab.Tab}
    */
    this.donationTabs = null;

    /**
    * donation block for fixed sum
    * @type {sv.bDonateBlock.DonateBlock}
    * @private
    */
    this.donateBlockFixedSum_ = null;

    /**
    * donation block for user's income percent
    * @type {sv.bDonateBlock.DonateBlock}
    * @private
    */
    this.donateBlockPercent_ = null;

     /**
    * next page redirect to
    * @type {sv.lSberVmeste.iRouter.Route}
    * @private
    */
    this.next_route_ = '';
};
goog.inherits(sv.lSberVmeste.bDonatePage.DonatePage, sv.lSberVmeste.iPage.Page);


goog.scope(function() {
    var DonatePage = sv.lSberVmeste.bDonatePage.DonatePage,
        DonationFixedBlock = sv.lSberVmeste.bDonationFixedBlock.
            DonationFixedBlock,
        DonationPercentBlock = sv.lSberVmeste.bDonationPercentBlock.
            DonationPercentBlock,
        Request = cl.iRequest.Request,
        Route = sv.lSberVmeste.iRouter.Route,
        Router = sv.lSberVmeste.iRouter.Router,
        View = sv.lSberVmeste.bDonatePage.View,
        UserService = sv.lSberVmeste.iUserService.UserService;

    /**
     * Api enum
     * @type {string}
     */
    DonatePage.URL = {
        USER_URL: '/user'
    };

    /**
    * @override
    * @param {Element} element
    */
    DonatePage.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        var donationTabs = this.getView().getDom().donationTabs;
        this.donationTabs_ = this.decorateChild('TabSber',
        donationTabs);

        this.donateBlockFixedSum_ = this.decorateChild('DonationFixedBlock',
            this.getView().getDom().donateBlockFixedSum);

        this.donateBlockPercent_ = this.decorateChild('DonationPercentBlock',
            this.getView().getDom().donateBlockPercent);

        this.headerManager_ = this.params.headerManager_;
        if (this.headerManager_ !== undefined) {
            var that = this;
            that.headerManager_.setChoiceHeader();
        }
    };

    /**
    * @override
    */
    DonatePage.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler().listen(
            this.donateBlockFixedSum_,
            DonationFixedBlock.Event.DONATION_FIXED_READY,
            this.onDonationFixedReady
        )
        .listen(this.donateBlockPercent_,
            DonationPercentBlock.Event.DONATION_PERCENT_READY,
            this.onDonationPercentReady
        );

        this.isUserLoggedIn();
    };

    /**
     * send AJAX
     * @return {Object} ajas response or error
     * @protected
     */
    DonatePage.prototype.isUserLoggedIn = function() {
        return Request.getInstance().send({
            url: DonatePage.URL.USER_URL
        }).
        then(
            this.handleSuccessLoginCheck,
            this.handleRejectionLoginCheck,
            this
        );
    };

     /**
    * Ajax success handler
    * @param {Object} success message
    * redirect user to temporary 'Sberbank web'
    */
    DonatePage.prototype.handleSuccessLoginCheck = function(response) {
        var loggedIn = response.data.loggedIn;
        if (loggedIn) {
            this.next_route_ = Route.PAYMENT_TEMP;
        }
        else {
            this.next_route_ = Route.REGISTRATION;
        }
    };

     /**
    * Ajax rejection handler
    * !Temporary redirect to registration page
    * @param {Object} err
    */
    DonatePage.prototype.handleRejectionLoginCheck = function(err) {
        console.log(err);
        this.next_route_ = Route.REGISTRATION;
    };

     /**
     * Handles fixed donation ready event
     * @param {DonationFixedBlock.Event.DONATION_FIXED_READY} event
     * @protected
     */
    DonatePage.prototype.onDonationFixedReady = function(event) {
        var sumValue = JSON.stringify(event.payload.fixedSum);
        Request.getInstance().send({
            url: '/user-fund/donation-sum',
            type: 'POST',
             data: sumValue})
            .then(this.handleSuccess,
                this.handleRejection,
                this
        );
    };

     /**
     * Handles percent donation ready event
     * @param {DonationPercentBlock.Event.DONATION_PERCENT_READY} event
     * @protected
     */
    DonatePage.prototype.onDonationPercentReady = function(event) {
       var sumValue = JSON.stringify(event.payload.percentSum);
       Request.getInstance().send({
            url: '/user-fund/',
            type: 'POST',
             data: sumValue})
            .then(this.handleSuccess,
                this.handleRejection,
                this
        );
    };

    /**
    * Ajax success handler
    * @param {Object} success message
    * redirect user to registration page or to Sberbank web
    */
    DonatePage.prototype.handleSuccess = function(success) {
        Router.getInstance().changeLocation(this.next_route_);
    };

     /**
    * Ajax rejection handler
    * TODO: make different errors handling
    * and show convenient error message
    * !Temporary redirect to registration page
    * @param {Object} err
    */
    DonatePage.prototype.handleRejection = function(err) {
        console.log(err);
        Router.getInstance().changeLocation(this.next_route_);
    };

});  // goog.scope
