goog.provide('sv.lSberVmeste.View');

goog.require('cl.iControl.View');
goog.require('sv.lSberVmeste.bHeaderManager.View');
goog.require('sv.lSberVmeste.bPageManager.View');



/**
 * sv.lSberVmeste.View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
*/
sv.lSberVmeste.View = function(opt_params, opt_template, opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.lSberVmeste.View.CssClass.ROOT);
};
goog.inherits(sv.lSberVmeste.View, cl.iControl.View);

goog.scope(function() {
    var View = sv.lSberVmeste.View,
    HeaderManagerView = sv.lSberVmeste.bHeaderManager.View;
    PageManagerView = sv.lSberVmeste.bPageManager.View;

    /**
     * Css class enum
     * @enum {string}
    */
    View.CssClass = {
        ROOT: 'l-sber-vmeste',
        CONTENT_WRAPPER: 'l-sber-vmeste__wrapper',
        ROOT_DESKTOP: 'l-sber-vmeste_desktop',
        WRAPPER_DESKTOP: 'l-sber-vmeste__wrapper_desktop'
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dom.headerManager = this.getElementByClass(
            HeaderManagerView.CssClass.ROOT
        );

        this.dom.pageManager = this.getElementByClass(
            PageManagerView.CssClass.ROOT
        );

        this.dom.contentWrapper = this.getElementByClass(
            View.CssClass.CONTENT_WRAPPER,
            this.getElement()
        );
    };

    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        var regexp = new RegExp('Android|webOS|iPhone|iPad|' +
            'iPod|BlackBerry|IEMobile|Opera Mini', 'i');

        if (!(regexp.test(navigator.userAgent))) {
            this.addDesktopSpecificClasses();
        }
    };

    /**
     * Adds desktop-specific classes to elements
     */
    View.prototype.addDesktopSpecificClasses = function() {
        goog.dom.classlist.add(
            this.getElement(),
            View.CssClass.ROOT_DESKTOP
        );

        goog.dom.classlist.add(
            this.dom.contentWrapper,
            View.CssClass.WRAPPER_DESKTOP
        );
    };

});  // goog.scope
