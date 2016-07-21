goog.provide('sv.lSberVmeste.iCardService.CardService');

goog.require('cl.iControl.Control');
goog.require('cl.iRequest.Request');
goog.require('goog.Promise');



/**
 * @constructor
 * @extends {cl.iControl.Control}
 */
sv.lSberVmeste.iCardService.CardService = function() {};

goog.scope(function() {
    var request = cl.iRequest.Request.getInstance();
    var CardService = sv.lSberVmeste.iCardService.CardService;

    /**
     * Get card info by card id
     * @param  {number} cardId card id
     * @return {goog.Promise}
     */
    CardService.getCard = function(cardId) {
        var cardUrl = '/entity/' + cardId;

        return request.send({url: cardUrl});
    };


    /**
     * Get directions by parent id
     * @param  {number} cardId parent card id
     * @return {goog.Promise}
     */
    CardService.getDirectionsByAssociatedId = function(cardId) {
        var cardUrl = '/entity/' + cardId + '/direction';

        return request.send({url: cardUrl});
    };


    /**
     * Get funds by parent id
     * @param  {number} cardId parent card id
     * @return {goog.Promise}
     */
    CardService.getFundsByAssociatedId = function(cardId) {
        var cardUrl = '/entity/' + cardId + '/fund';

        return request.send({url: cardUrl});
    };


    /**
     * Get funds by parent id
     * @param  {number} cardId parent card id
     * @return {goog.Promise}
     */
    CardService.getFundEntitiesById = function(cardId) {
        var directionsUrl = '/entity/' + cardId + '/direction';
        var topicsUrl = '/entity/' + cardId + '/topic';

        var reqDirections = request.send({url: directionsUrl});
        var reqTopics = request.send({url: topicsUrl});

        return Promise.all([reqDirections, reqTopics]);
    };

});  // goog.scope
