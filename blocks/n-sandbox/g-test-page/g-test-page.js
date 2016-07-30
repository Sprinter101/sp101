goog.provide('sv.gTestPage.TestPage');

goog.require('cl.iControl.Control');



/**
 * sv.gTestPage.TestPage control
 * @param {sv.bTestPage.View} view
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {cl.iControl.Control}
 */
sv.gTestPage.TestPage = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

    /**
    * @type {Array}
    * @private
    */
    this.inputs_ = [];

};
goog.inherits(sv.gTestPage.TestPage, cl.iControl.Control);


goog.scope(function() {
    var TestPage = sv.gTestPage.TestPage;

    /**
    * @override
    * @param {Element} element
    */
    TestPage.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.headerManager_ = this.params.headerManager_;
        if (this.headerManager_ !== undefined) {
            var that = this;
            that.headerManager_.setChoiceHeader();
        }

        var domInputs = this.getView().getDom().inputs;

        this.inputs_.push(this.decorateChild('InputSber', domInputs[0]));
        this.inputs_.push(this.decorateChild('InputSber', domInputs[1]));
        this.inputs_.push(this.decorateChild('InputSber', domInputs[2]));
        this.inputs_.push(this.decorateChild('InputSber', domInputs[3]));
        this.inputs_.push(this.decorateChild('InputSber', domInputs[4]));

    };

});  // goog.scope
