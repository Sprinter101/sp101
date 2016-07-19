goog.provide('sv.lSberVmeste.iRequestStorage.RequestStorage');



/**
 * Ajax requests helper
 * @constructor
 */
sv.lSberVmeste.iRequestStorage.RequestStorage = function() {
    this.requests = {};
};
goog.addSingletonGetter(sv.lSberVmeste.iRequestStorage.RequestStorage);


goog.scope(function() {
    var Storage = sv.lSberVmeste.iRequestStorage.RequestStorage;

    /**
     *
     * @param  {string} reqId          [description]
     * @param  {object} resolve        [description]
     * @param  {object} reject         [description]
     * @param  {boolean} opt_autoRemove       [description]
     */
    Storage.prototype.set = function(reqId, resolve, reject, opt_autoRemove) {
        var autoRemove = true;

        if (opt_autoremove != undefined) {
            autoRemove = opt_autoRemove;
        }

        this.requests[reqId] = {
            resolve: resolve,
            reject: reject,
            autoRemove: autoRemove
        };
    };

    /**
     *
     * @param  {string} reqId request id
     * @return {object}       object that contains some info about request
     */
    Storage.prototype.get = function(reqId) {
        return this.requests[reqId];
    };

    /**
     * Remove request info by reqId
     * @param {string} reqId request id
     */
    Storage.prototype.remove = function(reqId) {
        delete this.requests[reqId];
    };

    /**
     * Auto execute promise callback in accordance with the server response
     * and remove request from Storage by reqId
     * @param {{
     *     type: string,
     *     reqId: string,
     *     response: string|object
     * }} data object contains info about response from server
     */
    Storage.prototype.exec = function(data) {
        var type = data.type;
        var reqId = data.reqId;
        var serverResponse = data.response;
        var response;

        if (type == 'resolve') {
            this.get(reqId).resolve(data.response);
        } else {
            this.get(reqId).reject(serverResponse);
        }

        // if (typeof data.response == 'string') {
        //     try {
        //         response = JSON.parse(data.response);
        //     } catch (err) {
        //         throw new Error(err);
        //     }
        // }
    };

});  // goog.scope
