import {extendTheme} from "@chakra-ui/react";

const colors = {
  brand: {
    main: "#741C1C",
    sub: "#F9D5AC",
    50: '#fff2e2',
    100: '#fadbb8',
    200: '#f5c38b',
    300: '#f1ac5d',
    400: '#ee9430',
    500: '#d47a19',
    600: '#a55f13',
    700: '#76430d',
    800: '#472805',
    900: '#1b0c00',
  },
  subBrand: {
    main: "#F9D5AC",
    sub: "#fff2e2",
    50: '#fef0de',
    100: '#feefdc',
    200: '#fdebd4',
    300: '#fce7cc',
    400: '#fbe2c3',
    500: '#fadebd',
    600: '#fadab5',
    700: '#fadab4',
    800: '#fad9b3',
    900: '#fad7b0',
  },
  border: {
    layout: "#EEEEEE",
    form: "#D1D3D8"
  }
};

const sizes = {
  layout: {
    maxWidth: "520px",
    maxHeight: "100%"
  }
}

const theme = extendTheme({colors, sizes});

export default theme;
