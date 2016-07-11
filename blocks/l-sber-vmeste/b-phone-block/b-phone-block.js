goog.provide('sv.lSberVmeste.bPhoneBlock.PhoneBlock');

goog.require('cl.iControl.Control');
goog.require('sv.gButton.Button');
goog.require('sv.lSberVmeste.bPhoneBlock.View');

/**
 * @param {sv.lSberVmeste.bPhoneBlock.View} view View used to render or
 *     decorate the component; defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {cl.iControl.Control}
 */

sv.lSberVmeste.bPhoneBlock.PhoneBlock = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

    /**
     * @type {Object}
     * @private
     */
    this.input_ = null;

    /**
     * @type {Object}
     * @private
     */
    this.button_ = null;


};
goog.inherits(sv.lSberVmeste.bPhoneBlock.PhoneBlock, cl.iControl.Control);

goog.scope(function() {
    var Block = sv.lSberVmeste.bPhoneBlock.PhoneBlock,
        View = sv.lSberVmeste.bPhoneBlock.View;
        Button = cl.gButton.Button

        Block.prototype.decorateInternal = function(element) {
            goog.base(this, 'decorateInternal', element);

            var domInput = this.getView().getDom().input;
            var domButton = this.getView().getDom().button;
            
            this.input_ = this.decorateChild('InputSber', domInput);
            this.button_= this.decorateChild('ButtonSber', domButton);
            
            
        };
    
    /**
     * @override
     */
    Block.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

       
            goog.events.listen(this.button_, 
                         Button.Event.CLICK,
                         this.onButtonClick_
            )
    };
    
    /**
     * Button click handler
     * @param {Event} event
     * @private
     */
    Block.prototype.onButtonClick_ = function(event) {
        console.log(event.target.element_);
    };
    
});