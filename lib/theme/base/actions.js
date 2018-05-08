module.exports = (basics) => {
  return {
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
  };
};
