goog.provide('sv.gButton.View');

goog.require('cl.gButton.View');



/**
 * Button View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.gButton.View}
 */
sv.gButton.View = function(opt_params, opt_template, opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.gButton.View.CssClass.ROOT);
};
goog.inherits(sv.gButton.View, cl.gButton.View);


goog.scope(function() {
    var View = sv.gButton.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'g-button',
        DISABLED: 'g-button_disabled'
    };

    /**
     * Event enum
     * @enum {string}
     */
    View.Event = {
        CLICK: 'button-click',
        TOUCH_START: 'button-touch-start',
        TOUCH_END: 'button-touch-end'
    };

    /**
    * @override
    * @param {Element} element
    */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.parseDataParams(element);
    };

    /**
    * Setter for value
    * @param {string} value
    * @override
    */
    View.prototype.setValue = function(value) {
        this.element_.innerText = value;
    };

    /**
     * Get data params
     * @param {Element} element
     */
    View.prototype.parseDataParams = function(element) {
        var params = JSON.parse(goog.dom.dataset.get(element, 'params'));

        for (var paramName in params) {
            this.params[paramName] = params[paramName];
        }
    };


    /**
     * disable
     * @override
     */
    View.prototype.disable = function() {
        if (!this.params.config.isDisabled) {

            var stylesForDisabled = this.params.stylesForDisabled;

            for (var i = 0; i < stylesForDisabled.length; i++) {

                var style = stylesForDisabled[i];

                goog.dom.classlist.add(
                    this.getElement(),
                    View.CssClass.ROOT + '_' + style
                );
            }

            goog.dom.classlist.add(
                this.getElement(),
                View.CssClass.DISABLED
            );

            this.getHandler().unlisten(
                this.getElement(),
                goog.events.EventType.CLICK,
                this.onClick
            );
            this.params.config.isDisabled = true;
        }
    };

    /**
     * enable
     * @override
     */
    View.prototype.enable = function() {
        if (this.params.config.isDisabled) {

            var stylesForDisabled = this.params.stylesForDisabled;

            for (var i = 0; i < stylesForDisabled.length; i++) {

                var style = stylesForDisabled[i];

                goog.dom.classlist.remove(
                    this.getElement(),
                    View.CssClass.ROOT + '_' + style
                );
            }

            goog.dom.classlist.remove(
                this.getElement(),
                View.CssClass.DISABLED
            );
            this.getHandler().listen(
                this.getElement(),
                goog.events.EventType.CLICK,
                this.onClick
            );
            this.params.config.isDisabled = false;
        }
    };

});  // goog.scope
