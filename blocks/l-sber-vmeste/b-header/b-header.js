goog.provide('sv.lSberVmeste.bHeader.Header');

goog.require('cl.gIcon.Icon');
goog.require('cl.iControl.Control');
goog.require('cl.iRequest.Request');
goog.require('goog.events');
goog.require('sv.gButton.Button');
goog.require('sv.lSberVmeste.bHeader.View');
goog.require('sv.lSberVmeste.iRouter.Route');
goog.require('sv.lSberVmeste.iRouter.Router');



/**
 * sv.lSberVmeste.bHeader.Header control
 * @param {sv.lSberVmeste.bHeader.View} view View used to render or
 *     decorate the component; defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {cl.iControl.Control}
 */
sv.lSberVmeste.bHeader.Header = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

    /**
     * 'back' icon
     * @type {cl.gIcon.Icon}
     * @private
     */
    this.arrowBack_ = null;

    /**
     * header button
     * @type {cl.gButton.Button}
     * @private
     */
    this.button_ = null;


};
goog.inherits(sv.lSberVmeste.bHeader.Header, cl.iControl.Control);


goog.scope(function() {
    var Header = sv.lSberVmeste.bHeader.Header,
        Button = sv.gButton.Button,
        Icon = cl.gIcon.Icon,
        View = sv.lSberVmeste.bHeader.View,
        Request = cl.iRequest.Request,
        Route = sv.lSberVmeste.iRouter.Route,
        Router = sv.lSberVmeste.iRouter.Router;

    /**
     * Event enum
     * @enum {string}
     */
    Header.Event = {
        ARROW_BACK_CLICK: 'arrow-back-click',
        BUTTON_ME_CLICK: 'button-me-click',
        BUTTON_CLOSE_CLICK: 'button-close-click'
    };

    /**
     * Api enum
     * @type {string}
     */
    Header.URL = {
        CARD_ID: '/entity/',
        LOG_OUT: '/auth/logout',
        ABOUT_PROJECT: '',
    };

    /**
     * @override
     * @param {Element} element
     */
    Header.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.arrowBack_ = this.decorateChild(
            'IconSber',
            this.getView().getDom().arrowBack
        );

        this.button_ = this.decorateChild(
            'ButtonSber',
            this.getView().getDom().button
        );

        this.getListType();
        this.checkListHeaderLayout;

    };

    /**
     * @override
     */
    Header.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler().listen(
            this.arrowBack_,
            Icon.Event.CLICK,
            this.onArrowBackClick
        )
        .listen(
            this.button_,
            Button.Event.CLICK,
            this.onButtonClick
        );

        this.viewListen(
            View.Event.HELP_CLICK,
            this.onHelpClick
        );
    };

     /**
     * only for list headerType
     * fetches list type from server
     * @protected
     */
    Header.prototype.getListType = function() {
        if (this.params.hasOwnProperty('config')) {
            if (this.params.config.type === 'card') {
                var cardId = this.params.config.id;
                var cardUrl = Header.URL.CARD_ID + cardId;
                Request.getInstance().send({
                    url: cardUrl})
                    .then(this.handleSuccess,
                        this.handleRejection,
                        this);
            }
        }
    };

    /**
    * invokes method for preparing
    * correct rendering choice phrase
    * @param {Object} response
    */
   Header.prototype.handleSuccess = function(response) {
            var data = response.data.type;
            this.renderCorrectTitle(data);
    };

    /**
    * Ajax rejection handler
    * Prints default userfunds count
    * if server responded with error
    * @param {Object} err
    */
    Header.prototype.handleRejection = function(err) {
        var defaultPhrase = 'directions';
        this.renderCorrectTitle(defaultPhrase);
    };

    /**
    * Choose correct phrase for header title
    * @param {string} phrase
    * @protected
    */
    Header.prototype.renderCorrectTitle = function(
       phrase) {
        this.getView().renderCorrectTitle(phrase);
    };

    /**
    * Render correct help phrase
    * @protected
    */
    Header.prototype.checkListHeaderLayout = function() {
        this.getView().checkLayout();
    };

     /**
     * Handles 'back' click event
     * @param {cl.gIcon.Icon.Event.CLICK} event
     */
    Header.prototype.onArrowBackClick = function(event) {
        var customEvent = new goog.events.Event(
            Header.Event.ARROW_BACK_CLICK, this);
            this.dispatchEvent(customEvent);
            Router.getInstance().returnLocation();
    };

    /**
     * Handles 'me' button click event
     * @param {sv.gButton.Button} event
     */
    Header.prototype.onButtonClick = function(event) {
        console.log('button click');
        if (this.getView().checkButtonCustomClass()) {
            Router.getInstance().changeLocation(
            Route.PROFILE);
        }
        else {
            Router.getInstance().returnLocation();
        }
    };

     /**
     * Handles help phrase click event
     * @param {sv.bHeader.View.Event.HELP_CLICK} event
     */
    Header.prototype.onHelpClick = function(event) {
         if (this.params.hasOwnProperty('config')) {
            if (this.params.config.help_phrase === 'logout') {
                Request.getInstance().send({
                    url: Header.URL.LOG_OUT,
                    type: 'POST'
                })
                .then(this.handleSuccessLogout,
                    this.handleRejectionLogout,
                    this);
            }
        }
    };

     /**
    * Ajax success handler
    * @param {Object} response
    */
    Header.prototype.handleSuccessLogout = function(response) {
        Router.getInstance().changeLocation(
            Route.START);
    };

    /**
    * Ajax rejection handler
    * @param {Object} err
    */
    Header.prototype.handleRejection = function(err) {
        console.log(err);
    };

});  // goog.scope

