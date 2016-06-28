goog.provide('sv.lSberVmeste.bDonatePage.DonatePage'); 

goog.require('cl.iControl.Control');
goog.require('goog.dom');
goog.require('goog.events.EventType');
goog.require('sv.lSberVmeste.bDonatePage.View');
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
    * @private
    */
    this.donationTabs = null;

    //this.donateBlock_ = null;
    this.donateBlockFixedSum_ = null;
    this.donateBlockMonthlyIncome_ = null;
};
goog.inherits(sv.lSberVmeste.bDonatePage.DonatePage, sv.lSberVmeste.iPage.Page);


goog.scope(function() {
    var DonatePage = sv.lSberVmeste.bDonatePage.DonatePage,
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

        this.donateBlockFixedSum_ = this.decorateChild('DonateBlock',
            this.getView().getDom().donateBlockFixedSum);
        //console.log(this.donateBlock_);
        this.donateBlockMonthlyIncome_ = this.decorateChild('DonateBlock',
            this.getView().getDom().donateBlockMonthlyIncome);
            console.log(this.donateBlockMonthlyIncome_);

        /*this.donateBlock_ = this.decorateChild('DonateBlock',
            this.getView().getDom().donateBlock);
        console.log(this.donateBlock_);*/

    };

    /**
    * @override
    */
    DonatePage.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');
    };

});  // goog.scope
