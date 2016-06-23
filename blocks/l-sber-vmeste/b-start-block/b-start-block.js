goog.provide('sv.lSberVmeste.bStartBlock.StartBlock');

goog.require('cl.iControl.Control');
goog.require('goog.dom');
goog.require('goog.events.EventType');
goog.require('sv.lSberVmeste.bStartBlock.View');



/**
 * sv.lSberVmeste.bStartBlock.StartBlock control
 * @param {sv.lSberVmeste.bStartBlock.View} view View used to render or
 *     decorate the component; defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {'cl.iControl.Control'}
 */
sv.lSberVmeste.bStartBlock.StartBlock = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

    /**
     * start button
     * @type {string}
     * @private
     */
    this.startButton_ = null;
};
goog.inherits(sv.lSberVmeste.bStartBlock.StartBlock, cl.iControl.Control);


goog.scope(function() {
    var StartBlock = sv.lSberVmeste.bStartBlock.StartBlock,
        View = sv.lSberVmeste.bStartBlock.View;

    /**
     * Event enum
     * @enum {string}
     */
    StartBlock.Event = {
        CHANGE_PAGE: 'change-page'
    };

    /**
    * @override
    * @param {Element} element
    */
    StartBlock.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.startButton_ = this.decorateChild(
            'ButtonSber',
            this.getView().getDom().startButton
            );
    };

    /**
     * Handles view click event by pushing it
     * to the start page
     * @param {View.Event.BUTTON_START_CLICK} event
     */
    StartBlock.prototype.onViewEventClick = function(event) {
        this.dispatchEvent({
            type: StartBlock.Event.CHANGE_PAGE
           });
    };

    /**
    * @override
    */
    StartBlock.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.viewListen(View.Event.BUTTON_START_CLICK,
            this.onViewEventClick
        );
    };

     

});  // goog.scope
