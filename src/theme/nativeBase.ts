import {extendTheme} from 'native-base';

export const theme = extendTheme({
  components: {
    Input: {
      sizes: {
        '3xl': {
          paddingY: 8,
        },
      },
    },
  },
});
