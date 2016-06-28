goog.provide('sv.gTab.Tab');

goog.require('cl.gTab.Tab');
goog.require('sv.gTab.View');



/**
 * Tab control
 * @param {sv.gTab.View} view View used to render or
 *     decorate the component; defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 * @constructor
 * @extends {cl.gTab.Tab}
 */
sv.gTab.Tab = function(view, opt_domHelper) {
    goog.base(this, view, opt_domHelper);

    this.childBlocks_ = [];
};
goog.inherits(sv.gTab.Tab, cl.gTab.Tab);


goog.scope(function() {
    var Tab = sv.gTab.Tab,
        View = sv.gTab.View;

    /**
     * Event enum
     * @enum {string}
     */
    Tab.Event = {
        TAB_SELECT: View.Event.TAB_SELECT
    };

    /**
    * @override
    */
    Tab.prototype.decorateInternal = function(element) {
        goog.base(this, 'decorateInternal', element);

        this.decorateTabsChildren();
    };

    /**
    * Decorates child blocks in each tab
    */
    Tab.prototype.decorateTabsChildren = function() {
        var domContentElements = this.getView().getDom().contentElements;

        for (var i = 0; i < domContentElements.length; i++) {
            var childParams = this.getView()
                                .getChildParams(domContentElements[i]),
                domContentElement = domContentElements[i];

            if (childParams) {
                console.log(childParams);
                var childType = childParams.type,
                    jsParams = childParams.jsParams;

                this.childBlocks_.push(
                    this.decorateChild(childType,
                                        domContentElement.firstChild,
                                        jsParams
                    )
                );
            }
        }
    };

});  // goog.scope
