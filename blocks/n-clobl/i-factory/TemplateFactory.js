goog.provide('sv.iFactory.TemplateFactory');
goog.provide('sv.iFactory.TemplateFactory.INSTANCE');

goog.require('cl.iFactory.TemplateFactory');
goog.require('sv.gButton.Template');
goog.require('sv.gIcon.Template');
goog.require('sv.gInput.Template');
goog.require('sv.gTab.Template');
goog.require('sv.gTestPage.Template'); // sandbox item
goog.require('sv.lSberVmeste.bCard.Template');
goog.require('sv.lSberVmeste.bCardList.Template');
goog.require('sv.lSberVmeste.bCardPage.Template');
goog.require('sv.lSberVmeste.bHeader.Template');
goog.require('sv.lSberVmeste.bHeaderManager.Template');
goog.require('sv.lSberVmeste.bListPage.Template');
goog.require('sv.lSberVmeste.bPageManager.Template');
goog.require('sv.lSberVmeste.bStartBlock.Template');
goog.require('sv.lSberVmeste.bStartPage.Template');
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
            'StartPage',
            sv.lSberVmeste.bStartPage.Template.page
        )
        .setTemplateListItem(
            'StartBlock',
            sv.lSberVmeste.bStartBlock.Template.block
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
            'IconSber',
            sv.gIcon.Template.icon
        )
        .setTemplateListItem(
            'TabSber',
            sv.gTab.Template.tab
        )
        .setTemplateListItem(
            'CardList',
            sv.lSberVmeste.bCardList.Template.cardList
        )
        .setTemplateListItem(
            'InputSber',
            sv.gInput.Template.input
        )
        .setTemplateListItem(
            'ListPage',
            sv.lSberVmeste.bListPage.Template.page
        )
        .setTemplateListItem(
            'CardPage',
            sv.lSberVmeste.bCardPage.Template.page
        )
        .setTemplateListItem(
            'ListTab',
            sv.gTab.Template.tab
        )
        .setTemplateListItem(
            'Card',
            sv.lSberVmeste.bCard.Template.main
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
