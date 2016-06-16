goog.provide('sv.lSberVmeste.iRouter.Router');

goog.require('cl.iRouter.Router');



/**
 * sv.lSberVmeste.iRouter.Router
 * @constructor
 * @extends {cl.iRouter.Router}
 */
sv.lSberVmeste.iRouter.Router = function() {
    goog.base(this);

    /**
     * Cache for hidden data transferring
     * @type {Object.<String, Object>}
     * @private
     */
    this.hiddenData_ = {};
};
goog.inherits(sv.lSberVmeste.iRouter.Router, cl.iRouter.Router);
goog.addSingletonGetter(sv.lSberVmeste.iRouter.Router);


goog.scope(function() {
    var Router = sv.lSberVmeste.iRouter.Router;

    /**
     * @override
     */
    Router.prototype.use = function(route, action) {
        this.config[route] = action;

        return this;
    };

    /**
     * @override
     */
    Router.prototype.changeLocation = function(route, opt_data, opt_hiddenData)
    {
        var data = opt_data || {};

        this.hiddenData_[route] = opt_hiddenData || {};

        var path = route.replace(/:\w*/g, function(arg) {
            var key = arg.replace(':', ''),
                res = data[key];

            delete data[key];

            return res;
        });

        var query = Object.keys(data).length ? this.toQueryString(data) : '';
        window.location.href = '#' + path + query;
    };

    /**
     * @override
     */
    Router.prototype.getMaskByUrl = function(url) {
        var result = '',
            maskRegExpStr,
            maskRegExp,
            match;

        for (var mask in this.config) {
            maskRegExpStr = mask.replace(/:\w*/g, '\\w*');
            maskRegExp = new RegExp(maskRegExpStr);
            match = url.match(maskRegExp);

            if (match && (match[0] == url)) {
                result = mask;
            }
        }

        return result;
    };

    /**
     * @override
     */
    Router.prototype.parseMaskDataFromUrl = function(mask, url) {
        var data = {},
            match = mask.match(/:\w*/g);

        if (match) {
            var count = match.length,
                keys = match.map(function(arg) {
                    return arg.replace(':', '');
                }),
                maskRegExpStr = mask.replace(/:\w*/g, '(\\w*)'),
                maskRegExp = new RegExp(maskRegExpStr);

            url.replace(maskRegExp, function() {
                for (var i = 0; i < count; i++) {
                    data[keys[i]] = arguments[i + 1];
                }
            });
        }

        return data;
    };

    /**
     * @override
     */
    Router.prototype.onHashChange = function() {
        var locationState = this.getCurrentLocationState(),
            mask = locationState.mask,
            data = locationState.data,
            params = locationState.query || {},
            hiddenData = this.hiddenData_[mask];

        for (var key in hiddenData) {
            params[key] = hiddenData[key];
        }

        for (var key in data) {
            params[key] = data[key];
        }

        var action = this.config[locationState.mask];
        if (typeof action == 'function') {
            action(params);
        }
    };
});  // goog.scope
