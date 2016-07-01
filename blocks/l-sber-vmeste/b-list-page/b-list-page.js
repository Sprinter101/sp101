goog.provide('sv.lSberVmeste.bListPage.ListPage');

goog.require('sv.gTab.gListTab.Tab');
goog.require('sv.lSberVmeste.bListPage.View');
goog.require('sv.lSberVmeste.iPage.Page');
goog.require('sv.lSberVmeste.iRouter.Route');
goog.require('sv.lSberVmeste.iRouter.Router');



/**
 * sv.lSberVmeste.bListPage.ListPage control
 * @param {sv.lSberVmeste.bListPage.View} view
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {sv.lSberVmeste.iPage.Page}
 */
sv.lSberVmeste.bListPage.ListPage = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

    /**
    * @type {sv.gTab.Tab}
    * @private
    */
    this.listTab_ = null;
};
goog.inherits(sv.lSberVmeste.bListPage.ListPage, sv.lSberVmeste.iPage.Page);


goog.scope(function() {
    var ListPage = sv.lSberVmeste.bListPage.ListPage,
        ListTab = sv.gTab.gListTab.Tab,
        Route = sv.lSberVmeste.iRouter.Route,
        Router = sv.lSberVmeste.iRouter.Router;

    /**
    * @override
    * @param {Element} element
    */
    ListPage.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        var domListTab = this.getView().getDom().listTab;

        this.listTab_ = this.decorateChild('ListTab', domListTab);
    };

    /**
    * @override
    */
    ListPage.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler().listen(
            this.listTab_,
            ListTab.Event.CHANGE_PAGE_REQUEST,
            this.onChangePageRequest_,
            null,
            this
        );
    };

    /**
    * Handler for ListTab CHANGE_PAGE_REQUEST event
    * @param {Object} event
    * @private
    */
    ListPage.prototype.onChangePageRequest_ = function(event) {
        Router.getInstance().changeLocation(Route[event.page], {
            id: event.cardId
        });
    };

});  // goog.scope
