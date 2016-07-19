goog.provide('sv.lSberVmeste.iRequest.Request');

goog.require('goog.Promise');
goog.require('goog.Uri.QueryData');
goog.require('goog.net.XhrIo');
goog.require('goog.structs.Map');
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
        // QueryData = goog.Uri.QueryData,
        // XhrIo = goog.net.XhrIo,
        // Map = goog.structs.Map,

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
        this.reqStorage_ = RequestStorage.getInstance();

        this.iframe_.init();
        this.baseUrl_ = this.makeBaseUrl_(params.baseUrl);
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
    Request.prototype.send = function(opt_params, opt_context) {
        console.log('send', opt_params);
        var params = opt_params || {};
        var url = this.makeUrl_(params.url);
        var method = params.method || Request.Method.GET;
        // var data = this.makeQueryData_(params.data);
        // request.send(url, method, data);

        return new Promise(function(resolve, reject) {
            var reqId = 'req_' + Date.now() + Math.random();

            this.reqStorage_.set(reqId, {resolve: resolve, reject: reject});
            this.reqStorage_.send({
                reqId: reqId,
                url: url,
                method: method,
                data: data
            });
        });
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

    /**
     * Make query data from given parameters
     * @param {object=} opt_data
     * @return {goog.Uri.QueryData}
     * @private
     */
    Request.prototype.makeQueryData_ = function(opt_data) {
        return QueryData.createFromMap(new Map(opt_data));
    };

    /**
     * Wrap XhrIo request 'complete' event in promise
     * @param {goog.net.XhrIo} request
     * @param {function} successCallback
     * @param {function} errorCallback
     * @return {goog.Promise}
     * @private
     */
    Request.prototype.makeRequestPromise_ = function(request,
                                                     successCallback,
                                                     errorCallback) {

        return new Promise(function(resolve, reject) {
            goog.events.listenOnce(request, 'complete', function() {
                var responseText = request.getResponseText(),
                    response = this.tryParseResponseText_(responseText),
                    status = request.getStatus();

                if (request.isSuccess()) {
                    successCallback(response, status);
                    resolve(response);
                }
                else {
                    errorCallback(response, status, request.getLastError());
                    reject(response);
                }
            }, false, this);
        }, this);
    };

    /**
     * Try parse response text to object
     * @param {string} responseText
     * @return {(string|object)}
     * @private
     */
    Request.prototype.tryParseResponseText_ = function(responseText) {
        var response;

        try {
            response = JSON.parse(responseText);
        }
        catch (error) {
            response = responseText;
        }

        return response;
    };
});  // goog.scope
