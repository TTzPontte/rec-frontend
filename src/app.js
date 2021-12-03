import React, { useEffect } from "react";
import { Provider } from "react-redux";
import GlobalStyles from "@iso/assets/styles/globalStyle";
import { store } from "./redux/store";
import Routes from "./router";
import AppProvider from "./AppProvider";
import Amplify from "@aws-amplify/auth";
import awsConfig from "./config/amplify.config";
import initBootAuthenticated from "./redux/auth/boot";

Amplify.configure(awsConfig);

initBootAuthenticated();

const App = () => (
  <Provider store={store}>
    <AppProvider>
      <GlobalStyles />
      <Routes />
    </AppProvider>
  </Provider>
);

export default App;
