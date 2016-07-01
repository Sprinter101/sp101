goog.provide('sv.lSberVmeste.bCardPage.CardPage');

goog.require('cl.iControl.Control');
goog.require('sv.gButton.Button');



/**
 * @param {sv.lSberVmeste.bCardPage.View} view View used to render or
 *     decorate the component; defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {cl.iControl.Control}
 */
sv.lSberVmeste.bCardPage.CardPage = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

    /**
    * @type {Boolean}
    * @private
    */
    this.isUserHelping_ = true;

    /**
    * @type {sv.gButton.Button}
    * @private
    */
    this.cardButton_ = null;

    /**
    * @type {sv.lSberVmeste.bCardList.CardList}
    * @private
    */
    this.cardList_ = null;

};
goog.inherits(sv.lSberVmeste.bCardPage.CardPage, cl.iControl.Control);

goog.scope(function() {
    var CardPage = sv.lSberVmeste.bCardPage.CardPage,
        Button = cl.gButton.Button;

    /**
    * @override
    * @param {Element} element
    */
    CardPage.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        var domCardList = this.getView().getDom().cardList;

        if (this.isUserHelping_) {
            this.setHelpingButton_();
            this.getView().showStopHelpingLink();
        } else {
            this.setStartHelpingButton_();
        }

        this.cardList_ = this.decorateChild('CardList', domCardList);
    };

    /**
    * @override
    */
    CardPage.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        goog.events.listen(
            this.getView().getDom().stopHelpingLink,
            goog.events.EventType.CLICK,
            this.onStopHelpingLinkClick_,
            null,
            this
        );
    };

    /**
    * Start helping button click handler
    * @private
    */
    CardPage.prototype.onStartHelpingButtonClick_ = function() {
        this.setThanksButton_();

        this.getView().showStopHelpingLink();
    };

    /**
    * Stop helping link clikc handler
    * @private
    */
    CardPage.prototype.onStopHelpingLinkClick_ = function() {
        this.setStartHelpingButton_();

        this.getView().hideStopHelpingLink();
    };

    /**
    * renders Start helping buttons
    * @private
    */
    CardPage.prototype.setStartHelpingButton_ = function() {
        this.disposeButton_();

        var buttonConfig = {
            'data': {
                'content': 'Помогать',
            },
            'config': {
                'buttonStyles': [
                    'background_transparent',
                    'border_green',
                    'border_thick'
                ]
            }
        };

        this.renderButton_(buttonConfig);

        goog.events.listen(
            this.cardButton_,
            Button.Event.CLICK,
            this.onStartHelpingButtonClick_,
            null,
            this
        );
    };

    /**
    * renders helping button
    * @private
    */
    CardPage.prototype.setHelpingButton_ = function() {
        this.disposeButton_();

        var buttonConfig = {
            'data': {
                'content': 'Помогаете 4 месяцa',
            },
            'config': {
                'buttonStyles': [
                    'background_green',
                    'border_green',
                    'border_thick',
                    'font-size_smaller',
                    'width_l'
                ]
            }
        };

        this.renderButton_(buttonConfig);
    };

    /**
    * renders Thanks button
    * @private
    */
    CardPage.prototype.setThanksButton_ = function() {
        this.disposeButton_();

        var buttonConfig = {
            'data': {
                'content': 'Спасибо!',
            },
            'config': {
                'buttonStyles': [
                    'background_green',
                    'border_green',
                    'border_thick'
                ]
            }
        };

        this.renderButton_(buttonConfig);
    };

    /**
    * renders Start helping buttons
    * @param {{
    *   data {{
    *       content {string}
    *   }},
    *   config {{
    *       buttonStyles {Array}
    *   }}
    * }} buttonConfig
    * @private
    */
    CardPage.prototype.renderButton_ = function(buttonConfig) {
        var domButtonContainer = this.getView().getDom().buttonContainer;

        this.cardButton_ = this.renderChild('ButtonSber',
                                             domButtonContainer,
                                             buttonConfig);
    };

    /**
    * renders Start helping buttons
    * @private
    */
    CardPage.prototype.disposeButton_ = function() {
        if (this.cardButton_) {
            this.cardButton_.dispose();
            this.cardButton_ = null;
        }
    };

});  // goog.scope
