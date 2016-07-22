goog.provide('sv.lSberVmeste.iIframe.Iframe');



/**
 * Ajax requests helper
 * @constructor
 */
sv.lSberVmeste.iIframe.Iframe = function() {
    this.iframeNode_ = null;
};
goog.addSingletonGetter(sv.lSberVmeste.iIframe.Iframe);


goog.scope(function() {
    var Iframe = sv.lSberVmeste.iIframe.Iframe;

    /**
     * Css class enum
     * @enum {string}
    */
    Iframe.CssClass = {
        ROOT: 'frame-request'
    };

    /**
     * Search iframe by css selector
     */
    Iframe.prototype.init = function() {
        this.iframeNode_ = document.querySelector('.' + Iframe.CssClass.ROOT);
    };

    /**
     * Return iframe element or null if not found
     * @return {?HTMLIFrameElement} iframe node or null
     */
    Iframe.prototype.getNode = function() {
        return this.iframeNode_;
    };

    /**
     * Send data to iframe or throws an exception if iframe is null
     * @param {object} params data that must be sent to the iframe
     */
    Iframe.prototype.send = function(params) {
        if (this.iframeNode_) {
            this.iframeNode_.contentWindow.postMessage(params, '*');
        } else {
            throw Error({message: 'this.iframeNode_ is null'});
        }
    };

});  // goog.scope
