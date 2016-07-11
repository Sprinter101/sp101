goog.provide('sv.gInput.View');

goog.require('cl.gInput.View');
goog.require('sv.iUtils.Utils');



/**
 * Input View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.gInput.View}
 */
sv.gInput.View = function(opt_params, opt_template, opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.gInput.View.CssClass.ROOT);

    /**
     * Error messages for validations
     * @type {Object}
     */
    this.validationErrorMessages = {
        'digits': 'Допустимо использовать только цифры',
        'email': 'Введён некорректный адрес электронной почты',
        'notEmpty': 'Это поле не может быть пустым',
        'maxDonation': 'Мы не можем принять от вас сразу больше, ' +
                       'чем 500 тыс. рублей',
        'name': 'Не корректно введено имя',
        'phoneNumber': 'Не корректно введён номер телефона'
    };
};
goog.inherits(sv.gInput.View, cl.gInput.View);


goog.scope(function() {
    var View = sv.gInput.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'g-input',
        INPUT: 'g-input__input',
        NOT_VALID: 'g-input_not-valid',
        INPUT_NOT_VALID: 'g-input__input_not-valid',
        ERROR_MESSAGE_BOX: 'g-input__error-message-box',
        LABEL: 'g-input__label',
        HIDDEN: sv.iUtils.Utils.CssClass.HIDDEN
    };

    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
        BLUR: 'blur',
        INPUT: 'input-input',
        CHANGE: 'input-change',
        FOCUS: 'input-focus'
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dom.input = this.getElementByClass(View.CssClass.INPUT, element);
        this.dom.errorMessage = this.getElementByClass(
                                    View.CssClass.ERROR_MESSAGE_BOX, element);
        this.dom.label = this.getElementByClass(View.CssClass.LABEL, element);

        this.getDataParams(element);
    };

    /**
     * @override
     */
    View.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        this.getHandler()
            .listen(
                this.dom.input,
                goog.events.EventType.BLUR,
                this.onBlur
            ).listen(
                this.dom.input,
                goog.events.EventType.INPUT,
                this.onInput
            )
            .listen(
                this.dom.input,
                goog.events.EventType.CHANGE,
                this.onChange
            )
            .listen(
                this.dom.input,
                goog.events.EventType.FOCUS,
                this.onFocus
            );
    };

    /**
     * Set valid state
     * @public
     */
    View.prototype.unSetNotValidState = function() {
        goog.dom.classlist.remove(
            this.getElement(),
            View.CssClass.NOT_VALID
        );

        goog.dom.classlist.remove(
            this.dom.input,
            View.CssClass.INPUT_NOT_VALID
        );
    };

    /**
     * Set not valid state
     * @public
     */
    View.prototype.setNotValidState = function() {
        goog.dom.classlist.add(
            this.getElement(),
            View.CssClass.NOT_VALID
        );

        goog.dom.classlist.add(
            this.dom.input,
            View.CssClass.INPUT_NOT_VALID
        );
    };

    /**
    * Shows error message
    * @param {Array} failedValidations
    */
    View.prototype.showErrorMessage = function(failedValidations) {
        var errorMessageText = '';

        failedValidations.forEach(function(type) {
            var errorMessage = this.validationErrorMessages[type];
            errorMessageText += errorMessage + ' ';
        }, this);

        this.dom.errorMessage.textContent = errorMessageText.trim();
    };

    /**
    * Hides error message
    */
    View.prototype.hideErrorMessage = function() {
        this.dom.errorMessage.textContent = '';
    };

    /**
     * Focus handler
     * @protected
     */
    View.prototype.onFocus = function() {
        this.dom.input.select();

        if (this.params.label) {
            this.dom.input.setAttribute('placeholder', '');
            this.showLabel();
        }

        this.dispatchEvent(View.Event.FOCUS);
    };

    /**
     * Blur handler
     * @protected
     */
    View.prototype.onBlur = function() {
        if (this.params.label) {
            this.dom.input.setAttribute('placeholder', this.params.placeholder);
            this.hideLabel();
        }

        this.dispatchEvent(View.Event.BLUR);
    };

    View.prototype.showLabel = function() {
        goog.dom.classlist.add(
            this.dom.label, View.CssClass.LABEL + '_visible'
        );
    };

    View.prototype.hideLabel = function() {
        goog.dom.classlist.remove(
            this.dom.label, View.CssClass.LABEL + '_visible'
        );
    };

});  // goog.scope
