goog.provide('sv.lSberVmeste.bPhonePage.PhonePage');

goog.require('cl.iControl.Control');
goog.require('cl.iRequest.Request');
goog.require('goog.dom');
goog.require('goog.events.EventType');
goog.require('sv.gButton.Button');
goog.require('sv.lSberVmeste.bPhoneBlock.PhoneBlock');
goog.require('sv.lSberVmeste.bPhonePage.View');
goog.require('sv.lSberVmeste.iPage.Page');
goog.require('sv.lSberVmeste.iRouter.Route');
goog.require('sv.lSberVmeste.iRouter.Router');


/**
 * sv.lSberVmeste.bPhonePage.PhonePage control
 * @param {sv.lSberVmeste.bPhone.View} view View used to render or
 *     decorate the component; defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {sv.lSberVmeste.iPage.Page}
 */
sv.lSberVmeste.bPhonePage.PhonePage = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

    /**
     * phone block control
     * @type {Object}
     * @private
     */
    this.phoneBlock = null;

};
goog.inherits(sv.lSberVmeste.bPhonePage.PhonePage, sv.lSberVmeste.iPage.Page);

goog.scope(function() {
    var PhonePage = sv.lSberVmeste.bPhonePage.PhonePage,
        Phoneblock = sv.lSberVmeste.bPhoneBlock.PhoneBlock,
        Route = sv.lSberVmeste.iRouter.Route,
        Router = sv.lSberVmeste.iRouter.Router,
        View = sv.lSberVmeste.bPhonePage.View;

    /**
     * @override
     * @param {Element} element
     */
    PhonePage.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.phoneBlock = this.decorateChild(
            'PhoneBlock',
            this.getView().getDom().phoneBlock
        );
    };
});