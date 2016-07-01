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
     * @type {Object}
     * @private
     */
    this.startBlock_ = null;

    /**
     * userfunds info phrase
     * @type {Object}
     * @private
     */
    this.userfundsCountPhrase_ = null;

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
        );
    };

     /**
     * Gets count of funds from server and then sends it
     * for further processing if request was successful
     * @protected
     */
    StartPage.prototype.getFundsCount = function() {
        Request.getInstance().send({
            url: 'entity/fund/today' })
            .then(this.prepareUserfundsCountInfo,
                this.handleRejection,
                this);
        };

    /**
    * Ajax rejection handler
    * @param {Object} err
    */
    StartPage.prototype.handleRejection = function(err) {
        console.log(err);
    };

    /**
    * invokes method for preparing
    * correct rendering info block
    * @param {Object} response - number of new opened userfunds
    */
    StartPage.prototype.prepareUserfundsCountInfo =
        function(response) {
            var data = response.data;
            this.prepareUserfundsCountPhrase(data);
    };

    /**
    * Parses count string and applies correct grammar
    * to info phrase content
    * Also enters button into document
    * @param {Object} data - number of new opened userfunds
    * @protected
     */
    StartPage.prototype.prepareUserfundsCountPhrase =
    function(data) {
        var userfundsCount = data.count;
        var infoPhrase = 'Сегодня ';
        var countNumber = parseInt(userfundsCount, 10);
        if (countNumber === 1) {
            infoPhrase += 'открылся';
        }
        else {
            infoPhrase += 'открылось';
        }
        this.prepareUserfundsCountButton(data);
        this.renderUserfundsCountInfo(infoPhrase);
        this.getHandler().listen(
            this.userfundsCountButton_,
            Button.Event.CLICK,
            this.onFundsCountButtonClick
            );
    };

    /**
    * Parses count string and applies correct grammar
    * to buttons content
    * @param {Object} data - number of new opened userfunds
    * @protected
     */
    StartPage.prototype.prepareUserfundsCountButton =
    function(data) {
        var userfundsCount = data.count;
        var fundsWord = '';
        var countNumber = parseInt(userfundsCount, 10);
        if (countNumber === 1) {
            fundsWord = 'фонд';
        }
        else if ([2, 3, 4].indexOf(countNumber) >= 0) {
            fundsWord = 'фонда';
        }
        else {
            fundsWord = 'фондов';
        }
        this.renderUserfundsCountButton(userfundsCount, fundsWord);
    };

    /**
    * Applies correct grammar to the phrase
    * @param {string} infoPhrase - correct phrase
    */
    StartPage.prototype.renderUserfundsCountInfo = function(
        infoPhrase) {
        this.getView().getDom().userFundsPhraseContainer
            .innerHTML = infoPhrase;
    };

     /**
     * Applies data and CSS classes to userfunds count button and
     * then renders it into the page
     * @param {string} userfundsCount number of new opened userfunds
     * @param {string} fundsWord right grammar case
     * @protected
     */
    StartPage.prototype.renderUserfundsCountButton =
        function(userfundsCount, fundsWord) {
            this.userfundsCountButton_ = this.renderChild(
                'ButtonSber',
                this.getView().getDom().userFundsCountContainer,
                {
                    'data': {'content': userfundsCount + ' ' + fundsWord},
                    'config': {
                    'buttonStyles': ['font_big', 'height_small',
                        'background_transparent', 'border_green',
                        'text-color_white'],
                        'customClasses':
                            ['b-page-start__button_userfunds-count']
                    }
                }
        );
    };

    /**
     * Handles start button CLICK and redirect to TestPage
     * @param {goog.events.BrowserEvent} event Click event
     * @protected
     */
    StartPage.prototype.onStartCreatingUserfund = function(event) {
        Router.getInstance().changeLocation(Route.LIST_PAGE);
    };

    /**
     * Handles userfunds count button CLICK
     * @param {sv.gButton.Button.Event.CLICK} event Click event
     * @protected
     */
    StartPage.prototype.onFundsCountButtonClick = function(event) {
        Router.getInstance().changeLocation(Route.LIST_PAGE);
    };

});  // goog.scope
