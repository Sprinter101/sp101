goog.provide('sv.lSberVmeste.bCardPage.View');

goog.require('cl.iControl.Control');
goog.require('goog.dom.classlist');
goog.require('sv.iUtils.Utils');



/**
 * sv.lSberVmeste.bCardPage.View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
*/
sv.lSberVmeste.bCardPage.View = function(opt_params,
                                            opt_template,
                                            opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.lSberVmeste.bCardPage.View.CssClass.ROOT);
};
goog.inherits(sv.lSberVmeste.bCardPage.View, cl.iControl.View);

goog.scope(function() {
    var View = sv.lSberVmeste.bCardPage.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-card-page',
        BUTTON_CONTAINER: 'b-card-page__card-button',
        CARD_LIST: 'b-card-list',
        STOP_HELPING_LINK: 'b-card-page__stop-helping',
        HIDDEN: sv.iUtils.Utils.CssClass.HIDDEN,
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dom.buttonContainer = this.getElementByClass(
                                        View.CssClass.BUTTON_CONTAINER
                                    );
        this.dom.cardList = this.getElementByClass(
                                    View.CssClass.CARD_LIST
                            );
        this.dom.stopHelpingLink = this.getElementByClass(
                                    View.CssClass.STOP_HELPING_LINK
                                    );
    };

    /**
    * Shows stop helping link
    */
    View.prototype.showStopHelpingLink = function() {
        goog.dom.classlist.remove(
            this.dom.stopHelpingLink,
            View.CssClass.HIDDEN
        );
    };

    /**
    * Hides stop helping link
    */
    View.prototype.hideStopHelpingLink = function() {
        goog.dom.classlist.add(
            this.dom.stopHelpingLink,
            View.CssClass.HIDDEN
        );
    };

});  // goog.scope
