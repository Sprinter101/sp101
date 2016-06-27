goog.provide('sv.lSberVmeste.bDonateBlock.DonateBlock');

goog.require('cl.iControl.Control');
goog.require('goog.dom'); 
goog.require('goog.events.EventType');
goog.require('sv.lSberVmeste.bDonateBlock.View');



/**
 * sv.lSberVmeste.bDonateBlock.DonateBlock control
 * @param {sv.lSberVmeste.bDonateBlock.View} view View used to render or
 *     decorate the component; defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {'cl.iControl.Control'}
 */
sv.lSberVmeste.bDonateBlock.DonateBlock = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

    /**
    * @type {sv.gInput.Input}
    * @private
    */
    this.fixedSum_ = null;

    /**
    * temporary input (instead of slider)
    * for donator's monthly revenue 
    * @type {sv.gInput.Input}
    * @private
    */
    this.monthlyIncome_ = null;

};
goog.inherits(sv.lSberVmeste.bDonateBlock.DonateBlock, cl.iControl.Control);


goog.scope(function() {
    var DonateBlock = sv.lSberVmeste.bDonateBlock.DonateBlock,
        View = sv.lSberVmeste.bDonateBlock.View;

    /**
    * @override
    * @param {Element} element
    */
    DonateBlock.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);
        this.fixedSum_ = this.decorateChild('InputSber', 
            this.getView().getDom().fixedSum, {
            MAX_NUMBER: 500000,
            MAX_CHARACTERS: 6
        });

         this.monthlyIncome_ = this.decorateChild('InputSber', 
            this.getView().getDom().income, {
            MAX_NUMBER: 1000000,
            MAX_CHARACTERS: 7
        });
    };

    /**
    * @override
    */
    DonateBlock.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');


    };

});  // goog.scope
