goog.provide('sv.lSberVmeste.bCardPage.CardPage');

goog.require('cl.iControl.Control');
goog.require('cl.iRequest.Request');
goog.require('sv.gButton.Button');
goog.require('sv.lSberVmeste.bCardList.CardList');



/**
 * @param {sv.lSberVmeste.bCardPage.View} view View used to render or
 *     decorate the component; defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {cl.iControl.Control}
 */
sv.lSberVmeste.bCardPage.CardPage = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

    /**
    * @type {Boolean}
    * @private
    */
    this.isUserHelping_ = true;

    /**
    * @type {sv.gButton.Button}
    * @private
    */
    this.cardButton_ = null;

    /**
    * @type {sv.lSberVmeste.bCardList.CardList}
    * @private
    */
    this.cardList_ = null;
};
goog.inherits(sv.lSberVmeste.bCardPage.CardPage, cl.iControl.Control);

goog.scope(function() {
    var CardPage = sv.lSberVmeste.bCardPage.CardPage,
        Button = cl.gButton.Button,
        request = cl.iRequest.Request.getInstance();

    /**
    * @override
    * @param {Element} element
    */
    CardPage.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        var domCardList = this.getView().getDom().cardList;

        if (this.isUserHelping_) {
            this.setHelpingButton_();
            this.getView().showStopHelpingLink();
        } else {
            this.setStartHelpingButton_();
        }

        this.cardList_ = this.decorateChild(
            'CardList',
            domCardList,
            {
                cardsCustomClasses: ['b-card_full-line']
            }
        );
    };

    /**
    * @override
    */
    CardPage.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        goog.events.listen(
            this.getView().getDom().stopHelpingLink,
            goog.events.EventType.CLICK,
            this.onStopHelpingLinkClick_,
            null,
            this
        );

        goog.events.listen(
            this.cardList_,
            sv.lSberVmeste.bCardList.CardList.Event.CARD_CLICK,
            this.cardClickHandler_,
            null,
            this
        );

        this.loadCards_();
    };

    /**
     * Cards loader
     * @private
     */
    CardPage.prototype.loadCards_ = function() {
        request
            .send({url: 'entity/fund'})
            .then(
                this.loadCardsResolveHandler_,
                this.loadCardsRejectHandler_,
                this
            );
    };

    /**
     * Card click handler
     * @param {Object} event
     * @private
     */
    CardPage.prototype.cardClickHandler_ = function(event) {
        console.log('clicked on', event.cardId);
    };

    /**
     * Load success cards handler
     * @param {Object} response
     * @private
     */
    CardPage.prototype.loadCardsResolveHandler_ = function(response) {
        this.cardList_.renderCards(response.data);
    };

    /**
     * Load fail cards handler
     * @param {Object} response
     * @private
     */
    CardPage.prototype.loadCardsRejectHandler_ = function(response) {
        console.error(response.data);
    };

    /**
    * Start helping button click handler
    * @private
    */
    CardPage.prototype.onStartHelpingButtonClick_ = function() {
        this.setThanksButton_();

        this.sendCardChosenRequest();

        this.getView().showStopHelpingLink();
    };

    /**
    * 
    */
    CardPage.prototype.sendCardChosenRequest = function() {
        var cardId = this.params.cardId;
        request
            .send(
                {url: 'user-fund/' + cardId,
                'type': 'POST'}
            )
            .then(
                this.onSuccessfulCardChosenRequest_,
                this.loadCardsRejectHandler_,
                this
            );
    };

    /**
    * 
    */
    CardPage.prototype.onSuccessfulCardChosenRequest_ = function(
        response) {
        console.log(response);
    };

    /**
    * Stop helping link clikc handler
    * @private
    */
    CardPage.prototype.onStopHelpingLinkClick_ = function() {
        this.setStartHelpingButton_();

        this.getView().hideStopHelpingLink();
    };

    /**
    * renders Start helping buttons
    * @private
    */
    CardPage.prototype.setStartHelpingButton_ = function() {
        this.disposeButton_();

        var buttonConfig = {
            'data': {
                'content': 'Помогать'
            },
            'config': {
                'buttonStyles': [
                    'background_transparent',
                    'border_green',
                    'border_thick'
                ]
            }
        };

        this.renderButton_(buttonConfig);

        goog.events.listen(
            this.cardButton_,
            Button.Event.CLICK,
            this.onStartHelpingButtonClick_,
            null,
            this
        );
    };

    /**
    * renders helping button
    * @private
    */
    CardPage.prototype.setHelpingButton_ = function() {
        this.disposeButton_();

        var buttonConfig = {
            'data': {
                'content': 'Помогаете 4 месяцa'
            },
            'config': {
                'buttonStyles': [
                    'background_green',
                    'border_green',
                    'border_thick',
                    'font-size_smaller',
                    'width_l'
                ]
            }
        };

        this.renderButton_(buttonConfig);
    };

    /**
    * renders Thanks button
    * @private
    */
    CardPage.prototype.setThanksButton_ = function() {
        this.disposeButton_();

        var buttonConfig = {
            'data': {
                'content': 'Спасибо!'
            },
            'config': {
                'buttonStyles': [
                    'background_green',
                    'border_green',
                    'border_thick'
                ]
            }
        };

        this.renderButton_(buttonConfig);
    };

    /**
    * renders Start helping buttons
    * @param {{
    *   data {{
    *       content {string}
    *   }},
    *   config {{
    *       buttonStyles {Array}
    *   }}
    * }} buttonConfig
    * @private
    */
    CardPage.prototype.renderButton_ = function(buttonConfig) {
        var domButtonContainer = this.getView().getDom().buttonContainer;

        this.cardButton_ = this.renderChild('ButtonSber',
                                             domButtonContainer,
                                             buttonConfig);
    };

    /**
    * renders Start helping buttons
    * @private
    */
    CardPage.prototype.disposeButton_ = function() {
        if (this.cardButton_) {
            this.cardButton_.dispose();
            this.cardButton_ = null;
        }
    };

});  // goog.scope
