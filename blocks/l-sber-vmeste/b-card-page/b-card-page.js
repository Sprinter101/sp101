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
    * @type {sv.gButton.Button}
    * @private
    */
    this.startHelpingButton_ = null;

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

        var domStartHelpingButton = this.getView()
                                        .getDom().startHelpingButton,
            domCardList = this.getView().getDom().cardList;

        this.startHelpingButton_ = this.decorateChild(
                                            'ButtonSber',
                                             domStartHelpingButton);
        this.cardList_ = this.decorateChild('CardList', domCardList);
    };

    /**
    * @override
    */
    CardPage.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        goog.events.listen(
            this.startHelpingButton_,
            Button.Event.CLICK,
            this.onButtonClick_
        );
    };

    /**
    * Button click handler
    * @param {Event} event
    * @private
    */
    CardPage.prototype.onButtonClick_ = function(event) {
        console.log(event.target.element_);
    };

});  // goog.scope
