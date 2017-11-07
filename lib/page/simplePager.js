'use strict';

const lumineView = require('../util/lumineView');
const n = require('../util/n');
const PageLoading = require('../view/loading/pageLoading');
const Notice = require('../view/notice/notice');
const {
    syncBindWithKeyMap
} = require('../view/compose/mapUI');
const Full = require('../view/layout/full');

/**
 *
 * define a simple page view class, which contains page loading and notice.
 */

module.exports = (PageView) => {
    return lumineView((state, ctx) => {
        const oldOnSignal = state.props.onsignal;

        state.props.onsignal = (signal, viewState) => {
            // sync state
            state.props = viewState.props;
            state.children = viewState.children;

            oldOnSignal && oldOnSignal(signal, state, ctx);
        };

        return () => {
            return n(Full, {
                style: state.props.style.container
            }, [
                n(PageLoading,
                    syncBindWithKeyMap(ctx, {
                        'loading.show': 'show'
                    }, {
                        bindedProps: {
                            style: state.props.style.loading
                        }
                    })),

                n(Notice, syncBindWithKeyMap(
                    ctx, {
                        'notice.show': 'show',
                        'notice.text': 'text'
                    }, {
                        bindedProps: {
                            style: state.props.style.notice
                        }
                    })),

                n(PageView, state.props, state.children)
            ]);
        };
    }, {
        defaultProps: {
            // loading in page level
            loading: {
                show: false
            },
            // notice window
            notice: {
                show: false,
                text: ''
            },

            style: {
                container: {},
                loading: {
                    zIndex: 10000
                },
                notice: {}
            }
        }
    });
};
