let {
    styles
} = require('../../util/helper');

module.exports = (basics, layout, bulks) => {
    let {
        contrastBulk
    } = bulks;
    let {
        container,
        flat
    } = layout;

    let inputBox = styles(contrastBulk, flat, {
        width: 260,
        padding: basics.narrowPadding,
        backgroundColor: basics.fontColor
    });

    let textAreaBox = styles(inputBox, {
        width: 360,
        height: 200,
        outline: 'none',
        resize: 'none',
        overflow: 'auto',
        border: `1px solid ${basics.borderColor}`,
        borderRadius: 5,
        fontSize: 16
    });

    let underLineBorder = {
        border: 0,
        borderRadius: 0,
        'border-bottom': `1px solid ${basics.borderColor}`
    };

    let underLineFocus = {
        'border-bottom': `1px solid ${basics.blockColor}`
    };

    let flatRippleMask = {
        content: '',
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 5,
        height: 5,
        backgroundColor: basics.halfBlockColor,
        opacity: '0',
        borderRadius: '100%',
        transform: 'scale(1, 1) translate(-50%)',
        transformOrigin: '50% 50%'
    };

    return {
        inputBox,
        textAreaBox,
        underLineBorder,
        underLineFocus,
        flatRippleMask
    };
};
