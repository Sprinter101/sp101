goog.provide('sv.lSberVmeste.bNavPage1.NavPage1');

goog.require('cl.iControl.Control');
goog.require('sv.lSberVmeste.iRequest.Request');



/**
 * sv.lSberVmeste.bNavPage1.NavPage1 control
 * @param {sv.lSberVmeste.bNavPage1.View} view View used to render or
 *     decorate the component; defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @extends {cl.iControl.Control}
 */
sv.lSberVmeste.bNavPage1.NavPage1 = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

};
goog.inherits(sv.lSberVmeste.bNavPage1.NavPage1, cl.iControl.Control);


goog.scope(function() {
    var NavPage1 = sv.lSberVmeste.bNavPage1.NavPage1,
        Request = sv.lSberVmeste.iRequest.Request;

    /**
    * @override
    * @param {Element} element
    */
    NavPage1.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);
    };

    /**
    * @override
    */
    NavPage1.prototype.enterDocument = function() {
        goog.base(this, 'enterDocument');

        //this.sendTestRequest_();
    };

    /**
    * @private
    */
    NavPage1.prototype.sendTestRequest_ = function() {
        var that = this,
            ajaxCont = this.getView().getDom().ajaxCont_;

        Request.getInstance().send({
            url: 'test',
            success: function(data, status) {
                ajaxCont.innerText = String(data);
            },
            error: function(data, status, error) {
                console.log('error', data, status, error);
            }
        });
    };
});  // goog.scope
