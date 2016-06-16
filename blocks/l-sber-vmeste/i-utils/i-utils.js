goog.provide('sv.iUtils.Utils');

goog.require('goog.dom.classlist');



/**
 * active age utils
 * @constructor
 */
sv.iUtils.Utils = function() {
};

goog.scope(function() {
    var Utils = sv.iUtils.Utils;

    /**
     * Css class enum
     * @enum {string}
     */
    Utils.CssClass = {
        HIDDEN: 'i-utils__hidden'
    };

    /**
    * return true if object empty
    * @param {Object} obj
    * @return {Boolean}
    */
    Utils.isEmptyObject = function(obj) {
        return Object.keys(obj).length == 0;
    };
    /**
    * returns array
    * @param {Object} obj
    * @return {Array}
    */
    Utils.toArray = function(obj) {
        return Array.prototype.slice.apply(obj);
    };

    /**
     * Hides dom element
     * @param {Element} element DOM node to hide
     */
    Utils.hide = function(element) {
        goog.dom.classlist.add(
            element,
            Utils.CssClass.HIDDEN
        );
    };

    /**
     * Shows previously hidden dom element
     * @param {Element} element DOM node to show
     */
    Utils.show = function(element) {
        goog.dom.classlist.remove(
            element,
            Utils.CssClass.HIDDEN
        );
    };
});  // goog.scope
