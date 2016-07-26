goog.provide('sv.lSberVmeste.bListPage.ListPage');

goog.require('goog.object');
goog.require('sv.gTab.gListTab.Tab');
goog.require('sv.lSberVmeste.bCardList.CardList');
goog.require('sv.lSberVmeste.bListPage.View');
goog.require('sv.lSberVmeste.bUserBlock.UserBlock');
goog.require('sv.lSberVmeste.iCardService.CardService');
goog.require('sv.lSberVmeste.iPage.Page');
goog.require('sv.lSberVmeste.iRouter.Route');
goog.require('sv.lSberVmeste.iRouter.Router');
goog.require('sv.lSberVmeste.iUserService.UserService');



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
    * @type {string}
    * @private
    */
    this.listTabCategory_ = this.params.category || null;

    /**
    * @type {sv.lSberVmeste.bUserBlock.UserBlock}
    * @private
    */
    this.userBlock_ = null;

    /**
    * @type {sv.gTab.Tab}
    * @private
    */
    this.listTab_ = null;

    /**
    * @type {Array.<sv.lSberVmeste.bCardList.CardList>}
    * @private
    */
    this.cardLists_ = [];

    /**
    * @type {Array.<Object>}
    * @private
    */
    this.categoriesData_ = {};

    /**
    * @type {Array.<Object>}
    * @private
    */
    this.chosenCategoriesData_ = {};

     /**
    * @type {bool}
    * @private
    */
    this.userLoggedIn_ = false;

     /**
    * @type {bool}
    * @private
    */
    this.draft_ = true;

};
goog.inherits(sv.lSberVmeste.bListPage.ListPage,
    sv.lSberVmeste.iPage.Page);


