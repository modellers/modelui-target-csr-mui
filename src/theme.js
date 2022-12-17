import { createTheme } from '@mui/material/styles'

// https://mui.com/customization/palette/

const theme = createTheme({
  fontFamily: 'Raleway, Arial',
  palette: { // https://mui.com/customization/default-theme/?expand-path=$.palette
    // primary: { 500: '#467fcf' },
  },
  components: {
    MuiFormControl: {
      styleOverrides: {
        innerWidth: '100%',
        outerWidth: '100%',
        width: '100%'
      }
    },
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Raleway';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Raleway'), local('Raleway-Regular'),
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
    MuiTypography: {
      /*
      variants: {
        props: { color: "secondary" },
        style: {
          marginTop: '120px',
        }
      }
      */
    }
  }
})

theme.typography.h5 = {
  fontFamily: 'cursive',
  fontSize: '1.1rem',
  '@media (min-width:600px)': {
    fontSize: '1.1rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.2rem',
  },
};

export default theme;