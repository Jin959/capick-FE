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