goog.scope(function() {
    var ListPage = sv.lSberVmeste.bListPage.ListPage,
        ListTab = sv.gTab.gListTab.Tab,
        Route = sv.lSberVmeste.iRouter.Route,
        Router = sv.lSberVmeste.iRouter.Router,
        CardList = sv.lSberVmeste.bCardList.CardList,
        UserBlock = sv.lSberVmeste.bUserBlock.UserBlock,
        CardService = sv.lSberVmeste.iCardService.CardService;
        UserService = sv.lSberVmeste.iUserService.UserService;

    /**
    * Array of card types
    * @type {Array.<string>}
    */
    ListPage.CardTypes = ['topic', 'fund'];

    /**
    * @override
    * @param {Element} element
    */
    ListPage.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.header_ = this.params.header;
        if (this.header_) {
            var that = this;
            UserService.isUserLoggedIn()
                .then(function(result) {
                    that.userLoggedIn_ = result.data.loggedIn;
                    var params = that.handleSuccessLoginCheck_(result);

                    that.draft_ = params.draft;
                    that.manageHeaderContent_(params);
                    that.sendCategoriesRequest();
            }, function(err) {
                    var params = that.handleRejectionLoginCheck_(err);
                    that.manageHeaderContent_(params);
                    that.sendCategoriesRequest();
                }
            );
       }

        this.listTab_ = this.decorateChild(
            'ListTab', this.getView().getDom().listTab
        );

        this.listTab_.setActiveTab(this.listTabCategory_);

        var listTabContentTabs = this.listTab_.getContentTabs();

        for (var i = 0; i < listTabContentTabs.length; i++) {
            this.cardLists_.push(
                this.decorateChild(
                    'CardList',
                    listTabContentTabs[i].firstChild
                )
            );
        }
    };

    /**
    * @override
    */
    ListPage.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.addListCardsListeners();
    };

    /**
    * Sends ajax requests for cards
    */
    ListPage.prototype.sendCategoriesRequest = function() {
        CardService.getAllEntities()
            .then(this.handleResponse_, this.handleRejection, this);
    };

    /**
    * Adds event listeners to ListCards' events
    */
    ListPage.prototype.addListCardsListeners = function() {
        for (var i = 0; i < this.cardLists_.length; i++) {
            var cardList = this.cardLists_[i];

            this.getHandler()
                .listenOnce(
                    cardList,
                    CardList.Event.SELECTED_CARDS_PRESENT,
                    this.onSelectedCardsPresent_.bind(this, i)
                )
                .listen(
                    cardList,
                    CardList.Event.CARD_CLICK,
                    this.onCardListCardClick_,
                    null,
                    this
                )
                .listen(
                    cardList,
                    CardList.Event.CARDS_RENDERED,
                    this.onCardsRendered_,
                    null,
                    this
                );
        }
    };

    /**
    * Ajax successful response handler
    * @param {Object} response
    * @private
    */
    ListPage.prototype.handleResponse_ = function(response) {
        var data = response.data || [];

        this.populateCategoriesObjects(data);

        if (!goog.object.isEmpty(this.chosenCategoriesData_)) {

            this.createUserBlock();

            this.getView().createPageTitleText(true);
        } else {
            this.getView().createPageTitleText(false);
        }

        this.renderCardListCards();

    };

    /**
    * Ajax rejection handler
    * @param {Object} err
    * @private
    */
    ListPage.prototype.handleRejection_ = function(err) {
        console.log(err);
    };

    /**
    * Calls renderCards method of each card list
    */
    ListPage.prototype.renderCardListCards = function() {
        var categories = this.categoriesData_;

        for (var i = 0; i < this.cardLists_.length; i++) {
            var cardList = this.cardLists_[i],
                cardType = ListPage.CardTypes[i];

            cardList.renderCards(categories[cardType], 'LIST');
        }
    };

    /**
    * creates user block
    */
    ListPage.prototype.createUserBlock = function() {
        this.userBlock_ = this.renderChild(
            'ListPageUserBlock',
            this.getView().getDom().userBlock,
            {
                categories: this.chosenCategoriesData_,
                draft: this.draft_
            }
        );

        this.getHandler().listen(
            this.userBlock_,
            UserBlock.Event.BUTTON_CLICK,
            this.onUserBlockButtonClick_,
            false,
            this
        );
    };

    /**
    * populates this.categoriesData_ and this.chosenCategoriesData_ objecs
    * based on "data" array from an ajax  response
    * @param {Array.<Object>} data
    */
    ListPage.prototype.populateCategoriesObjects = function(data) {
        var categories = this.categoriesData_,
            chosenCategories = this.chosenCategoriesData_;

        for (var i = 0; i < data.length; i++) {

            var dataType = data[i].type;

            if (categories[dataType]) {
                categories[dataType].push(data[i]);
            } else {
                categories[dataType] = [data[i]];
            }

            if (data[i].checked) {
                if (chosenCategories[dataType]) {
                    chosenCategories[dataType] += 1;
                } else {
                    chosenCategories[dataType] = 1;
                }
            }
        }
    };

    /**
     * Gets called if there is a user-chosen card in a card list
     * @param {number} tabId
     * @private
     */
    ListPage.prototype.onSelectedCardsPresent_ = function(tabId) {
        this.listTab_.createIcon(tabId);
    };

    /**
    * Card list card click handler
    * @param {Object} event
    * @private
    */
    ListPage.prototype.onCardListCardClick_ = function(event) {
        Router.getInstance().changeLocation(Route['CARD'], {
            id: event.cardId
        });
    };

    /**
     * CARDS_RENDERED event handler
     * @private
     */
    ListPage.prototype.onCardsRendered_ = function() {
        this.listTab_.resizeActiveTab();
    };

    /**
    * User Block button click handler
    * @private
    */
    ListPage.prototype.onUserBlockButtonClick_ = function() {
        UserService.isUserLoggedIn()
            .then(this.redirectUser, this.handleRejection, this);
    };

    /**
     * Redirects user to another page
     * @param {Object} response
     */
    ListPage.prototype.redirectUser = function(response) {
        isLoggedIn = response.data.loggedIn;

        if (isLoggedIn) {
            Router.getInstance().changeLocation(Route['DONATE']);
        } else {
            Router.getInstance().changeLocation(Route['REGISTRATION'],
                null, {action: 'DONATE'});
        }
    };

    /**
    * Ajax success handler
    * @param {Object} response
    * @return {Object}
    * @private
    */
    ListPage.prototype.handleSuccessLoginCheck_ = function(response) {
        var loggedIn = response.data.loggedIn;
        var firstName = response.data.firstName;
        var lastName = response.data.lastName;
        var draft = response.data.userFund.draft;
        var pageType = 'list';
        return {
            'loggedIn': loggedIn,
            'firstName': firstName,
            'lastName': lastName,
            'pageType': pageType,
            'draft': draft
        };
    };

    /**
    * Ajax rejection handler
    * @param {Object} err
    * @return {Object}
    * @private
    */
    ListPage.prototype.handleRejectionLoginCheck_ = function(err) {
        console.log(err);
        var default_params = {
            'loggedIn': false,
            'firstName': undefined,
            'lastName': undefined,
            'pageType': 'list',
            'draft': true
        };
        return default_params;
    };

     /**
    * set correct buttons and phrases to this.header_
    * @param {Object} params
    * @private
    */
    ListPage.prototype.manageHeaderContent_ = function(params) {
        if (params.draft) {
            this.header_.renderButton(params);
            this.header_.renderListPageTitle(params);
        }
        else {
            this.header_.renderListPageTitle(params);
        }
    };

});  // goog.scope
