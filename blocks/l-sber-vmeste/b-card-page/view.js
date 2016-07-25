goog.provide('sv.lSberVmeste.bCardPage.View');

goog.require('cl.iControl.Control');
goog.require('goog.dom.classlist');
goog.require('sv.iUtils.Utils');
goog.require('sv.lSberVmeste.bCardPage.Template');



/**
 * sv.lSberVmeste.bCardPage.View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
*/
sv.lSberVmeste.bCardPage.View = function(opt_params,
                                            opt_template,
                                            opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.lSberVmeste.bCardPage.View.CssClass.ROOT);
};
goog.inherits(sv.lSberVmeste.bCardPage.View, cl.iControl.View);

goog.scope(function() {
    var View = sv.lSberVmeste.bCardPage.View;
    var Template = sv.lSberVmeste.bCardPage.Template;
    var Utils = sv.iUtils.Utils;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-card-page',
        ICON_TITLE: 'b-card-page__icon-text',
        TEXT_TITLE: 'b-card-page__text-title',
        DESCRIPTION: 'b-card-page__text',
        DONATIONS: 'b-card-page__donations',
        DIRECTION_COUNT: 'b-card-page__directions-count',
        FULL_PRICE: 'b-card-page__amount',
        BUTTON_CONTAINER: 'b-card-page__card-button',
        CARD_LIST: 'b-card-list',
        STOP_HELPING_LINK: 'b-card-page__stop-helping',
        USERFUND_CARD: 'b-card-page__userfund-cart',
        HIDDEN: sv.iUtils.Utils.CssClass.HIDDEN,
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        var dom = this.dom;
        var CssClass = View.CssClass;

        dom.iconTitle = this.getElementByClass(CssClass.ICON_TITLE, element);
        dom.textTitle = this.getElementByClass(CssClass.TEXT_TITLE, element);
        dom.description = this.getElementByClass(CssClass.DESCRIPTION, element);
        dom.donations = this.getElementByClass(CssClass.DONATIONS, element);
        dom.directionsCount =
            this.getElementByClass(CssClass.DIRECTION_COUNT, element);
        dom.fullPrice = this.getElementByClass(CssClass.FULL_PRICE, element);
        dom.buttonContainer = this.getElementByClass(
            CssClass.BUTTON_CONTAINER, element
        );
        dom.cardList = this.getElementByClass(CssClass.CARD_LIST, element);
        dom.stopHelpingLink = this.getElementByClass(
            CssClass.STOP_HELPING_LINK, element
        );

        dom.userfundCart = this.getElementByClass(
            CssClass.USERFUND_CARD, element
        ).firstChild;
    };

    /**
    * Shows stop helping link
    */
    View.prototype.showStopHelpingLink = function() {
        goog.dom.classlist.remove(
            this.dom.stopHelpingLink, View.CssClass.HIDDEN
        );
    };

    /**
    * Hides stop helping link
    */
    View.prototype.hideStopHelpingLink = function() {
        goog.dom.classlist.add(this.dom.stopHelpingLink, View.CssClass.HIDDEN);
    };

    /**
     * Set icon title
     * @param  {string} title organization name
     */
    View.prototype.setIconTitle = function(title) {
        goog.soy.renderElement(
            this.dom.iconTitle, Template.text, {text: title}
        );
    };

    /**
     * Set title before description
     * @param  {string} title organization name
     */
    View.prototype.setTextTitle = function(title) {
        goog.soy.renderElement(
            this.dom.textTitle,
            Template.text,
            {text: title}
        );
    };

    /**
     * Set organization description
     * @param  {string} description short informaion about organization
     */
    View.prototype.setDescription = function(description) {
        goog.soy.renderElement(
            this.dom.description,
            Template.text,
            {text: description}
        );
    };

    /**
     * Set number of people donations
     * @param  {number} num donations
     */
    View.prototype.setDonations = function(num) {
        var declension = Utils.declensionPrint({
            num: num,
            nom: 'человек',
            gen: 'человека',
            plu: 'людей'
        });

        goog.soy.renderElement(
            this.dom.donations,
            Template.text,
            {text: 'Ежемесячно ' + num + ' ' + declension + ' перечисляет'}
        );
    };

    /**
     * Set number of all gotten money
     * @param  {number} price number of money
     */
    View.prototype.setFullPrice = function(price) {
        var declension = Utils.declensionPrint({
            num: price,
            nom: 'рубль',
            gen: 'рубля',
            plu: 'рублей'
        });

        goog.soy.renderElement(
            this.dom.fullPrice,
            Template.text,
            {text: price + ' ' + declension}
        );
    };

    /**
     * Set number of directions
     * @param  {number} numDirections number of directions
     * @param  {number} numTopics     number of topics
     */
    View.prototype.setDirectionsCount = function(numDirections, numTopics) {
        numDirections = numDirections || 0;
        numTopics = numTopics || 0;

        var declension = Utils.declensionPrint({
            num: numDirections,
            nom: 'направление',
            gen: 'направления',
            plu: 'направлений'
        });
        var topics = Utils.declensionPrint({
            num: numTopics,
            nom: 'тема',
            gen: 'темы',
            plu: 'тем'
        });

        goog.soy.renderElement(
            this.dom.directionsCount,
            Template.text,
            {
                text: numDirections + ' ' + declension + ', ' +
                      numTopics + ' ' + topics
            }
        );
    };

});  // goog.scope
