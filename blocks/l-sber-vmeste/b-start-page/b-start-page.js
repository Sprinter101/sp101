goog.provide('sv.lSberVmeste.bStartPage.StartPage');

goog.require('cl.iControl.Control');
goog.require('cl.iRequest.Request');
goog.require('goog.dom');
goog.require('goog.events.EventType');
goog.require('sv.gButton.Button');
goog.require('sv.lSberVmeste.bStartBlock.StartBlock');
goog.require('sv.lSberVmeste.bStartPage.View');
goog.require('sv.lSberVmeste.iPage.Page');
goog.require('sv.lSberVmeste.iRouter.Route');
goog.require('sv.lSberVmeste.iRouter.Router');



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
        Utils = sv.iUtils.Utils,
        View = sv.lSberVmeste.bStartPage.View;

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

       this.userfundsCountButton_ = this.decorateChild('ButtonSber',
            this.getView().getDom().userFundsCountButton
            );

    };

    /**
    * @override
    */
    StartPage.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getFundsCount();

        this.getHandler().listen(
            this.startBlock_,
            StartBlock.Event.START_CREATING_USERFUND,
            this.onStartCreatingUserfund
        )
        .listen(
            this.userfundsCountButton_,
            Button.Event.CLICK,
            this.onUserfundsCountButtonClick
        );
    };

     /**
     * Gets count of funds from server and then sends it
     * for further processing if request was successful
     * @protected
     */
    StartPage.prototype.getFundsCount = function() {
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
        this.changeUserfundsCountButton(defaultCount);
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
                this.changeUserfundsCountButton(data);
            }
            else {
                data = 20;
                this.changeUserfundsCountButton(data);
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
    StartPage.prototype.changeUserfundsCountButton =
        function(userfundsCount) {
            this.getView().printCorrectCount(userfundsCount);
    };

    /**
     * Handles start button CLICK and redirect to ListPage
     * @param {sv.gButton.Button.Event.CLICK} event
     * @protected
     */
    StartPage.prototype.onStartCreatingUserfund = function(event) {
        Router.getInstance().changeLocation(
            Route.LIST_PAGE, {'category': 'directions'});
    };

    /**
     * Handles funds count button CLICK and redirect to ListPage
     * @param {sv.gButton.Button.Event.CLICK} event
     * @protected
     */
    StartPage.prototype.onUserfundsCountButtonClick = function(event) {
        Router.getInstance().changeLocation(
            Route.LIST_PAGE, {'category': 'funds'});
    };

});  // goog.scope
