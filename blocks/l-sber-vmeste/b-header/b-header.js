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
        LOG_OUT: '/auth/logout'
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

        //this.checkListHeaderLayout_;

    };

    /**
     * @override
     */
    Header.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler().listen(
            this.arrowBack_,
            Icon.Event.CLICK,
            this.onArrowBackClick_
        );

        this.viewListen(
            View.Event.HELP_CLICK,
            this.onHelpClick_
        );

    };

    /**
    * Choose correct content for list header phrase
    * @param {Object} params
    */
    Header.prototype.renderListPageTitle = function(params) {
        var loggedIn = params.loggedIn;
        var pageType = params.pageType;
        this.getView().renderListPageTitle({
            'loggedIn': loggedIn,
            'pageType': pageType
        });
    };

     /**
    * Choose correct content for header button
    * @param {Object} params
    */
    Header.prototype.renderButton = function(params) {
        var content;
        if (params.pageType === 'start' || params.pageType === 'list') {
            if (params.loggedIn) {
            content = params.firstName[0] + params.lastName[0];
        }
            else {
                content = 'я';
            }
        }
        else if (params.pageType === 'profile' ||
            params.pageType === 'registration') {
                content = 'x';
        }
        this.getView().renderButton(content);

         this.button_ = this.decorateChild(
            'ButtonSber',
            this.getView().getDom().button
        );
        this.getHandler().listen(
            this.button_,
            Button.Event.CLICK,
            this.onButtonClick_
        );
    };

     /**
    * Choose correct phrase for header help_phrase
    * @param {Object} params
    */
    Header.prototype.renderCorrectHelp = function(params) {
        if (params.help_phrase === 'logout') {
             this.getView().renderCorrectHelp(params.help_phrase);
        }
    };

    /**
    * Choose correct phrase for header title
    * @param {string} phrase
    */
    Header.prototype.renderCorrectTitle = function(phrase) {
        this.getView().renderCorrectTitle(phrase);
    };

    /**
    * check layout for correct rendering list header
    * @private
    */
    Header.prototype.checkListHeaderLayout_ = function() {
        this.getView().checkLayout();
    };

     /**
     * Handles 'back' click event
     * @param {cl.gIcon.Icon.Event.CLICK} event
     * @private
     */
    Header.prototype.onArrowBackClick_ = function(event) {
        Router.getInstance().returnLocation();
    };

    /**
     * Handles 'me' button click event
     * @param {sv.gButton.Button} event
     * @private
     */
    Header.prototype.onButtonClick_ = function(event) {
        var roundButtonContent = this.getView().getDom().button.innerHTML;
        if (this.getView().checkButtonCustomClass()) {
            if (roundButtonContent === 'я') {
                Router.getInstance().changeLocation(
                    Route.REGISTRATION);
            }
            else {
                 Router.getInstance().changeLocation(
                    Route.PROFILE);
            }
        }
        else {
            Router.getInstance().returnLocation();
        }
    };

     /**
     * Handles help phrase click event
     * @param {sv.bHeader.View.Event.HELP_CLICK} event
     * @private
     */
    Header.prototype.onHelpClick_ = function(event) {
        if (this.getView().checkHelpClass()) {
            Request.getInstance().send({
                url: Header.URL.LOG_OUT,
                type: 'POST'
            })
            .then(this.handleSuccessLogout_,
                this.handleRejectionLogout_,
                this
            );
        }
    };

     /**
    * Ajax success handler
    * @param {Object} response
    * @private
    */
    Header.prototype.handleSuccessLogout_ = function(response) {
        Router.getInstance().changeLocation(
            Route.START);
    };

    /**
    * Ajax rejection handler
    * @param {Object} err
    * @private
    */
    Header.prototype.handleRejectionLogout_ = function(err) {
        console.log(err);
    };

});  // goog.scope
