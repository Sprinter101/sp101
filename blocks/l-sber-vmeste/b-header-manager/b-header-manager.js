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
            'type': 'profile', 'roundButton': 'Я',
            'choice_phrase': '', 'help_phrase': 'about_profile'}
        },
        LIST: {'config': {
            'type': 'list', 'roundButton': 'Я',
            'choice_phrase': 'list',
            'help_phrase': 'about_list'}
        },
        CHOICE: {'config': {
            'type': 'choice', 'roundButton': 'Я',
            'choice_phrase': 'donation',
            'help_phrase': 'donation'}
        },
        CARD: {'config': {
            'type': 'card', 'roundButton': 'Я',
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
     * @return {Object} Returns current header
     * @protected
     */
    Manager.prototype.setProfileHeader = function(opt_params) {
        var params = Manager.HeaderStates.PROFILE;
        this.headerType_ = this.header_.getCurrentHeaderType();
        if (opt_params.login === 'authorized') {
            params.config.roundButton = 'ПК';
        }
        else if (opt_params.login === 'registration') {
            params.config.roundButton = 'X';
        }
        else {
            params.config.roundButton = 'Я';
        }
        var headerType = opt_params.type;
        this.removeChild(this.header_, true);
        this.header_ = this.renderChild(
            'Header', this.getElement(), params
        );
        return this.header_;
    };

     /**
     * set donation choice header
     * @param {Object=} opt_params
     * @return {Object} Returns current header
     * @protected
     */
    Manager.prototype.setChoiceHeader = function(opt_params) {
        var params = Manager.HeaderStates.CHOICE;
        this.headerType_ = this.header_.getCurrentHeaderType();
        var headerType = opt_params.type;
        //if (headerType !== this.headerType_) {
        this.removeChild(this.header_, true);
        this.header_ = this.renderChild('Header',
            this.getElement(), params);
            return this.header_;
    };

    /**
     * set header with items list
     * @param {Object=} opt_params
     * @return {Object} Returns current header
     * @protected
     */
    Manager.prototype.setListHeader = function(opt_params) {
        var params = Manager.HeaderStates.LIST;
        this.headerType_ = this.header_.getCurrentHeaderType();
        if (opt_params.login === 'authorized') {
            params.config.roundButton = 'ПК';
        }
        else if (opt_params.login === 'registration') {
            params.config.roundButton = 'X';
        }
        else {
            params.config.roundButton = 'Я';
        }
        var headerType = opt_params.type;

        this.removeChild(this.header_, true);
        this.header_ = this.renderChild('Header',
            this.getElement(), params
        );
        return this.header_;
    };


     /**
     * set card header
     * @param {Object=} opt_params
     * @return {Object} Returns current header
     * @protected
     */
    Manager.prototype.setCardHeader = function(opt_params) {
        var params = Manager.HeaderStates.CARD;
        this.headerType_ = this.header_.getCurrentHeaderType();
        switch (opt_params.choice_phrase) {
        case 'directions':
            params.config.choice_phrase = 'directions';
            break;
        case 'themes':
            params.config.choice_phrase = 'themes';
            break;
        case 'fund':
            params.config.choice_phrase = 'fund';
           break;
        default:
             params.config.choice_phrase = 'directions';
        }
        var headerType = opt_params.type;

        this.removeChild(this.header_, true);
        this.header_ = this.renderChild('Header',
            this.getElement(), params
        );
        return this.header_;
    };


    /**
     * Return current header
     * @return {sv.lSberVmeste.bHeader.Header}
     */
    Manager.prototype.getCurrentHeader = function() {
        return this.header_;
    };

});  // goog.scope
