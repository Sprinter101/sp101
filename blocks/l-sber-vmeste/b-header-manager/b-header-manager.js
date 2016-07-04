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
     * @override
     * @param {Element} element
     */
    Manager.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.header_ = this.decorateChild(
            'Header',
            this.getView().getDom().header
        );

        this.headerType_ = 'start';
    };

    /**
     * Set title
     * @protected
     * @param {string} title
     */
    Manager.prototype.setTitle = function(title) {
        if (typeof this.header_.setTitle == 'function') {
            this.header_.setTitle(title);
        }
    };

    /**
     * Change header
     * @param {string} controlItem
     * @param {Object=} opt_params
     * @return {Object} Returns current header
     * @protected
     */
    Manager.prototype.setCurrentHeader = function(controlItem, opt_params) {
        var headerType = opt_params['config']['headerType'];
        if (headerType != this.headerType_) {
            this.removeChild(this.header_, true);
            this.headerType_ = headerType;
            this.header_ = this.renderChild(controlItem,
                this.getElement(), opt_params);
        }

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
