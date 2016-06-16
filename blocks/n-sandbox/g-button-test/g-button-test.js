goog.provide('sv.gButtonsTest.ButtonsTest');

goog.require('cl.gButton.Button');
goog.require('cl.iControl.Control');



/**
 * sv.gButtonsTest.ButtonsTest control
 * @param {sv.bButtonsTest.View} view View used to render or
 *     decorate the component; defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {cl.iControl.Control}
 */
sv.gButtonsTest.ButtonsTest = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

    /**
    * @type {Array}
    * @private
    */
    this.buttons_ = [];
};
goog.inherits(sv.gButtonsTest.ButtonsTest, cl.iControl.Control);


goog.scope(function() {
    var ButtonsTest = sv.gButtonsTest.ButtonsTest,
        Button = cl.gButton.Button;

    /**
    * @override
    * @param {Element} element
    */
    ButtonsTest.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        var domButtons = this.getView().getDom().buttons;

        for (var i = 0; i < domButtons.length; i++) {
            this.buttons_.push(this.decorateChild('button', domButtons[i]));
        }
    };

    /**
    * @override
    */
    ButtonsTest.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        for (var i = 0; i < this.buttons_.length; i++) {
            goog.events.listen(
                this.buttons_[i],
                Button.Event.CLICK,
                this.onButtonClick_
            );
        }
    };

    /**
    * Button click handler
    * @param {Event} event
    * @private
    */
    ButtonsTest.prototype.onButtonClick_ = function(event) {
        console.log(event.target.element_);
    };

});  // goog.scope
