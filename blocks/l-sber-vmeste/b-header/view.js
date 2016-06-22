goog.provide('sv.lSberVmeste.bHeader.View');

goog.require('cl.iControl.View');
goog.require('goog.dom');
goog.require('goog.events.EventType');
goog.require('sv.iUtils.Utils');



/**
 * sv.lSberVmeste.bHeader.View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sv.lSberVmeste.bHeader.View = function(opt_params, opt_template, opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.lSberVmeste.bHeader.View.CssClass.ROOT);

};
goog.inherits(sv.lSberVmeste.bHeader.View, cl.iControl.View);

goog.scope(function() {
    var View = sv.lSberVmeste.bHeader.View,
        Utils = sv.iUtils.Utils;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-header'
    };

    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {

    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        };

    /**
     * @override
     */
    /*View.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

    };*/

    /**
     * Show header
     */
    View.prototype.show = function() {
        goog.dom.classlist.remove(this.getElement(), Utils.CssClass.HIDDEN);
    };

    /**
     * Hide header
     */
    View.prototype.hide = function() {
        goog.dom.classlist.add(this.getElement(), Utils.CssClass.HIDDEN);
    };

});  // goog.scope
