goog.provide('sv.gTestPage.TestPage');

goog.require('cl.gButton.Button');
goog.require('cl.gList.List');
goog.require('cl.iControl.Control');



/**
 * sv.gTestPage.TestPage control
 * @param {sv.bTestPage.View} view View used to render or
 *     decorate the component; defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {cl.iControl.Control}
 */
sv.gTestPage.TestPage = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

    /**
    * @type {Array}
    * @private
    */
    this.buttons_ = [];
};
goog.inherits(sv.gTestPage.TestPage, cl.iControl.Control);


goog.scope(function() {
    var TestPage = sv.gTestPage.TestPage,
        Button = cl.gButton.Button;

    /**
    * @override
    * @param {Element} element
    */
    TestPage.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        var domButtons = this.getView().getDom().buttons;

        for (var i = 0; i < domButtons.length; i++) {
            this.buttons_.push(this.decorateChild('button', domButtons[i]));
        }
    };

    /**
    * @override
    */
    TestPage.prototype.enterDocument = function() {
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
    TestPage.prototype.onButtonClick_ = function(event) {
        console.log(event.target.element_);
    };

});  // goog.scope
