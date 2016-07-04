goog.provide('sv.lSberVmeste.bListPage.bUserBlock.UserBlock');

goog.require('cl.iControl.Control');
goog.require('sv.gButton.Button');



/**
 * User block control
 * @param {sv.lSberVmeste.bListPage.bUserBlock.View} view View used to render or
 *     decorate the component; defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {cl.iControl.Control}
 */
sv.lSberVmeste.bListPage.bUserBlock.UserBlock = function(
    view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

    /**
    * @type {sv.gButton.Button}
    * @private
    */
    this.button_ = null;
};
goog.inherits(sv.lSberVmeste.bListPage.bUserBlock.UserBlock,
    cl.iControl.Control);

goog.scope(function() {
    var UserBlock = sv.lSberVmeste.bListPage.bUserBlock.UserBlock,
        Button = sv.gButton.Button;

    /**
     * User block events
     * @enum {string}
     */
    UserBlock.Event = {

    };

    /**
     * @override
     * @param {Element} element
     */
    UserBlock.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        //this.createFundButton();
        this.createEditDonationsButton();
    };

    /**
    * @override
    */
    UserBlock.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');
    };


    /**
    * Creates Fund button
    */
    UserBlock.prototype.createFundButton = function() {
        var buttonContainer = this.getView().getDom().buttonContainer;

        var buttonConfig = {
            'data': {
                'content': 'Основать фонд',
            }
        };

        this.button_ = this.renderChild('ButtonSber',
        buttonContainer, buttonConfig);

        this.getHandler().listen(
            this.button_,
            Button.Event.CLICK,
            this.onFundButtonClick_,
            false,
            this
        );
    };

    /**
    * Creates Edit donations button
    */
    UserBlock.prototype.createEditDonationsButton = function() {
        var buttonContainer = this.getView().getDom().buttonContainer;

        var buttonConfig = {
            'data': {
                'content': '350' + 'Р',
            },
            'config': {
                'buttonStyles': ['font_l']
            }
        };

        this.button_ = this.renderChild('ButtonSber',
        buttonContainer, buttonConfig);

        this.getHandler().listen(
            this.button_,
            Button.Event.CLICK,
            this.onEditDonationsButtonClick_,
            false,
            this
        );
    };

    /**
    * Fund button click handler
    * @private
    */
    UserBlock.prototype.onFundButtonClick_ = function() {
        console.log('FUND BUTTON CLICK');
    };

    /**
    * Edit donations button ckick handler
    * @private
    */
    UserBlock.prototype.onEditDonationsButtonClick_ = function() {
        console.log('EDIT DONATIONS BUTTON CLICK');
    };

});  // goog.scope
