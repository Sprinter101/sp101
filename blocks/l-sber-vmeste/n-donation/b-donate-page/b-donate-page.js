goog.provide('sv.lSberVmeste.bDonatePage.DonatePage');

goog.require('cl.iControl.Control');
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

    /**
    * payment choice that user had already selected
    * @type {string}
    * @private
    */
    this.payment_choice_ = '';

     /**
    * slider initial value
    * @type {number}
    * @private
    */
    this.sliderInitValue_ = 1;
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
     * Tab map
     * @type {Object}
     */
    DonatePage.BlocksTabMap = {
        'fixed': 0,
        'percent': 1
    };

    /**
    * @override
    * @param {Element} element
    */
    DonatePage.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);
        var that = this;
        UserService.isUserLoggedIn()
                .then(function(result) {
                    that.handleSuccessLoginCheck_(result);
                }, function(err) {
                    that.handleRejectionLoginCheck_(err);
                }
        );

    };

     /**
    * Ajax success handler
    * @param {Object} response message
    * redirect user to temporary 'Sberbank web'
    * @private
    */
    DonatePage.prototype.handleSuccessLoginCheck_ = function(response) {
        var loggedIn = response.data.loggedIn;
        if (loggedIn) {
            this.next_route_ = Route.PAYMENT_TEMP;
            this.payment_choice_ = response.data.payment_choice || 'percent';
            this.sliderInitValue_ = 3;
            this.inputIncomValue_ = 20000;
            this.inputFixedValue = 500;
        }
        else {
            this.next_route_ = Route.REGISTRATION;
            this.payment_choice_ = 'fixed';
            this.sliderInitValue_ = undefined;
            this.inputIncomValue_ = undefined;
            this.inputFixedValue = undefined;
        }
        var payment_choice = this.payment_choice_;
        var selectedTabId = DonatePage.BlocksTabMap[this.payment_choice_];

        var params = {
            'selectedTabId': selectedTabId,
            'sliderInitValue': this.sliderInitValue_,
            'inputIncomeValue': this.inputIncomValue_,
            'inputFixedValue': this.inputFixedValue
        };
        this.renderTabs(params);
    };

     /**
    * Ajax rejection handler
    * !Temporary redirect to registration page
    * @param {Object} err
    * @private
    */
    DonatePage.prototype.handleRejectionLoginCheck_ = function(err) {
        console.log(err);
        this.next_route_ = Route.REGISTRATION;
        this.payment_choice_ = 'fixed';
        this.sliderInitValue_ = undefined;
        this.inputIncomValue_ = undefined;
        this.inputFixedValue = 700;
        var selectedTabId = DonatePage.BlocksTabMap[this.payment_choice_];
        var params = {
            'selectedTabId': selectedTabId,
            sliderInitValue: this.sliderInitValue_,
            inputIncomeValue: this.inputIncomValue_,
            inputFixedValue: this.inputFixedValue
        };
        this.renderTabs(params);
    };

     /**
     * render donate page tabs
     * @param {Object} params
     */
    DonatePage.prototype.renderTabs = function(params) {

       this.getView().renderTabs(params);

        var donationTabs = this.getView().getDom().donationTabs;
        this.donationTabs_ = this.decorateChild('TabSber',
        donationTabs);

        this.donateBlockFixedSum_ = this.decorateChild('DonationFixedBlock',
            this.getView().getDom().donateBlockFixedSum);

        this.donateBlockPercent_ = this.decorateChild('DonationPercentBlock',
            this.getView().getDom().donateBlockPercent);

        this.getHandler().listen(
            this.donateBlockFixedSum_,
            DonationFixedBlock.Event.DONATION_FIXED_READY,
            this.onDonationFixedReady_
        )
        .listen(this.donateBlockPercent_,
            DonationPercentBlock.Event.DONATION_PERCENT_READY,
            this.onDonationPercentReady_
        );
    };

     /**
     * Handles fixed donation ready event
     * TODO: made request to save donation sum on server
     * @param {DonationFixedBlock.Event.DONATION_FIXED_READY} event
     * @private
     */
    DonatePage.prototype.onDonationFixedReady_ = function(event) {
        var sumValue = JSON.stringify(event.payload.fixedSum);
        console.log(sumValue);
        this.redirectToNextPage_();
    };

     /**
     * Handles percent donation ready event
     * TODO: made request to save donation sum on server
     * @param {DonationPercentBlock.Event.DONATION_PERCENT_READY} event
     * @private
     */
    DonatePage.prototype.onDonationPercentReady_ = function(event) {
        var sumValue = JSON.stringify(event.payload.percentSum);
        this.redirectToNextPage_();
    };

    /**
    * redirect user to registration page or to Sberbank web
    * @private
    */
    DonatePage.prototype.redirectToNextPage_ = function() {
        Router.getInstance().changeLocation(this.next_route_);
    };

});  // goog.scope
