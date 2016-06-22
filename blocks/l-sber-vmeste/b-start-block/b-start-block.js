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

};
goog.inherits(sv.lSberVmeste.bStartBlock.StartBlock, 'cl.iControl.Control');


goog.scope(function() {
    var StartBlock = sv.lSberVmeste.bStartBlock.StartBlock,
        View = sv.lSberVmeste.bStartBlock.View;

    /**
     * Event enum
     * @enum {string}
     */
    StartBlock.Event = {

    };

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
    };

});  // goog.scope
