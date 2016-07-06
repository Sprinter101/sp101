goog.provide('sv.lSberVmeste.bProfile.View');

goog.require('cl.iControl.View');



/**
 * Profile block View
 * @param {Object=} opt_params
 * @param {Function=} opt_template
 * @param {string=} opt_modifier
 * @constructor
 * @extends {cl.iControl.View}
 */
sv.lSberVmeste.bProfile.View = function(opt_params, opt_template,
    opt_modifier) {
    goog.base(this, opt_params, opt_template, opt_modifier);

    this.setCssClass(sv.lSberVmeste.bProfile.View.CssClass.ROOT);
};
goog.inherits(sv.lSberVmeste.bProfile.View, cl.iControl.View);


goog.scope(function() {
    var View = sv.lSberVmeste.bProfile.View;

    /**
     * Css class enum
     * @enum {string}
     */
    View.CssClass = {
        ROOT: 'b-profile',
        PHOTO_BLOCK_TEXT: 'b-profile__photo-block-text',
        NAME_BLOCK: 'b-profile__user-name',
        PHONE_BLOCK: 'b-profile__user-phone',
        EDIT_BUTTON_BLOCK: 'b-profile__edit-button'
    };

    /**
     * @override
     * @param {Element} element
     */
    View.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.dom = {
            photoBlockText: this.getElementByClass(View.CssClass.
                PHOTO_BLOCK_TEXT,
                this.getElement()
            ),
            nameBlock: this.getElementByClass(View.CssClass.
                NAME_BLOCK,
                this.getElement()
            ),
            phoneBlock: this.getElementByClass(View.CssClass.
                PHONE_BLOCK,
                this.getElement()
            ),
            editButton: this.getElementByClass(View.CssClass.
                EDIT_BUTTON_BLOCK,
                this.getElement()
            ).firstChild,
        };
    };

    /**
    * @override
    */
    View.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');
    };

    /**
    * Profile text setter
    * @param {string} firstName
    */
    View.prototype.setProfileText = function(firstName) {
        var domNameBlock = this.dom.photoBlockText;

        goog.soy.renderElement(
            domNameBlock,
            sv.lSberVmeste.bProfile.Template.setProfileText,
            {name: firstName}
        );
    };

    /**
    * Name block text setter
    * @param {string} firstName
    * @param {string} lastName
    */
    View.prototype.setName = function(firstName, lastName) {
        var domNameBlock = this.dom.nameBlock;

        domNameBlock.innerText = firstName + ' ' + lastName;
    };

    /**
    * Phone number block text setter
    * @param {string} phoneNumber
    */
    View.prototype.setPhoneNumber = function(phoneNumber) {
        var domPhoneBlock = this.dom.phoneBlock,

        phoneNumber = phoneNumber
            .replace(/(\+\d|8)(\d{3})(\d{3})(\d{2})/, '$1 $2 $3-$4-');

        domPhoneBlock.innerText = phoneNumber;
    };

});  // goog.scope
