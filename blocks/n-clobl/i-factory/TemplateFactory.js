goog.provide('sv.iFactory.TemplateFactory');
goog.provide('sv.iFactory.TemplateFactory.INSTANCE');

goog.require('cl.iFactory.TemplateFactory');
goog.require('sv.gButton.Template');
goog.require('sv.gIcon.Template');
goog.require('sv.gInput.Template');
goog.require('sv.gSlider.Template');
goog.require('sv.gTab.Template');
goog.require('sv.gTestPage.Template'); // sandbox item
goog.require('sv.lSberVmeste.Template');
goog.require('sv.lSberVmeste.bCard.Template');
goog.require('sv.lSberVmeste.bCardList.Template');
goog.require('sv.lSberVmeste.bCardPage.Template');
goog.require('sv.lSberVmeste.bDonatePage.Template');
goog.require('sv.lSberVmeste.bDonationFixedBlock.Template');
goog.require('sv.lSberVmeste.bDonationPercentBlock.Template');
goog.require('sv.lSberVmeste.bHeader.Template');
goog.require('sv.lSberVmeste.bHeaderManager.Template');
goog.require('sv.lSberVmeste.bListPage.Template');
goog.require('sv.lSberVmeste.bPaymentPage.Template');
goog.require('sv.lSberVmeste.bPageManager.Template');
goog.require('sv.lSberVmeste.bPaymentPage.Template');
goog.require('sv.lSberVmeste.bPhoneBlock.Template');
goog.require('sv.lSberVmeste.bProfile.Template');
goog.require('sv.lSberVmeste.bProfileEdit.Template');
goog.require('sv.lSberVmeste.bProfilePage.Template');
goog.require('sv.lSberVmeste.bRegistrationPage.Template');
goog.require('sv.lSberVmeste.bStartBlock.Template');
goog.require('sv.lSberVmeste.bStartPage.Template');
goog.require('sv.lSberVmeste.bUserBlock.Template');
goog.require('sv.lSberVmeste.bUserfundPage.Template');



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
            'PhoneBlock',
            sv.lSberVmeste.bPhoneBlock.Template.phoneBlock
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
            'SliderSber',
            sv.gSlider.Template.slider
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
            'Card',
            sv.lSberVmeste.bCard.Template.main
        )
        .setTemplateListItem(
            'ListTab',
            sv.gTab.Template.tab
        )
        .setTemplateListItem(
            'ListPageUserBlock',
            sv.lSberVmeste.bUserBlock.Template.userBlock
        )
        .setTemplateListItem(
            'DonatePage',
            sv.lSberVmeste.bDonatePage.Template.page
        )
        .setTemplateListItem(
            'DonationFixedBlock',
            sv.lSberVmeste.bDonationFixedBlock.Template.block
        )
        .setTemplateListItem(
            'DonationPercentBlock',
            sv.lSberVmeste.bDonationPercentBlock.Template.block
        )
        .setTemplateListItem(
            'RegistrationPage',
            sv.lSberVmeste.bRegistrationPage.Template.page
        )
        .setTemplateListItem(
            'Profile',
            sv.lSberVmeste.bProfile.Template.profile
        )
        .setTemplateListItem(
            'ProfileEdit',
            sv.lSberVmeste.bProfileEdit.Template.profileEdit
        )
        .setTemplateListItem(
            'ProfilePage',
            sv.lSberVmeste.bProfilePage.Template.profilePage
        )
        .setTemplateListItem(
            'RegistrationPage',
            sv.lSberVmeste.bRegistrationPage.Template.registrationPage
        )
        .setTemplateListItem(
            'PaymentPage',
            sv.lSberVmeste.bPaymentPage.Template.page
        )
        .setTemplateListItem(
            'UserfundPage',
            sv.lSberVmeste.bUserfundPage.Template.page
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
