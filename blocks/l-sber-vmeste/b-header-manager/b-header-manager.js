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

        this.headerType_ = 'Header';
    };

    /**
     * Show header
     * @protected
     */
    Manager.prototype.show = function() {
        this.header_.show();
    };

    /**
     * Hide header
     * @protected
     */
    Manager.prototype.hide = function() {
        this.header_.hide();
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
     * @param {string} headerType
     * @param {Object=} opt_params
     * @return {Object} Returns current header
     * @protected
     */
    Manager.prototype.setCurrentHeader = function(headerType, opt_params) {
        if (headerType != this.headerType_) {
            this.removeChild(this.header_, true);
            this.headerType_ = headerType;
            this.header_ = this.renderChild(headerType,
                this.getElement(), opt_params);
        }

        return this.header_;
    };
});  // goog.scope
