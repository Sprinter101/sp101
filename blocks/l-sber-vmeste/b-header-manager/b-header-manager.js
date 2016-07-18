goog.provide('sv.lSberVmeste.bHeaderManager.HeaderManager');

goog.require('cl.iContentManager.ContentManager');
goog.require('cl.iRequest.Request');
goog.require('sv.lSberVmeste.bHeader.Header');



/**
 * sv.lSberVmeste.bHeaderManager.HeaderManager control
 * @param {cl.gContentManager.View} view View used to render or
 *     decorate the component; defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {cl.iContentManager.ContentManager}
 */
sv.lSberVmeste.bHeaderManager.HeaderManager = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

    /**
     * Header instance
     * @type {sv.lSberVmeste.bHeader.Header}
     * @private
     */
    this.header_ = null;
};
goog.inherits(
    sv.lSberVmeste.bHeaderManager.HeaderManager,
    cl.iContentManager.ContentManager
);


goog.scope(function() {
    var Manager = sv.lSberVmeste.bHeaderManager.HeaderManager,
        Header = sv.lSberVmeste.bHeader.Header,
        Request = cl.iRequest.Request;

     /**
     * header params enum
     * @enum {object}
     */
    Manager.HeaderStates = {
        PROFILE: {'config': {
            'type': 'profile', 'roundButton': 'я',
            'choice_phrase': '', 'help_phrase': 'about_profile'}
        },
        LIST: {'config': {
            'type': 'list', 'roundButton': 'я',
            'choice_phrase': 'list',
            'help_phrase': 'about_list'}
        },
        CHOICE: {'config': {
            'type': 'choice', 'roundButton': 'я',
            'choice_phrase': 'donation',
            'help_phrase': 'donation'}
        },
        CARD: {'config': {
            'type': 'card', 'roundButton': 'я',
            'choice_phrase': 'directions',
            'help_phrase': 'donation', 'id': null}
        }
    };

    /**
     * Api enum
     * @type {string}
     */
    Manager.URL = {
        USER_URL: '/user'
    };

    /**
     * @override
     * @param {Element} element
     */
    Manager.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.header_ = this.decorateChild(
            'Header',
            this.getView().getDom().header
        );
    };

    /**
     * @override
     */
    Manager.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

    };

    /**
     * set profile header
     * @param {Object=} opt_params
     * @protected
     */
    Manager.prototype.setProfileHeader = function(opt_params) {
        var params = Manager.HeaderStates.PROFILE;
        var that = this;

        if (opt_params.pageType === 'start') {
            Request.getInstance().send({
                url: Manager.URL.USER_URL
            }).
            then(
                this.setProfileAuthorized,
                this.setProfileAnonymous,
                this
            )
            .then(function(roundButton) {
                params.config.roundButton = roundButton;
                that.renderHeader(params);
            });
        }
        else if (opt_params.pageType === 'registration') {
            params.config.roundButton = 'x';
            this.renderHeader(params);
        }
    };

    /**
     * render header
     * @param {Object} params
     * @return {Object} Returns current header
     * @protected
     */
    Manager.prototype.renderHeader = function(params) {
        this.removeChild(this.header_, true);
        this.header_ = this.renderChild(
            'Header', this.getElement(), params
        );
        return this.header_;
    };

    /**
     * set correct value to round button
     * @param {Object} response
     * @return {string}
     * @protected
     */
    Manager.prototype.setProfileAuthorized = function(response) {
        var firstName = response.firstName[0];
        var lastName = response.lastName[0];
        var roundButton = firstName + lastName;
        return roundButton;
    };

    /**
     * set correct value to round button
     * @param {Object} err
     * @return {string}
     * @protected
     */
    Manager.prototype.setProfileAnonymous = function(err) {
        console.log(err);
        var roundButton = 'я';
        return roundButton;
    };

     /**
     * set donation choice header
     * @param {Object=} opt_params
     * @protected
     */
    Manager.prototype.setChoiceHeader = function(opt_params) {
        var params = Manager.HeaderStates.CHOICE;
        this.renderHeader(params);
    };

    /**
     * set header with items list
     * @param {Object=} opt_params
     * @protected
     */
    Manager.prototype.setListHeader = function(opt_params) {
        var params = Manager.HeaderStates.LIST;
        var that = this;
        Request.getInstance().send({
                url: Manager.URL.USER_URL
            }).
            then(
                this.setProfileAuthorized,
                this.setProfileAnonymous,
                this
            )
            .then(function(roundButton) {
                params.config.roundButton = roundButton;
                that.renderHeader(params);
            });
    };


     /**
     * set card header
     * @param {Object=} opt_params
     * @protected
     */
    Manager.prototype.setCardHeader = function(opt_params) {
        var params = Manager.HeaderStates.CARD;
        if (opt_params.cardId !== undefined) {
            params.config.id = opt_params.cardId;
            console.log(params.config.id);
        }
        this.renderHeader(params);
    };


    /**
     * Return current header
     * @return {sv.lSberVmeste.bHeader.Header}
     */
    Manager.prototype.getCurrentHeader = function() {
        return this.header_;
    };

});  // goog.scope
