goog.provide('sv.gTestPage.TestPage');

goog.require('cl.iControl.Control');
goog.require('sv.gButton.Button');



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

    /**
    * @type {Array}
    * @private
    */
    this.tabs_ = [];

    /**
    * @type {Array}
    * @private
    */
    this.inputs_ = [];

    this.slider_ = null;

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

        var domButtons = this.getView().getDom().buttons,
            domTabs = this.getView().getDom().tabs,
            domInputs = this.getView().getDom().inputs,
            domSlider = this.getView().getDom().slider;

        for (var i = 0; i < domButtons.length; i++) {
            this.buttons_.push(this.decorateChild('ButtonSber', domButtons[i]));
        }

        for (var i = 0; i < domTabs.length; i++) {
            this.tabs_.push(this.decorateChild('TabSber', domTabs[i]));
        }

        for (var i = 0; i < domInputs.length; i++) {
            this.inputs_.push(this.decorateChild('InputSber',
                domInputs[i],
                {
                    MAX_NUMBER: 500000,
                    MAX_CHARACTERS: 6
                }
            ));
        }        
            this.slider_ = this.decorateChild('SliderSber', domSlider);

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
