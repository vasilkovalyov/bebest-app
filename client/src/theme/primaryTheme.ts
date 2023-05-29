import { createTheme } from '@mui/material/styles'

import fontSize from './fontSize'
import colors from './colors'

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 1024,
      xl: 1440,
    },
  },
  palette: {
    primary: {
      main: colors.pink,
      contrastText: colors.white,
    },
    secondary: {
      main: colors.blue,
      contrastText: colors.white,
    },
    success: {
      main: colors.green,
      contrastText: colors.white,
    },
    info: {
      main: colors.grey_middle,
      contrastText: colors.white,
      light: colors.grey_middle,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        sizeSmall: {
          height: 40,
          paddingTop: 12,
          paddingBottom: 10,
          paddingLeft: 16,
          paddingRight: 16,
          borderRadius: 8,
          fontWeight: 700,
        },
        sizeMedium: {
          height: 50,
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 20,
          paddingRight: 20,
          borderRadius: 8,
          fontWeight: 700,
        },
        sizeLarge: {
          height: 60,
          paddingTop: 14,
          paddingBottom: 14,
          paddingLeft: 32,
          paddingRight: 32,
          borderRadius: 8,
          fontWeight: 700,
        },
        contained: {
          boxShadow: '0px 5px 15px rgba(193, 42, 61, 0.2)',
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: fontSize.fz_1_lg,
          fontWeight: 500,
          color: colors.black,
          marginBottom: 12,
          display: 'block',
          position: 'relative',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          '&:focus': {
            borderWidth: 2,
            borderColor: colors.grey_dark,
            borderStyle: 'solid',
          },
          '&:before': {
            display: 'none',
          },
          '&:after': {
            display: 'none',
          },
          '&:hover:before': {
            display: 'none',
          },
          '&:hover:after': {
            display: 'none',
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: colors.pink,
          fontSize: fontSize.fz_1_xxs,
          fontWeight: 500,
          textAlign: 'right',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          overflow: 'hidden',
        },
        input: {
          backgroundColor: colors.grey_light,
          marginTop: 0,
          height: 20,
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 20,
          paddingRight: 20,
          borderRadius: 20,
          overflow: 'hidden',
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: 'transparent',
        },
        inputAdornedStart: {
          paddingLeft: 46,
        },
        inputAdornedEnd: {
          paddingRight: 46,
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        positionEnd: {
          position: 'absolute',
          right: 15,
          width: 20,
          height: 20,
          cursor: 'pointer',
        },
        positionStart: {
          position: 'absolute',
          left: 15,
          width: 20,
          height: 20,
          cursor: 'pointer',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        message: {
          fontWeight: 400,
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          marginBottom: 0,
        },
      },
    },
  },
})

// **** TYPOGRAPHY ****
const fontSizeH1 = {
  color: colors.black,
  fontSize: fontSize.fz_3_xs,
  fontWeight: 700,
  marginBottom: 16,
  border: 'none',
  borderBlockColor: 'transparent',

  [theme.breakpoints.up('md')]: {
    fontSize: fontSize.fz_4_xs,
  },
  [theme.breakpoints.up('xl')]: {
    fontSize: fontSize.fz_5_xs,
  },
}

theme.typography.h1 = fontSizeH1
theme.typography.h2 = fontSizeH1

theme.typography.h3 = {
  color: colors.black,
  fontSize: fontSize.fz_2_lg,
  marginBottom: 16,
  border: 0,

  [theme.breakpoints.up('md')]: {
    fontSize: fontSize.fz_3_xs,
  },
}

theme.typography.h4 = {
  color: colors.black,
  fontSize: fontSize.fz_2_xs,
  marginBottom: 16,
  border: 0,
}

theme.typography.h5 = {
  color: colors.black,
  fontSize: fontSize.fz_1_lg,
  marginBottom: 16,
}

theme.typography.h6 = {
  color: colors.black,
  fontSize: fontSize.fz_1_md,
  marginBottom: 16,
  border: 0,
}

theme.typography.body1 = {
  color: colors.grey_dark,
  fontSize: fontSize.fz_1_sm,
  marginBottom: 16,
  border: 0,
}

theme.typography.body2 = {
  color: colors.black,
  fontSize: fontSize.fz_1_sm,
  fontWeight: 600,
  marginBottom: 16,
  border: 0,
}

theme.typography.subtitle1 = {
  fontSize: fontSize.fz_1_md,
  color: colors.grey_dark,
  fontWeight: 500,
  marginBottom: 16,
  border: 0,
}

theme.typography.subtitle2 = {
  fontSize: fontSize.fz_1_sm,
  color: colors.grey_middle,
  fontWeight: 500,
  marginBottom: 16,
}

// ************

export default theme
