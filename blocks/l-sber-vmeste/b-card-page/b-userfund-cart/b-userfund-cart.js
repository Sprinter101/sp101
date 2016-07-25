goog.provide('sv.lSberVmeste.bCardPage.bUserfundCart.UserfundCart');

goog.require('cl.iControl.Control');
goog.require('sv.gButton.Button');
goog.require('sv.lSberVmeste.iRouter.Route');
goog.require('sv.lSberVmeste.iRouter.Router');
goog.require('sv.lSberVmeste.iUserService.UserService');
goog.require('sv.lSberVmeste.iUserfundService.UserfundService');



/**
 * User block control
 * @param {sv.lSberVmeste.bCardPage.bUserfundCart.View} view
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sv.lSberVmeste.bCardPage.bUserfundCart.UserfundCart = function(
    view, opt_domHelper) {

    /**
     * @type {sv.gButton.Button}
     * @private
     */
    this.fundButton_ = null;

    /**
     * @type {sv.gButton.Button}
     * @private
     */
    this.continueButton_ = null;

    goog.base(this, view, opt_domHelper);
};
goog.inherits(sv.lSberVmeste.bCardPage.bUserfundCart.UserfundCart,
    cl.iControl.Control);

goog.scope(function() {
    var UserfundCart = sv.lSberVmeste.bCardPage.bUserfundCart.UserfundCart,
        Button = sv.gButton.Button,
        Route = sv.lSberVmeste.iRouter.Route,
        Router = sv.lSberVmeste.iRouter.Router,
        UserService = sv.lSberVmeste.iUserService.UserService,
        UserfundService = sv.lSberVmeste.iUserfundService.UserfundService;

    /**
     * @override
     * @param {Element} element
     */
    UserfundCart.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.fundButton_ = this.decorateChild(
            'ButtonSber',
            this.getView().getDom().fundButton
        );

        this.continueButton_ = this.decorateChild(
            'ButtonSber',
            this.getView().getDom().continueButton
        );
    };

    /**
    * @override
    */
    UserfundCart.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler()
        .listen(
            this.fundButton_,
            Button.Event.CLICK,
            this.onFundButtonClick_
        )
        .listen(
            this.continueButton_,
            Button.Event.CLICK,
            this.onContinueButtonClick_
        );
    };

    /**
     * shows userfund cart
     * @param {string} cardType
     */
    UserfundCart.prototype.show = function(cardType) {
        this.getView().show();

        this.getView().appendTitle({category: cardType});

        UserfundService.getChosenEntities()
        .then(
            this.onGetChosenEntitiesSuccess_,
            this.onGetChosenEntitiesRejection_,
            this
        );
    };

    /**
     * hides userfund cart
     */
    UserfundCart.prototype.hide = function() {
        this.getView().hide();
    };

    /**
    * Generates text based on categories object
    */
    UserfundCart.prototype.createCategoriesText = function() {
        var categories = this.categories_;

        var topicCount = categories.topic,
            directionCount = categories.direction,
            fundsCount = categories.fund;

        var soyParams = {
            'data': {
                topicCount: topicCount,
                directionCount: directionCount,
                fundsCount: fundsCount
            }
        };

        this.getView().appendCategoriesText(soyParams);
    };

    /**
     * Fund button click handler
     * @private
     */
    UserfundCart.prototype.onFundButtonClick_ = function() {
        UserService.isUserLoggedIn()
            .then(this.redirectUser_, this.handleRejection, this);
    };

    /**
     * Continue button click handler
     * @private
     */
    UserfundCart.prototype.onContinueButtonClick_ = function() {
        this.hide();
    };

    /**
     * "Get chosen entities" successful response handler
     * @param {Object} response
     * @private
     */
    UserfundCart.prototype.onGetChosenEntitiesSuccess_ = function(
        response) {
        var data = response.data,
            categoriesLength = {};

        for (var i = 0; i < data.length; i++) {

            var dataType = data[i].type;

            if (categoriesLength[dataType]) {
                categoriesLength[dataType] += 1;
            } else {
                categoriesLength[dataType] = 1;
            }
        }

        this.getView().appendCategoriesText({data: categoriesLength});
    };

    /**
     * "Get chosen entities" rejection handler
     * @param {Object} err
     * @private
     */
    UserfundCart.prototype.onGetChosenEntitiesRejection_ = function(
        err) {
        console.log(err);
    };

    /**
     * Redirects user to another page
     * @param {Object} response
     * @private
     */
    UserfundCart.prototype.redirectUser_ = function(response) {
        isLoggedIn = response.data.loggedIn;

        if (isLoggedIn) {
            Router.getInstance().changeLocation(Route['DONATE']);
        } else {
            Router.getInstance().changeLocation(Route['REGISTRATION'],
                null, {action: 'DONATE'});
        }
    };

});  // goog.scope
