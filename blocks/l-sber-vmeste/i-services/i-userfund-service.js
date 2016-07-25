goog.provide('sv.lSberVmeste.iUserfundService.UserfundService');

goog.require('cl.iControl.Control');
goog.require('cl.iRequest.Request');



/**
 * Application userfund service
 * @constructor
 * @extends {cl.iControl.Control}
 */
sv.lSberVmeste.iUserfundService.UserfundService = function() {};

goog.scope(function() {
    var UserfundService = sv.lSberVmeste.iUserfundService.UserfundService,
        request = cl.iRequest.Request.getInstance();

    /**
     * Api enum
     * @type {string}
     */
    UserfundService.URL = {
        USERFUNDS_COUNT: '/user-fund/count',
        CHOSEN_ENTITIES: '/user-fund/entity'
    };

    /**
     * get userfunds count
     * @return {Object} ajax response or error
     */
    UserfundService.getUserfundsCount = function() {
        return request.send({
            url: UserfundService.URL.USERFUNDS_COUNT
        });
    };

    /**
     * get entities, chosen by the user
     * @return {Object} ajax response or error
     */
    UserfundService.getChosenEntities = function() {
        return request.send({
            url: UserfundService.URL.CHOSEN_ENTITIES
        });
    };

});  // goog.scope
