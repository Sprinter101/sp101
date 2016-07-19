goog.provide('sv.lSberVmeste.Main');

goog.require('goog.dom');
goog.require('sv.iFactory.FactorySber');
goog.require('sv.lSberVmeste.SberVmeste');
goog.require('sv.lSberVmeste.View');



/**
 * Main app class
 * @constructor
 */
sv.lSberVmeste.Main = function() {};


goog.scope(function() {
    var Main = sv.lSberVmeste.Main,
        SberVmesteView = sv.lSberVmeste.View,
        FactorySber = sv.iFactory.FactorySber;


    /**
     * Run app
     */
    Main.prototype.run = function() {
        var elem = goog.dom.getElementByClass(SberVmesteView.CssClass.ROOT);
        FactorySber.getInstance().decorate('SberVmeste', elem);
        /*if (!window.location.hash) {
            window.location.href = '#start';
        }*/
    };


    var main = new Main();
    main.run();
});  // goog.scope
