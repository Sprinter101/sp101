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
};
goog.inherits(sv.lSberVmeste.bDonatePage.DonatePage, sv.lSberVmeste.iPage.Page);


goog.scope(function() {
    var DonatePage = sv.lSberVmeste.bDonatePage.DonatePage,
        DonationFixedBlock = sv.lSberVmeste.bDonationFixedBlock.
            DonationFixedBlock,
        DonationPercentBlock = sv.lSberVmeste.bDonationPercentBlock.
            DonationPercentBlock,
        Route = sv.lSberVmeste.iRouter.Route,
        Router = sv.lSberVmeste.iRouter.Router,
        View = sv.lSberVmeste.bDonatePage.View;

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
    };

     /**
     * Handles fixed donation ready event
     * @param {DonationFixedBlock.Event.DONATION_FIXED_READY} event
     * @protected
     */
    DonatePage.prototype.onDonationFixedReady = function(event) {
        var sumValue = event.payload.fixedSum;
        Router.getInstance().changeLocation(Route.PHONE_NUMBER, null, {
            'sumValue': sumValue});
    };

     /**
     * Handles percent donation ready event
     * @param {DonationPercentBlock.Event.DONATION_PERCENT_READY} event
     * @protected
     */
    DonatePage.prototype.onDonationPercentReady = function(event) {
       var sumValue = event.payload.percentSum;
        Router.getInstance().changeLocation(Route.PHONE_NUMBER, null, {
            'sumValue': sumValue});
    };

});  // goog.scope
