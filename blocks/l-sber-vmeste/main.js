goog.provide('sv.lSberVmeste.Main');

goog.require('sv.iFactory.FactorySber');
goog.require('sv.lSberVmeste.SberVmeste');
goog.require('sv.lSberVmeste.View');
goog.require('goog.dom');



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
        window.location.href = '#navLink1';
    };


    var main = new Main();
    main.run();
});  // goog.scope