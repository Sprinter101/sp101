goog.provide('sv.lSberVmeste.bCardPage.CardPage');

goog.require('cl.iControl.Control');
goog.require('cl.iRequest.Request');
goog.require('sv.gButton.Button');
goog.require('sv.lSberVmeste.bCardList.CardList');
goog.require('sv.lSberVmeste.iCardService.CardService');
goog.require('sv.lSberVmeste.iRouter.Route');
goog.require('sv.lSberVmeste.iRouter.Router');
goog.require('sv.lSberVmeste.iUserService.UserService');



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
    * @type {sv.gButton.Button}
    * @private
    */
    this.cardButton_ = null;

    /**
    * @type {sv.lSberVmeste.bCardList.CardList}
    * @private
    */
    this.cardList_ = null;

    /**
    * @type {string}
    * @private
    */
    this.cardType_ = null;

};
goog.inherits(sv.lSberVmeste.bCardPage.CardPage, cl.iControl.Control);

goog.scope(function() {
    var CardPage = sv.lSberVmeste.bCardPage.CardPage,
        Button = cl.gButton.Button,
        CardService = sv.lSberVmeste.iCardService.CardService,
        request = cl.iRequest.Request.getInstance(),
        Route = sv.lSberVmeste.iRouter.Route,
        Router = sv.lSberVmeste.iRouter.Router,
        UserService = sv.lSberVmeste.iUserService.UserService;


    /**
    * @override
    * @param {Element} element
    */
    CardPage.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.header_ = this.params.header;

        var domCardList = this.getView().getDom().cardList;
        var cardId = this.params.cardId;

        this.cardList_ = this.decorateChild(
            'CardList',
            domCardList,
            {
                cardsCustomClasses: ['b-card_full-line']
            }
        );

        // loading card info
        CardService.getCard(cardId).then(
            this.cardLoadResolveHandler_, this.cardLoadRejectHandler_, this
        )
        // loading associated cards
        .then(function(data) {
            if (data.type === 'direction') {
                return CardService.getFundsByAssociatedId(cardId);
            } else if (data.type === 'fund') {
                return CardService.getFundEntitiesById(cardId);
            } else {
                return CardService.getDirectionsByAssociatedId(cardId);
            }
        })
        // Handling associated cards
        .then(
            this.loadCardsResolveHandler_, this.loadCardsRejectHandler_, this
        );
    };

    /**
     * Will be called when card data was successful loaded
     * @param  {object} res
     * @private
     * @return {object}
     */
    CardPage.prototype.cardLoadResolveHandler_ = function(res) {
        var data = res.data;
        var type = data.type;
        var title = data.title;
        var isChecked = data.checked;
        var description = data.description;

        this.cardType_ = type;

        // TODO: replace on real data when it will available
        var donations = 123;
        var fullPrice = 100500;

        // customize header
        this.header_.renderCorrectTitle(type);

        if (isChecked) {
            this.setHelpingButton_();
            this.getView().showStopHelpingLink();
        } else {
            this.setStartHelpingButton_();
        }

        this.getView().setIconTitle(title);
        this.getView().setTextTitle(title);
        this.getView().setDescription(description);
        this.getView().setDonations(donations);
        this.getView().setFullPrice(fullPrice);

        return data;
    };

    /**
     * Will be called when card data wasn't loaded
     * @param  {object} err error object
     * @private
     */
    CardPage.prototype.cardLoadRejectHandler_ = function(err) {
        console.error(err);
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
    };

    /**
     * Card click handler
     * @param {Object} event
     * @private
     */
    CardPage.prototype.cardClickHandler_ = function(event) {
        Router.getInstance().changeLocation(Route['CARD'], {
            'id': event.cardId
        });
    };

    /**
     * Load success cards handler
     * @param {Object|Array} response
     * @private
     */
    CardPage.prototype.loadCardsResolveHandler_ = function(response) {
        var cardList = null;

        if (Array.isArray(response)) {
            cardList = response[0].data.concat(response[1].data);
        } else {
            cardList = response.data;
        }

        this.cardList_.renderCards(cardList);
    };

    /**
     * Load fail cards handler
     * @param {Object} err
     * @private
     */
    CardPage.prototype.loadCardsRejectHandler_ = function(err) {
        console.error(err);
    };

    /**
    * Start helping button click handler
    * @private
    */
    CardPage.prototype.onStartHelpingButtonClick_ = function() {
        UserService.getInstance().addEntity(this.params.cardId)
        .then(function() {
            this.setThanksButton_();
            this.getView().showStopHelpingLink();
        }, function(err) {
            console.error(err);
        }, this);

    };

    /**
    * Stop helping link clikc handler
    * @private
    */
    CardPage.prototype.onStopHelpingLinkClick_ = function() {
        UserService.getInstance().removeEntity(this.params.cardId)
        .then(function() {
            this.setStartHelpingButton_();
            this.getView().hideStopHelpingLink();
        }, function(err) {
            console.error(err);
        }, this);
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

        this.cardButton_ = this.renderChild(
            'ButtonSber', domButtonContainer, buttonConfig
        );
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
