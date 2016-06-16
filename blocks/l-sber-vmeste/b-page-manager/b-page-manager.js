goog.provide('sv.lSberVmeste.bPageManager.PageManager');

goog.require('sv.lSberVmeste.bPageManager.View');
goog.require('sv.lSberVmeste.iRouter.Router');
goog.require('cl.iContentManager.ContentManager');



/**
 * sv.lSberVmeste.bPageManager.PageManager control
 * @param {sv.lSberVmeste.bPageManager.View} view View used to render or
 *     decorate the component; defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {cl.iContentManager.ContentManager}
 */
sv.lSberVmeste.bPageManager.PageManager = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

    /**
     * Current page instance
     * @type {sv.lSberVmeste.iPage.Page}
     * @private
     */
    this.currentPage_ = null;
};
goog.inherits(
    sv.lSberVmeste.bPageManager.PageManager,
    cl.iContentManager.ContentManager
);


goog.scope(function() {
    var PageManager = sv.lSberVmeste.bPageManager.PageManager,
        Router = sv.lSberVmeste.iRouter.Router;

    /**
     * @override
     * @param {Element} element
     */
    PageManager.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.currentPage_ =
            this.decorateChild('NavPage1', this.getView().getDom().navPage1);
    };

    /**
     * Change page
     * @param  {string} page
     * @param  {Object=} opt_params
     * @protected
     */
    PageManager.prototype.setCurrentPage = function(page, opt_params) {
        this.removeChild(this.currentPage_, true);
        this.currentPage_ =
            this.renderChild(page, this.getElement(), opt_params);
    };
    /**
     * gets current page
     * @return {Object}
     */
    PageManager.prototype.getCurrentPage = function() {
        return this.currentPage_;
    };
    /**
     * gets location
     * @return {Object}
     */
    PageManager.prototype.getLocation = function() {
        return Router.getInstance().getCurrentLocationState();

    };
});  // goog.scope
