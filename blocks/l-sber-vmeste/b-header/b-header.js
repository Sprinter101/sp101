goog.provide('sv.lSberVmeste.bHeader.Header');

goog.require('cl.iControl.Control');
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

};
goog.inherits(sv.lSberVmeste.bHeader.Header, cl.iControl.Control);


goog.scope(function() {
    var Header = sv.lSberVmeste.bHeader.Header,
        View = sv.lSberVmeste.bHeader.View;

    /**
     * Event enum
     * @enum {string}
     */
    Header.Event = {

    };

    /**
     * @override
     * @param {Element} element
     */
    Header.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

    };

    /**
     * @override
     */
    /*Header.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

    };*/

    /**
     * Show header
     */
    Header.prototype.show = function() {
        this.getView().show();
    };

    /**
     * Hide header
     */
    Header.prototype.hide = function() {
        this.getView().hide();
    };

});  // goog.scope

