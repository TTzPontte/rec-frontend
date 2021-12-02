import React from 'react';
import { Provider } from 'react-redux';
import GlobalStyles from '@iso/assets/styles/globalStyle';
import { store } from './redux/store';
import Boot from './redux/auth/boot';
import Routes from './router';
import AppProvider from './AppProvider';
import Amplify from '@aws-amplify/auth';
import awsConfig from './config/amplify.config';

Amplify.configure(awsConfig);

const App = () => (
  <Provider store={store}>
    <AppProvider>
      <GlobalStyles />
      <Routes />
    </AppProvider>
  </Provider>
);

Boot()
  .then(() => App())
  .catch(error => console.error(error));

export default App;
