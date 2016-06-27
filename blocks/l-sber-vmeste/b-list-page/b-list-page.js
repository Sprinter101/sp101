goog.provide('sv.lSberVmeste.bListPage.ListPage');

goog.require('sv.lSberVmeste.bListPage.View');
goog.require('sv.lSberVmeste.iPage.Page');



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
    this.tabSber_ = null;
};
goog.inherits(sv.lSberVmeste.bListPage.ListPage, sv.lSberVmeste.iPage.Page);


goog.scope(function() {
    var ListPage = sv.lSberVmeste.bListPage.ListPage;

    /**
    * @override
    * @param {Element} element
    */
    ListPage.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        var domTabSber = this.getView().getDom().tabSber;

        this.tabSber_ = this.decorateChild('TabSber', domTabSber)

    };

    /**
    * @override
    */
    ListPage.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');
    };

});  // goog.scope
