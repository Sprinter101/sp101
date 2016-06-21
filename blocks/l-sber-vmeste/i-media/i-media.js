goog.provide('aa.iMedia.Media');



/**
 * Provides list of breakpoints and methods to query screen width
 * @constructor
 * TODO refactor into singleton
 * listen to resize event here instead of dealing with it in each block
 */
aa.iMedia.Media = function() {

};

goog.scope(function() {
    var Media = aa.iMedia.Media;

    /**
     * Breakpoint enum
     * @enum {number}
     */
    Media.Breakpoint = {
        S: 375,
        M: 768,
        L: 951,
        XL: 1024
    };

    /**
     * Checks if screen size is XS
     * @return {boolean}
     */
    Media.isextraSmall = function() {
        return window.innerWidth < Media.Breakpoint.S;
    };

    /**
     * Checks if screen size is S
     * @return {boolean}
     */
    Media.isSmall = function() {
        return Media.Breakpoint.S <= window.innerWidth &&
        window.innerWidth < Media.Breakpoint.M;
    };

    /**
     * Checks if screen size is M
     * @return {boolean}
     */
    Media.isMedium = function() {
        return Media.Breakpoint.M <= window.innerWidth &&
            window.innerWidth < Media.Breakpoint.L;
    };

    /**
     * Checks if screen size is L+
     * @return {boolean}
     */
    Media.isLarge = function() {
        return Media.Breakpoint.L <= window.innerWidth &&
            window.innerWidth < Media.Breakpoint.X;
    };

    /**
     * Checks if screen size is X+
     * @return {boolean}
     */
    Media.isExtraLarge = function() {
        return window.innerWidth >= Media.Breakpoint.X;
    };

});  // goog.scope
