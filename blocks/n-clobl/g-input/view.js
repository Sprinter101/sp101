goog.provide('sv.gInput.View');

goog.require('cl.gInput.View');
goog.require('goog.events.KeyCodes');
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
    * @type {string}
    * @private
    */
    this.label_ = null;

    /**
    * @type {string}
    * @private
    */
    this.placeholder_ = null;


    /**
    * @type {boolean}
    * @private
    */
    this.showErrorsOnFocus_ = !!this.params.showErrorsOnFocus;
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
        INPUT_FILLED: 'g-input__input_filled',
        NOT_VALID: 'g-input_not-valid',
        INPUT_NOT_VALID: 'g-input__input_not-valid',
        INPUT_DISABLED: 'g-input__input_disabled',
        ERROR_MESSAGE_BOX: 'g-input__error-message-box',
        LABEL: 'g-input__label',
        LABEL_VISIBLE: 'g-input__label_visible',
        LABEL_FILLED: 'g-input__label_filled',
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
        FOCUS: 'input-focus',
        ENTER_KEY_PRESS: 'input-enter-key-press'
    };

    /**
     * Error messages for validations
     * @enum {string}
     */
    View.ValidationErrorMessages = {
        'digits': 'Допустимо использовать только цифры',
        'email': 'Введён некорректный адрес электронной почты',
        'notEmpty': 'Это поле не может быть пустым',
        'maxDonation': 'Мы не можем принять от вас сразу больше, ' +
                       'чем 500 тыс. рублей',
        'minInput': 'Минимальная сумма ввода — 1000 рублей',
        'minDonation': 'Минимальная сумма пожертвования — 100 рублей',
        'name': 'Не корректно введено имя',
        'phoneNumber': 'Не корректно введён номер телефона',
        'confirmCode': 'Не корректно введен код из СМС'
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dom.input = this.getElementByClass(
            View.CssClass.INPUT, element);
        this.dom.errorMessage = this.getElementByClass(
            View.CssClass.ERROR_MESSAGE_BOX, element);
        this.dom.label = this.getElementByClass(
            View.CssClass.LABEL, element);

        this.label_ = this.dom.label && this.dom.label.innerText.trim();
        this.placeholder_ = this.dom.input.getAttribute('placeholder');


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
            )
            .listen(
                this.dom.input,
                goog.events.EventType.KEYDOWN,
                this.onEnterKeyPress
            );
    };

    /**
    * Disables input
    */
    View.prototype.disable = function() {
        this.dom.input.setAttribute('disabled', 'disabled');

        goog.dom.classlist.add(
            this.dom.input,
            View.CssClass.INPUT_DISABLED
        );
    };

    /**
    * Enables input
    */
    View.prototype.enable = function() {
        this.dom.input.setAttribute('disabled', '');

        goog.dom.classlist.remove(
            this.dom.input,
            View.CssClass.INPUT_DISABLED
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
            var errorMessage = View.ValidationErrorMessages[type];
            errorMessageText += errorMessageText ? '. ' : ' ';
            errorMessageText += errorMessage;
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
        this.dom.input.setAttribute('placeholder', '');

        if (!this.showErrorsOnFocus_) {
            this.unSetNotValidState();
            this.hideErrorMessage();
        }

        if (this.label_) {
            this.showLabel();
        }
        this.unSetNotValidState();
        this.hideErrorMessage();
        this.dispatchEvent(View.Event.FOCUS);
    };

    /**
     * Blur handler
     * @protected
     */
    View.prototype.onBlur = function() {
        this.dom.input.setAttribute(
                'placeholder', this.placeholder_
            );
        if (this.label_) {
            if (this.dom.input.value == '') {
                this.hideLabel();
                this.unsetFilled();
            } else {
                this.setFilled();
            }
        }

        this.dispatchEvent(View.Event.BLUR);
    };

    /**
    * Enter key press event handler
    * @param {Object} event
    */
    View.prototype.onEnterKeyPress = function(event) {
        var keyCode = event.keyCode;
        if (keyCode == goog.events.KeyCodes.ENTER) {
            this.dispatchEvent(View.Event.ENTER_KEY_PRESS);
        }
    };

    /**
     * Set input as filled
     */
    View.prototype.setFilled = function() {
        goog.dom.classlist.add(this.dom.label, View.CssClass.LABEL_FILLED);
        goog.dom.classlist.add(this.dom.input, View.CssClass.INPUT_FILLED);
    };

    /**
     * Set input as filled
     */
    View.prototype.unsetFilled = function() {
        goog.dom.classlist.remove(this.dom.label, View.CssClass.LABEL_FILLED);
        goog.dom.classlist.remove(this.dom.input, View.CssClass.INPUT_FILLED);
    };

    /**
     * Show label
     */
    View.prototype.showLabel = function() {
        goog.dom.classlist.add(this.dom.label, View.CssClass.LABEL_VISIBLE);
    };

    /**
     * Hide label
     */
    View.prototype.hideLabel = function() {
        goog.dom.classlist.remove(this.dom.label, View.CssClass.LABEL_VISIBLE);
    };

    /**
     * @override
     * @param {string} value
     */
    View.prototype.setValue = function(value) {
        if (value && this.dom.label) {
            this.showLabel();
            this.setFilled();
        }

        this.dom.input.value = value;
    };

});  // goog.scope
