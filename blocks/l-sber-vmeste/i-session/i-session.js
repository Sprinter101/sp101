goog.provide('sv.iSession.Session');

goog.require('goog.events.EventTarget');



/**
 * Session manager. It use Local Storage for store session data.
 * @constructor
 * @extends {goog.events.EventTarget}
 */
sv.iSession.Session = function() {
    goog.base(this);
};
goog.inherits(sv.iSession.Session, goog.events.EventTarget);
goog.addSingletonGetter(sv.iSession.Session);


goog.scope(function() {
    var Session = sv.iSession.Session;


    /**
     * Event enum
     * @enum {string}
     */
    Session.Event = {
        CLEANED: 'session-cleaned',
        UPDATED: 'session-updated'
    };


    /**
     * Reference to Local Storage location where session is stored
     * @type {string}
     * @private
     */
    Session.STORAGE_KEY_ = 'sv.sid';


    /**
     * Save session
     * @param {string} sid
     */
    Session.prototype.set = function(sid) {
        window.localStorage.setItem(Session.STORAGE_KEY_, sid);

        this.dispatchEvent(Session.Event.UPDATED);
    };


    /**
     * Returns session value
     * @return {string}
     */
    Session.prototype.get = function() {
        return window.localStorage.getItem(Session.STORAGE_KEY_);
    };


    /**
     * Clear the session
     */
    Session.prototype.clear = function() {
        window.localStorage.removeItem(Session.STORAGE_KEY_);

        this.dispatchEvent(Session.Event.CLEANED);
    };
});  // goog.scope
