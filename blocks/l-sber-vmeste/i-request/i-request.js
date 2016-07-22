goog.provide('sv.lSberVmeste.iRequest.Request');

goog.require('goog.Promise');
goog.require('sv.lSberVmeste.iIframe.Iframe');
goog.require('sv.lSberVmeste.iRequestStorage.RequestStorage');



/**
 * Ajax requests helper
 * @constructor
 */
sv.lSberVmeste.iRequest.Request = function() {
    this.baseUrl_ = null;
};
goog.addSingletonGetter(sv.lSberVmeste.iRequest.Request);


goog.scope(function() {
    var Request = sv.lSberVmeste.iRequest.Request,
        Promise = goog.Promise;

        RequestStorage = sv.lSberVmeste.iRequestStorage.RequestStorage,
        Iframe = sv.lSberVmeste.iIframe.Iframe;

    /**
     * Request methods
     * @enum {string}
     */
    Request.Method = {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE'
    };

    /**
     * Initial settings (optional)
     * @param {{
     *     baseUrl: ?string
     * }=} opt_params
     */
    Request.prototype.init = function(opt_params) {
        var params = opt_params || {};
        this.iframe_ = Iframe.getInstance();
        this.iframe_.init();
        this.reqStorage_ = RequestStorage.getInstance();

        window.addEventListener(
            'message', this.messageHandler_.bind(this), false
        );
        this.baseUrl_ = this.makeBaseUrl_(params.baseUrl);
    };

    /**
     * Handle message event from iFrame
     * @param  {MessageEvent} event
     * @private
     */
    Request.prototype.messageHandler_ = function(event) {
        this.reqStorage_.exec(event.data);
    };

    /**
     * Send ajax request
     *
     * If parameter {@code baseUrl} was set, then {@code url}
     * relative to {@code baseUrl}.
     *
     * Default value of parameter {@code method} is GET
     *
     * @param {{
     *     url: string,
     *     method: ?string,
     *     success: ?function,
     *     error: ?function,
     *     isJSON: boolean
     *     data: object
     * }=} opt_params
     * @return {goog.Promise}
     */
    Request.prototype.send = function(opt_params) {
        var params = opt_params || {};
        var url = this.makeUrl_(params.url);
        var method = params.method || Request.Method.GET;
        var data = params.data;

        return new Promise(function(resolve, reject) {
            var reqId = 'req_' + Date.now() + Math.random();

            this.reqStorage_.set(reqId, resolve, reject);
            this.iframe_.send({
                reqId: reqId,
                url: url,
                method: method,
                data: data || {}
            });
        }, this);
    };

    /**
     * Make base url from given url
     * @param {string=} opt_url
     * @return {string}
     * @private
     */
    Request.prototype.makeBaseUrl_ = function(opt_url) {
        var url = opt_url || '';
        return url.replace(/\/+$/, '');
    };

    /**
     * Make ajax url from given url (baseUrl + url)
     * @param {string=} opt_url
     * @return {string}
     * @private
     */
    Request.prototype.makeUrl_ = function(opt_url) {
        var url = opt_url || '';

        if (this.baseUrl_) {
            url = this.baseUrl_ + '/' + url.replace(/^\/+/, '');
        }

        return url;
    };

});  // goog.scope
