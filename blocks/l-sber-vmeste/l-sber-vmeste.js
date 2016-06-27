goog.provide('sv.lSberVmeste.SberVmeste');

goog.require('cl.iControl.Control');
goog.require('sv.lSberVmeste.iController.Controller');
goog.require('sv.lSberVmeste.iRequest.Request');
goog.require('sv.lSberVmeste.iRouter.Route');
goog.require('sv.lSberVmeste.iRouter.Router');



/**
 * aa.lActiveAge.ActiveAge control
 * @param {aa.lActiveAge.View} view View used to render or
 *     decorate the component; defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {cl.iControl.Control}
 */
sv.lSberVmeste.SberVmeste = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);
};
goog.inherits(sv.lSberVmeste.SberVmeste, cl.iControl.Control);

goog.scope(function() {
    var SberVmeste = sv.lSberVmeste.SberVmeste,
        Request = sv.lSberVmeste.iRequest.Request,
        Route = sv.lSberVmeste.iRouter.Route,
        Router = sv.lSberVmeste.iRouter.Router,
        Controller = sv.lSberVmeste.iController.Controller;

    /**
    * @override
    */
    SberVmeste.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.request_ = Request.getInstance();
        this.request_.init({
            baseUrl: 'http://localhost:3000'
        });

        this.headerManager_ = this.decorateChild(
            'HeaderManager',
            this.getView().getDom().headerManager
        );

        this.pageManager_ = this.decorateChild(
            'PageManager',
            this.getView().getDom().pageManager
        );

        this.router_ = Router.getInstance();

        this.controller_ = new Controller({
            headerManager: this.headerManager_,
            pageManager: this.pageManager_
        });

    };

    /**
    * @override
    */
    SberVmeste.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.initRouting_();
    };

    /**
     * Init app routing (attaching handlers to routs)
     * @private
    */
    SberVmeste.prototype.initRouting_ = function() {
        var controller = this.controller_;

        this.router_.enable();
        this.initRoute_(Route.START, controller.actionStart);
        this.initRoute_(Route.TEST, controller.actionTest);
        this.initRoute_(Route.DIRECTIONS, controller.actionChooseDirections);
        this.initRoute_(Route.CARD, controller.actionDisplayCategoryCard);
        this.initRoute_(Route.DONATE, controller.actionDonate);
    };

    /**
     * Attach handler to url
     * @param {String} route
     * @param {Function} action
     * @private
    */
    SberVmeste.prototype.initRoute_ = function(route, action) {
        this.router_.use(route, action.bind(this));
    };

});  // goog.scope
