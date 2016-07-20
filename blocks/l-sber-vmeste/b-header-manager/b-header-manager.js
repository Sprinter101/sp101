goog.provide('sv.lSberVmeste.bHeaderManager.HeaderManager');

goog.require('cl.iContentManager.ContentManager');
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
        Header = sv.lSberVmeste.bHeader.Header;

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
            'help_phrase': 'donation'}
        }
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
        var loggedIn = opt_params.loggedIn;
        switch (opt_params.pageType) {
        case 'start':
            params.config.roundButton = this.setButtonContent(opt_params);
            params.config.help_phrase = 'about_profile';
            that.renderHeader(params);
            break;
        case 'profile':
            params.config.roundButton = 'x';
            params.config.help_phrase = 'logout';
            that.renderHeader(params);
            break;
        case 'registration':
            params.config.roundButton = 'x';
            params.config.help_phrase = 'about_profile';
            this.renderHeader(params);
            break;
        default:
            params.config.roundButton = 'я';
            params.config.help_phrase = 'about_profile';
            that.renderHeader(params);
        }
    };

     /**
     * set content for 'me'
     * @param {Object} params
     * @return {string}
     * @protected
     */
    Manager.prototype.setButtonContent = function(params) {
        var roundButton;
        if (params.loggedIn) {
            roundButton = params.firstName[0] +
                params.lastName[0];
        }
        else {
            roundButton = 'я';
        }
        return roundButton;
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
     * set donation choice header
     * @protected
     */
    Manager.prototype.setChoiceHeader = function() {
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
        var loggedIn = opt_params.loggedIn;
        params.config.roundButton = this.setButtonContent(opt_params);
        params.config.help_phrase = 'about_list';
        that.renderHeader(params);
    };


     /**
     * set card header
     * @param {Object=} opt_params
     * @protected
     */
    Manager.prototype.setCardHeader = function(opt_params) {
        var params = Manager.HeaderStates.CARD;
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
