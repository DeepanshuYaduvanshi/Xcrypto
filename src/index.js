import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, theme } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // react strict mode se component do baar mount ho rha but ye sirf development phase me h baki , deploy ke baad iska koi role nhi h
  // and chakra provider me wrap kiya taki h iski css use kr ske and isme hmne theme include kr di ab hm chakra ki css theme use krenge 
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

export const server = `https://api.coingecko.com/api/v3`;