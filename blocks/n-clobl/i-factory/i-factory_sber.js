goog.provide('sv.iFactory.FactorySber');

goog.require('cl.iFactory.Factory');
goog.require('cl.gIcon.Icon');
goog.require('cl.gIcon.View');
goog.require('sv.gButton.Button');
goog.require('sv.gButton.View');
goog.require('sv.gInput.Input');
goog.require('sv.gInput.View');
goog.require('sv.gSlider.Slider');
goog.require('sv.gSlider.View');
goog.require('sv.gTab.gListTab.Tab');
goog.require('sv.gTab.gListTab.View');
goog.require('sv.gTestPage.TestPage');
goog.require('sv.gTestPage.View');
goog.require('sv.iFactory.TemplateFactory');
goog.require('sv.lSberVmeste.bCard.Card');
goog.require('sv.lSberVmeste.bCard.View');
goog.require('sv.lSberVmeste.bCardList.CardList');
goog.require('sv.lSberVmeste.bCardList.View');
goog.require('sv.lSberVmeste.bCardPage.CardPage');
goog.require('sv.lSberVmeste.bCardPage.View');
goog.require('sv.lSberVmeste.bDonationFixedBlock.DonationFixedBlock');
goog.require('sv.lSberVmeste.bDonationFixedBlock.View');
goog.require('sv.lSberVmeste.bDonationPercentBlock.DonationPercentBlock');
goog.require('sv.lSberVmeste.bDonationPercentBlock.View');
goog.require('sv.lSberVmeste.bDonatePage.DonatePage');
goog.require('sv.lSberVmeste.bDonatePage.View');
goog.require('sv.lSberVmeste.bHeaderManager.HeaderManager');
goog.require('sv.lSberVmeste.bHeaderManager.View');
goog.require('sv.lSberVmeste.bUserBlock.UserBlock');
goog.require('sv.lSberVmeste.bUserBlock.View');
goog.require('sv.lSberVmeste.bListPage.ListPage');
goog.require('sv.lSberVmeste.bListPage.View');
goog.require('sv.lSberVmeste.bPageManager.PageManager');
goog.require('sv.lSberVmeste.bPageManager.View');
goog.require('sv.lSberVmeste.bRegistrationPage.RegistrationPage');
goog.require('sv.lSberVmeste.bRegistrationPage.View');
goog.require('sv.lSberVmeste.bStartBlock.StartBlock');
goog.require('sv.lSberVmeste.bStartBlock.View');
goog.require('sv.lSberVmeste.bStartPage.StartPage');
goog.require('sv.lSberVmeste.bStartPage.View');
goog.require('sv.lSberVmeste.SberVmeste');
goog.require('sv.lSberVmeste.View');



/**
 * FactoryAdventure
 * @constructor
 * @extends {cl.iFactory.Factory}
 */
sv.iFactory.FactorySber = function() {
    var templateFactory = sv.iFactory.TemplateFactory.getInstance();

    goog.base(this, templateFactory, 'sber');

    this.setControlListItem('SberVmeste', {
            control: sv.lSberVmeste.SberVmeste,
            view: sv.lSberVmeste.View
        })
        .setControlListItem('HeaderManager', {
            control: sv.lSberVmeste.bHeaderManager.HeaderManager,
            view: sv.lSberVmeste.bHeaderManager.View
        })
        .setControlListItem('Header', {
            control: sv.lSberVmeste.bHeader.Header,
            view: sv.lSberVmeste.bHeader.View
        })
        .setControlListItem('PageManager', {
            control: sv.lSberVmeste.bPageManager.PageManager,
            view: sv.lSberVmeste.bPageManager.View
        })
         .setControlListItem('SliderSber', {
            control: sv.gSlider.Slider,
            view: sv.gSlider.View
         })
        .setControlListItem('StartPage', {
            control: sv.lSberVmeste.bStartPage.StartPage,
            view: sv.lSberVmeste.bStartPage.View
        })
        .setControlListItem('StartBlock', {
            control: sv.lSberVmeste.bStartBlock.StartBlock,
            view: sv.lSberVmeste.bStartBlock.View
        })
        .setControlListItem('TestPage', {
            control: sv.gTestPage.TestPage,
            view: sv.gTestPage.View
        })
        .setControlListItem('ButtonSber', {
            control: sv.gButton.Button,
            view: sv.gButton.View
        })
        .setControlListItem('TabSber', {
            control: cl.gTab.Tab,
            view: cl.gTab.View
        })
        .setControlListItem('CardList', {
            control: sv.lSberVmeste.bCardList.CardList,
            view: sv.lSberVmeste.bCardList.View
        })
        .setControlListItem('InputSber', {
            control: sv.gInput.Input,
            view: sv.gInput.View
        })
        .setControlListItem('ListPage', {
            control: sv.lSberVmeste.bListPage.ListPage,
            view: sv.lSberVmeste.bListPage.View
        })
        .setControlListItem('CardPage', {
            control: sv.lSberVmeste.bCardPage.CardPage,
            view: sv.lSberVmeste.bCardPage.View
        })
        .setControlListItem('Card', {
            control: sv.lSberVmeste.bCard.Card,
            view: sv.lSberVmeste.bCard.View
        })
        .setControlListItem('ListTab', {
            control: sv.gTab.gListTab.Tab,
            view: sv.gTab.gListTab.View
        })
         .setControlListItem('IconSber', {
            control: cl.gIcon.Icon,
            view: cl.gIcon.View
        })
        .setControlListItem('ListPageUserBlock', {
            control: sv.lSberVmeste.bUserBlock.UserBlock,
            view: sv.lSberVmeste.bUserBlock.View
        })
         .setControlListItem('DonatePage', {
            control: sv.lSberVmeste.bDonatePage.DonatePage,
            view: sv.lSberVmeste.bDonatePage.View
        })
        .setControlListItem('CardPage', {
            control: sv.lSberVmeste.bCardPage.CardPage,
            view: sv.lSberVmeste.bCardPage.View
        })
        .setControlListItem('Card', {
            control: sv.lSberVmeste.bCard.Card,
            view: sv.lSberVmeste.bCard.View
        })
        .setControlListItem('ListTab', {
            control: sv.gTab.gListTab.Tab,
            view: sv.gTab.gListTab.View
        })
         .setControlListItem('IconSber', {
            control: cl.gIcon.Icon,
            view: cl.gIcon.View
        })
         .setControlListItem('DonatePage', {
            control: sv.lSberVmeste.bDonatePage.DonatePage,
            view: sv.lSberVmeste.bDonatePage.View
        })
        .setControlListItem('DonationFixedBlock', {
            control: sv.lSberVmeste.bDonationFixedBlock.DonationFixedBlock,
            view: sv.lSberVmeste.bDonationFixedBlock.View
        })
        .setControlListItem('DonationPercentBlock', {
            control: sv.lSberVmeste.bDonationPercentBlock.DonationPercentBlock,
            view: sv.lSberVmeste.bDonationPercentBlock.View
        })
        .setControlListItem('RegistrationPage', {
            control: sv.lSberVmeste.bRegistrationPage.RegistrationPage,
            view: sv.lSberVmeste.bRegistrationPage.View
        });

};
goog.inherits(sv.iFactory.FactorySber, cl.iFactory.Factory);
goog.addSingletonGetter(sv.iFactory.FactorySber);


goog.scope(function() {
    var Factory = sv.iFactory.FactorySber;

    /**
     * Important!
     */
    Factory.getInstance().attachToManager();
});  // goog.scope

