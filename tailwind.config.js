module.exports = {
  theme: {
    extend: {
      backgroundOpacity: {
        10: '0.1',
        20: '0.2',
        30: '0.3',
        40: '0.4',
        50: '0.5',
        60: '0.6',
      },
    },
    inset: {
      0: 0,
      auto: 'auto',
      '1/2': '50%',
      4: '1rem',
      8: '2rem',
      12: '3rem',
    },
  },
  variants: {
    backgroundColor: [
      'responsive',
      'first',
      'last',
      'even',
      'odd',
      'hover',
      'focus',
    ],
  },
  plugins: [],
};
