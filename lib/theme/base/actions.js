module.exports = (basics) => {
    return {
        cling: {
            margin: 0,
            padding: 0,
            boxSizing: 'border-box'
        },

        hover: {
            backgroundColor: basics.hoverColor
        },

        active: {
            backgroundColor: basics.hoverColor
        },

        focus: {
            outline: 'none'
        },

        flatHover: {
            color: basics.hoverColor
        },

        flatActive: {
            color: basics.hoverColor
        }
    }
};
