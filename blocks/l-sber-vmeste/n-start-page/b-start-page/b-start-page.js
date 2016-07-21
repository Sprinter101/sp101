goog.provide('sv.lSberVmeste.bStartPage.StartPage');

goog.require('cl.iControl.Control');
goog.require('cl.iRequest.Request');
goog.require('goog.dom');
goog.require('goog.events.EventType');
goog.require('sv.gButton.Button');
goog.require('sv.lSberVmeste.bHeaderManager.HeaderManager');
goog.require('sv.lSberVmeste.bStartBlock.StartBlock');
goog.require('sv.lSberVmeste.bStartPage.View');
goog.require('sv.lSberVmeste.iPage.Page');
goog.require('sv.lSberVmeste.iRouter.Route');
goog.require('sv.lSberVmeste.iRouter.Router');
goog.require('sv.lSberVmeste.iUserService.UserService');



/**
 * sv.lSberVmeste.bStartPage.StartPage control
 * @param {sv.lSberVmeste.bStartPage.View} view View used to render or
 *     decorate the component; defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {sv.lSberVmeste.iPage.Page}
 */
sv.lSberVmeste.bStartPage.StartPage = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

    /**
     * start block control
     * @type {sv.lSberVmeste.bStartBlock.StartBlock}
     * @private
     */
    this.startBlock_ = null;

    /**
     * userfunds count button
     * @type {sv.gButton.Button}
     * @private
     */
    this.userfundsCountButton_ = null;

};
goog.inherits(sv.lSberVmeste.bStartPage.StartPage, sv.lSberVmeste.iPage.Page);


