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
            'type': 'profile', 'roundButton': '',
            'choice_phrase': '', 'help_phrase': 'about-profile'}
        },
        LIST: {'config': {
            'type': 'list', 'roundButton': '',
            'choice_phrase': 'list',
            'help_phrase': 'about-list'}
        },
        CHOICE: {'config': {
            'type': 'choice', 'roundButton': '',
            'choice_phrase': 'donation',
            'help_phrase': 'donation'}
        },
        CARD: {'config': {
            'type': 'card', 'roundButton': '',
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
    };

    /**
     * @override
     */
    Manager.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

    };

    /**
     * set profile header
     */
    Manager.prototype.setProfileHeader = function() {
        var params = Manager.HeaderStates.PROFILE;
        this.renderHeader_(params);
    };

    /**
     * render header
     * @param {Object} params
     * @return {Object} Returns current header
     * @private
     */
    Manager.prototype.renderHeader_ = function(params) {
        if (this.header_) {
            this.removeChild(this.header_, true);
        }
        this.header_ = this.renderChild(
            'Header', this.getElement(), params
        );
        return this.header_;
    };

     /**
     * set donation choice header
     */
    Manager.prototype.setChoiceHeader = function() {
        var params = Manager.HeaderStates.CHOICE;
        this.renderHeader_(params);
    };

    /**
     * set header with items list
     * @param {Object=} opt_params
     */
    Manager.prototype.setListHeader = function(opt_params) {
        var params = Manager.HeaderStates.LIST;
        this.renderHeader_(params);
    };


     /**
     * set card header
     * @param {Object=} opt_params
     */
    Manager.prototype.setCardHeader = function(opt_params) {
        var params = Manager.HeaderStates.CARD;
        params.data || (params.data = []);
        params.data.cardId = opt_params.cardId;
        this.renderHeader_(params);
    };


    /**
     * Return current header
     * @return {sv.lSberVmeste.bHeader.Header}
     */
    Manager.prototype.getCurrentHeader = function() {
        return this.header_;
    };

});  // goog.scope
