goog.provide('sv.lSberVmeste.bUserfundPage.UserfundPage');

goog.require('cl.iControl.Control');
goog.require('sv.lSberVmeste.bUserfundPage.View');



/**
 * sv.lSberVmeste.bUserfundPage.UserfundPage control
 * @param {sv.lSberVmeste.bUserfundPage.View} view View used to render or
 *     decorate the component; defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {sv.lSberVmeste.iPage.Page}
 */
sv.lSberVmeste.bUserfundPage.UserfundPage = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

};
goog.inherits(sv.lSberVmeste.bUserfundPage.UserfundPage,
    sv.lSberVmeste.iPage.Page);

goog.scope(function() {
    var UserfundPage = sv.lSberVmeste.bUserfundPage.UserfundPage;

      /**
    * @override
    * @param {Element} element
    */
    UserfundPage.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.headerManager_ = this.params.headerManager_;
        if (this.headerManager_ !== undefined) {
            var that = this;
            that.headerManager_.setChoiceHeader();
        }
    };

});  // goog.scope
