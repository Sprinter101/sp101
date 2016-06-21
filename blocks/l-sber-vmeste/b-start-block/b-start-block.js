goog.provide('sv.lSberVmeste.bStartBlock.StartBlock');

goog.require('cl.iControl.Control');
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

};
goog.inherits(sv.lSberVmeste.bStartBlock.StartBlock, 'cl.iControl.Control');


goog.scope(function() {
    var StartBlock = sv.lSberVmeste.bStartBlock.StartBlock,
        View = sv.lSberVmeste.bStartBlock.View;

    /**
    * @override
    * @param {Element} element
    */
    StartBlock.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);
    };

    /**
    * @override
    */
    StartBlock.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler().listen(
            this.dom.startButton,
            View.Event.BUTTON_START_CLICK,
            this.onStartButtonClick
        );
    };

     /**
     * Simply passing through an event from view
     * @param {goog.events.Event} event
     */
    StartBlock.prototype.onStartButtonClick = function(event) {
        this.dispatchEvent(event);
    };

});  // goog.scope
