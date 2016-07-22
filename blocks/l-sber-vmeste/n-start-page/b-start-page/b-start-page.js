goog.provide('sv.lSberVmeste.bStartPage.StartPage');

goog.require('cl.iControl.Control');
goog.require('goog.dom');
goog.require('goog.events.EventType');
goog.require('sv.gButton.Button');
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
        Route = sv.lSberVmeste.iRouter.Route,
        Router = sv.lSberVmeste.iRouter.Router,
        UserService = sv.lSberVmeste.iUserService.UserService,
        View = sv.lSberVmeste.bStartPage.View;

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

        this.header_ = this.params.header;
            if (this.header_) {
            var that = this;
            UserService.getInstance().isUserLoggedIn()
                .then(function(result) {
                    var params = that.handleSuccessLoginCheck(result);
                    that.header_.renderButton(params);
                    that.startBlock_.handleLoginCheck(params);
                    var draft = params.draft;
                    var loggedIn = params.loggedIn;
                    if (!draft) {
                        that.printReportsButtonContent();
                    }
                    else {
                        that.getFundsCount_();
                    }
                }, function(err) {
                    var params = that.handleRejectionLoginCheck(err);
                    that.header_.renderButton(params);
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
        var draft = response.data.userFund.draft;
        var pageType = 'start';
        return {'loggedIn': loggedIn, 'firstName': firstName,
            'lastName': lastName, 'draft': draft, 'pageType': pageType};
    };

    /**
    * Ajax rejection handler
    * @param {Object} err
    * @return {Object}
    */
    StartPage.prototype.handleRejectionLoginCheck = function(err) {
        console.log(err);
        var default_params = {'loggedIn': false, 'firstName': undefined,
            'lastName': undefined, 'draft': true, 'pageType': 'start'};
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
            this.onStartCreatingUserfund_
        )
        .listen(
            this.startBlock_,
            StartBlock.Event.MANAGE_USERFUND,
            this.onManageUserfund_
        )
        .listen(
            this.userfundButton_,
            Button.Event.CLICK,
            this.onUserfundButtonClick_
        );
    };

     /**
     * Gets count of funds from server and then sends it
     * for further processing if request was successful
     * @private
     */
    StartPage.prototype.getFundsCount_ = function() {
        UserService.getInstance().getUserfundsCount()
            .then(this.handleSuccess_,
                this.handleRejection_,
                this);
        };

    /**
    * Ajax rejection handler
    * Prints default userfunds count
    * if server responded with error
    * @param {Object} err
    * @private
    */
    StartPage.prototype.handleRejection_ = function(err) {
        console.log(err);
        var defaultCount = 10;
        this.changeUserfundButton(defaultCount);
    };

    /**
    * invokes method for preparing
    * correct rendering info block
    * @param {Object} response - number of new opened userfunds
    * @private
    */
    StartPage.prototype.handleSuccess_ =
        function(response) {
            var data = response.data;
            if (data.today < 1) {
                data = data.all;
            }
            else {
                data = data.today;
            }
            if (data > 0) {
                this.renderUserfundsCountInfo_(data);
                this.changeUserfundButton_(data);
            }
            else {
                data = 20;
                this.changeUserfundButton_(data);
            }
    };

    /**
    * Applies correct grammar to the phrase
    * @param {string} userfundsCount number of new opened userfunds
    * @private
    */
    StartPage.prototype.renderUserfundsCountInfo_ = function(
       userfundsCount) {
        this.getView().printCorrectPhrase(userfundsCount);
    };

     /**
     * Applies data to userfunds count button
     * @param {string} userfundsCount number of new opened userfunds
     * @private
     */
    StartPage.prototype.changeUserfundButton_ =
        function(userfundsCount) {
            this.getView().printCorrectCount(userfundsCount);
    };

     /**
    * print correct 'reports' button content
    * @private
    */
    StartPage.prototype.printReportsButtonContent_ = function() {
        this.getView().printReportsButtonContent();
    };

     /**
     * detect start button type to correct event's handle
     * @return {bool}
     * @private
    */
    StartPage.prototype.checkUserfundButtonClass_ = function() {
        return this.getView().checkUserfundButtonClass();
    };

    /**
     * Handles start button CLICK and redirect to temporary userfund page
     * @param {sv.gButton.Button.Event.CLICK} event
     * @private
     */
    StartPage.prototype.onManageUserfund_ = function(event) {
        Router.getInstance().changeLocation(
            Route.USERFUND_PAGE);
    };

     /**
     * Handles start button CLICK and redirect to ListPage
     * @param {sv.gButton.Button.Event.CLICK} event
     * @private
     */
    StartPage.prototype.onStartCreatingUserfund_ = function(event) {
        Router.getInstance().changeLocation(
            Route.LIST_PAGE, {'category': 'topics'});
    };

    /**
     * Handles funds count button CLICK and redirect to ListPage
     * @param {sv.gButton.Button.Event.CLICK} event
     * @private
     */
    StartPage.prototype.onUserfundButtonClick_ = function(event) {
        if (this.checkUserfundButtonClass_()) {
            Router.getInstance().changeLocation(
                Route.USERFUND_PAGE);
        }
        else {
            Router.getInstance().changeLocation(
                Route.LIST_PAGE, {'category': 'funds'});
        }
    };

});  // goog.scope
