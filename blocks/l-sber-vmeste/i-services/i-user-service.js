goog.provide('sv.lSberVmeste.iUserService.UserService');

goog.require('cl.iRequest.Request');



/**
 * Application user service
 * @constructor
 */
sv.lSberVmeste.iUserService.UserService = function() {};
goog.addSingletonGetter(sv.lSberVmeste.iUserService.UserService);

goog.scope(function() {
    var UserService = sv.lSberVmeste.iUserService.UserService,
        Request = cl.iRequest.Request;

    /**
     * Api enum
     * @type {string}
     */
    UserService.URL = {
        USER_URL: '/user'
    };

    /**
     * send AJAX
     * @return {Object} ajas response or error
     * @protected
     */
    UserService.prototype.isUserLoggedIn = function() {
        return Request.getInstance().send({
            url: UserService.URL.USER_URL
        });
    };

    /**
     * Remove user entity by id
     * @param {number} entityId
     * @return {object}
     */
    UserService.prototype.removeEntity = function(entityId) {
        return Request.getInstance().send({
            url: '/user-fund/' + entityId,
            type: 'DELETE'
        });
    };

    /**
     * Add user entity by id
     * @param {number} entityId
     * @return {object}
     */
    UserService.prototype.addEntity = function(entityId) {
        return Request.getInstance().send({
            url: '/user-fund/' + entityId,
            type: 'POST'
        });
    };

});  // goog.scope
