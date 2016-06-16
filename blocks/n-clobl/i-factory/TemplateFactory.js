goog.provide('sv.iFactory.TemplateFactory');
goog.provide('sv.iFactory.TemplateFactory.INSTANCE');

goog.require('cl.iFactory.TemplateFactory');
goog.require('sv.gButtonsTest.Template'); // sandbox item
goog.require('sv.lSberVmeste.bHeader.Template');
goog.require('sv.lSberVmeste.bHeaderManager.Template');
goog.require('sv.lSberVmeste.bNavPage1.Template');
goog.require('sv.lSberVmeste.bPageManager.Template');
goog.require('sv.lSberVmeste.Template');



/**
 * Template factory
 * @constructor
 */
sv.iFactory.TemplateFactory = function() {
    goog.base(this, 'sber');

    this
        .setTemplateListItem(
            'SberVmeste',
            sv.lSberVmeste.Template.sberVmeste
        )
        .setTemplateListItem(
            'HeaderManager',
            sv.lSberVmeste.bHeaderManager.Template.headerManager
        )
        .setTemplateListItem(
            'Header',
            sv.lSberVmeste.bHeader.Template.header
        )
        .setTemplateListItem(
            'PageManager',
            sv.lSberVmeste.bPageManager.Template.pageManager
        )
        .setTemplateListItem(
            'NavPage1',
            sv.lSberVmeste.bNavPage1.Template.page
        ).setTemplateListItem( // sandbox item
            'ButtonsTest',
            sv.gButtonsTest.Template.page
        );
};
goog.inherits(sv.iFactory.TemplateFactory, cl.iFactory.TemplateFactory);
goog.addSingletonGetter(sv.iFactory.TemplateFactory);

goog.scope(function() {
    var TemplateFactory = sv.iFactory.TemplateFactory;

    /**
     * Instance
     */
    TemplateFactory.INSTANCE = TemplateFactory.getInstance();

    /**
     * Important!
     */
    TemplateFactory.getInstance().attachToManager();
});  // goog.scope
