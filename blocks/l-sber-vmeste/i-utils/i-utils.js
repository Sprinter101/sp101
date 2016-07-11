goog.provide('sv.iUtils.Utils');

goog.require('cl.iUtils.Utils');
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
        HIDDEN: 'i-utils__hidden',
        CLEARFIX: 'i-utils__clearfix'
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

    /**
     * Return word with right ending (for soy)
     * Example - {num: 2, nom: 'час', gen: 'часа', plu: 'часов'},
     * that returns 'часа'
     * @param {{
     *     num: number,
     *     nom: string,
     *     gen: string,
     *     plu: string
     * }} data
     * @return {String}
     */
    Utils.declensionPrint = function(data) {
        var num = Math.abs(data.num);

        var word = '';

        if (num.toString().indexOf('.') > -1) {
            word = data.gen;
        } else {
            word = num % 10 == 1 && num % 100 != 11 ?
                data.nom :
                num % 10 >= 2 &&
                num % 10 <= 4 &&
                (num % 100 < 10 || num % 100 >= 20) ?
                    data.gen : data.plu;
        }

        return word;
    };
});  // goog.scope
