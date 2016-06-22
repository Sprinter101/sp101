goog.provide('sv.iFactory.TemplateFactory');
goog.provide('sv.iFactory.TemplateFactory.INSTANCE');

goog.require('cl.iFactory.TemplateFactory');
goog.require('sv.gTestPage.Template'); // sandbox item
goog.require('sv.lSberVmeste.bHeader.Template');
goog.require('sv.lSberVmeste.bHeaderManager.Template');
goog.require('sv.lSberVmeste.bNavPage1.Template');
goog.require('sv.lSberVmeste.bPageManager.Template');
goog.require('sv.lSberVmeste.Template');
goog.require('sv.gButton.Template');
goog.require('sv.gInput.Template');



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
        )
        .setTemplateListItem( // sandbox item
            'TestPage',
            sv.gTestPage.Template.page
        )
        .setTemplateListItem(
            'ButtonSber',
            sv.gButton.Template.button
        )
        .setTemplateListItem(
            'InputSber',
            sv.gInput.Template.input
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
