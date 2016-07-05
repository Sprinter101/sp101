goog.provide('sv.lSberVmeste.bSlider.Slider');

goog.requier('goog.ui.Slider');
goog.requier('goog.ui.Slider.Orientation');

sv.lSberVmeste.bSlider.Slider = function(opt_domHelper) {
    goog.base(this, opt_domHelper);
};

goog.inherits(sv.lSberVmeste.bSlider.Slider,goog.ui.Slider);

goog.scope(function () {
   var Slider = sv.lSberVmeste.bSlider.Slider;

    Slider.prototype.decorateInternal = function (element) {
        goog.base(this,'decorateInternal',element)

    };
});