goog.scope(function() {
    var StartPage = sv.lSberVmeste.bStartPage.StartPage,
        StartBlock = sv.lSberVmeste.bStartBlock.StartBlock,
        Button = sv.gButton.Button,
        Request = cl.iRequest.Request,
        Route = sv.lSberVmeste.iRouter.Route,
        Router = sv.lSberVmeste.iRouter.Router,
        UserService = sv.lSberVmeste.iUserService.UserService,
        View = sv.lSberVmeste.bStartPage.View,
        HeaderManager = sv.lSberVmeste.bHeaderManager.HeaderManager;

    /**
     * Url enum
     * @enum {string}
     */
    StartPage.URL = {
        USERFUNDS_COUNT: '/user-fund/count'
    };

    /**
    * @override
    * @param {Element} element
    */
    StartPage.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.startBlock_ = this.decorateChild(
            'StartBlock',
            this.getView().getDom().startBlock
        );

       this.userfundButton_ = this.decorateChild('ButtonSber',
            this.getView().getDom().userfundButton
        );

        this.headerManager_ = this.params.headerManager_;
        if (this.headerManager_ !== undefined) {
            var that = this;
            UserService.getInstance().isUserLoggedIn()
                .then(function(result) {
                    var params = that.handleSuccessLoginCheck(result);
                    that.headerManager_.setProfileHeader(params);
                    that.startBlock_.handleLoginCheck(params);
                    var draft = params.draft;
                    var loggedIn = params.loggedIn;
                    if (!draft) {
                        that.startBlock_.renderStartButtonContent(
                            loggedIn, draft);
                        that.printReportsButtonContent();
                    }
                    else {
                        that.startBlock_.renderStartButtonContent(
                                loggedIn, draft);
                        that.getFundsCount_();
                    }
                }, function(err) {
                    var params = that.handleRejectionLoginCheck(err);
                    that.headerManager_.setProfileHeader(params);
                    that.startBlock_.handleLoginCheck(params);
            });
       }
    };

    /**
    * Ajax success handler
    * @param {Object} response
    * @return {Object}
    */
    StartPage.prototype.handleSuccessLoginCheck = function(response) {
        var loggedIn = response.data.loggedIn;
        var firstName = response.data.firstName;
        var lastName = response.data.lastName;
        var pageType = 'start';
        var draft = response.data.userFund.draft;
        return {'loggedIn': loggedIn, 'firstName': firstName,
            'lastName': lastName, 'pageType': pageType, 'draft': draft};
    };

    /**
    * Ajax rejection handler
    * @param {Object} err
    * @return {Object}
    */
    StartPage.prototype.handleRejectionLoginCheck = function(err) {
        console.log(err);
        var default_params = {'loggedIn': false, 'firstName': undefined,
            'lastName': undefined, 'pageType': 'start', 'draft': false};
        return default_params;
    };

    /**
    * @override
    */
    StartPage.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler().listen(
            this.startBlock_,
            StartBlock.Event.START_CREATING_USERFUND,
            this.onStartCreatingUserfund
        )
        .listen(
            this.startBlock_,
            StartBlock.Event.MANAGE_USERFUND,
            this.onManageUserfund
        )
        .listen(
            this.userfundButton_,
            Button.Event.CLICK,
            this.onUserfundButtonClick
        );
    };

     /**
     * Gets count of funds from server and then sends it
     * for further processing if request was successful
     * @private
     */
    StartPage.prototype.getFundsCount_ = function() {
        Request.getInstance().send({
            url: StartPage.URL.USERFUNDS_COUNT})
            .then(this.handleSuccess,
                this.handleRejection,
                this);
        };

    /**
    * Ajax rejection handler
    * Prints default userfunds count
    * if server responded with error
    * @param {Object} err
    */
    StartPage.prototype.handleRejection = function(err) {
        console.log(err);
        var defaultCount = 10;
        this.changeUserfundButton(defaultCount);
    };

    /**
    * invokes method for preparing
    * correct rendering info block
    * @param {Object} response - number of new opened userfunds
    */
    StartPage.prototype.handleSuccess =
        function(response) {
            var data = response.data;
            if (data.today < 1) {
                data = data.all;
            }
            else {
                data = data.today;
            }
            if (data > 0) {
                this.renderUserfundsCountInfo(data);
                this.changeUserfundButton(data);
            }
            else {
                data = 20;
                this.changeUserfundButton(data);
            }
    };

    /**
    * Applies correct grammar to the phrase
    * @param {string} userfundsCount number of new opened userfunds
    * @protected
    */
    StartPage.prototype.renderUserfundsCountInfo = function(
       userfundsCount) {
        this.getView().printCorrectPhrase(userfundsCount);
    };

     /**
     * Applies data to userfunds count button
     * @param {string} userfundsCount number of new opened userfunds
     * @protected
     */
    StartPage.prototype.changeUserfundButton =
        function(userfundsCount) {
            this.getView().printCorrectCount(userfundsCount);
    };

     /**
    * print correct 'reports' button content
    * @protected
    */
    StartPage.prototype.printReportsButtonContent = function() {
        this.getView().printReportsButtonContent();
    };

     /**
     * detect start button type to correct event's handle
     * @return {bool}
    */
    StartPage.prototype.checkUserfundButtonClass = function() {
        return this.getView().checkUserfundButtonClass();
    };

    /**
     * Handles start button CLICK and redirect to temporary userfund page
     * @param {sv.gButton.Button.Event.CLICK} event
     * @protected
     */
    StartPage.prototype.onManageUserfund = function(event) {
        Router.getInstance().changeLocation(
            Route.USERFUND_PAGE);
    };

     /**
     * Handles start button CLICK and redirect to ListPage
     * @param {sv.gButton.Button.Event.CLICK} event
     * @protected
     */
    StartPage.prototype.onStartCreatingUserfund = function(event) {
        Router.getInstance().changeLocation(
            Route.LIST_PAGE, {'category': 'topics'});
    };

    /**
     * Handles funds count button CLICK and redirect to ListPage
     * @param {sv.gButton.Button.Event.CLICK} event
     * @protected
     */
    StartPage.prototype.onUserfundButtonClick = function(event) {
        if (this.checkUserfundButtonClass()) {
            Router.getInstance().changeLocation(
                Route.USERFUND_PAGE);
        }
        else {
            Router.getInstance().changeLocation(
                Route.LIST_PAGE, {'category': 'funds'});
        }
    };

});  // goog.scope
