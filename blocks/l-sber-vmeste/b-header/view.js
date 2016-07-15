goog.provide('sv.lSberVmeste.bHeader.View');

goog.require('cl.iControl.View');
goog.require('goog.dom');
goog.require('goog.dom.classlist');
goog.require('goog.events.EventType');
goog.require('goog.object');
goog.require('goog.soy');
goog.require('sv.iMedia.Media');
goog.require('sv.iUtils.Utils');



/**
 * sv.lSberVmeste.bHeader.View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sv.lSberVmeste.bHeader.View = function(opt_params, opt_template, opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.lSberVmeste.bHeader.View.CssClass.ROOT);
};
goog.inherits(sv.lSberVmeste.bHeader.View, cl.iControl.View);

goog.scope(function() {
    var View = sv.lSberVmeste.bHeader.View,
        Media = sv.iMedia.Media,
        HIDDEN = sv.iUtils.Utils.CssClass.HIDDEN;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-header',
        ARROW_BACK_CONTAINER: 'b-header__back-wrapper',
        HELP_PHRASE_CONTAINER: 'b-header__right-column',
        BUTTON_CONTAINER: 'b-header__button-wrapper',
        BUTTON: 'g-button_sber',
        CHOICE_PHRASE: 'b-header__choice-phrase'
    };

    /**
     * header types const
     * @const
     */
    View.HEADER_TYPES = [
        'b-header_profile', 'b-header_list',
        'b-header_choice', 'b-header_card'
    ];

    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {

    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        var arrowBackContainer = this.getElementByClass(
            View.CssClass.ARROW_BACK_CONTAINER
        );
        this.dom.arrowBack = goog.dom.getChildren(arrowBackContainer)[0];

        this.dom.buttonContainer = this.getElementByClass(
            View.CssClass.BUTTON_CONTAINER
        );

        this.dom.button = this.getElementByClass(
            View.CssClass.BUTTON
        );

        this.dom.choicePhrase = this.getElementByClass(
            View.CssClass.CHOICE_PHRASE
        );

        this.dom.HelpPhraseContainer = this.getElementByClass(
        View.CssClass.HELP_PHRASE_CONTAINER
        );

        this.checkLayout();
    };

    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

    };

    /**
    * Get current header type
    * @return {string}
    * @protected
    */
    View.prototype.getCurrentHeaderType = function() {
        if (!Array.prototype.find) {
                Array.prototype.find = function(predicate) {
                if (this == null) {
                    throw new TypeError(
                        'Array.prototype.find called on null or undefined'
                    );
                }
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }
                var list = Object(this);
                var length = list.length >>> 0;
                var thisArg = arguments[1];
                var value;

                for (var i = 0; i < length; i++) {
                    value = list[i];
                    if (predicate.call(thisArg, value, i, list)) {
                        return value;
                    }
                }
                return undefined;
            };
        }
        var currentClasses = goog.dom.classlist.get(this.getElement());
        var currentClass = '';
        var header_types = View.HEADER_TYPES;
        var checkClass = function(element, index, array) {
            if (goog.object.contains(currentClasses, element)) {
                return array[index];
            }
        };

        header_types.forEach(function(item, i, header_types) {
           currentClass = View.HEADER_TYPES.find(checkClass);

        });
        currentClass = currentClass.slice(9);
        return currentClass;
    };

     /**
     * check media layout
     * only for donation page
     * @protected
     */
    View.prototype.checkLayout = function() {
        var element = this.getElement();
        if (goog.dom.classlist.contains(element, 'b-header_list')) {
            if ((Media.isExtraSmall()) || (Media.isSmall())) {
                goog.dom.classlist.add(this.dom.buttonContainer, HIDDEN);
                goog.dom.classlist.remove(this.dom.choicePhrase, HIDDEN);
                goog.dom.classlist.add(this.dom.HelpPhraseContainer, HIDDEN);
            }
            else {
                goog.dom.classlist.remove(this.dom.buttonContainer, HIDDEN);
                goog.dom.classlist.add(this.dom.choicePhrase, HIDDEN);
                goog.dom.classlist.remove(this.dom.HelpPhraseContainer, HIDDEN);
            }
         }
    };

    /**
     * return button custom class
     * @return {bool}
     * @protected
     */
    View.prototype.checkButtonCustomClass = function() {
        return goog.dom.classlist.contains(
            this.dom.button, 'b-header__button_me'
        );
    };

});  // goog.scope
