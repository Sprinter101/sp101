goog.provide('sv.lSberVmeste.iUserService.UserService');

goog.require('cl.iControl.Control');
goog.require('cl.iRequest.Request');



/**
 * Application user service
 * @constructor
 * @extends {cl.iControl.Control}
 */
sv.lSberVmeste.iUserService.UserService = function() {};

goog.scope(function() {
    var UserService = sv.lSberVmeste.iUserService.UserService,
        request = cl.iRequest.Request.getInstance();

    /**
     * Api enum
     * @type {string}
     */
    UserService.URL = {
        USER_URL: '/user'
    };

    /**
     * check if user is logged in
     * @return {Object} ajas response or error
     */
    UserService.isUserLoggedIn = function() {
        return request.send({
            url: UserService.URL.USER_URL
        });
    };

});  // goog.scope
