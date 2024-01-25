import {extendTheme} from "@chakra-ui/react";

const colors = {
  brand: {
    main: "#741C1C",
    sub: "#F9D5AC",
  },
  border: {
    layout: "#EEEEEE",
    form: "#D1D3D8"
  }
};

const theme = extendTheme({colors});

export default theme;
