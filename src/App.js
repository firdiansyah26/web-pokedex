import './App.css';
import './assets/styles/styles.scss'
import 'react-block-ui/style.css';
import 'antd/dist/antd.css';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost'

import stores from './redux/stores';
import AppRoute from './routes/router';

const client = new ApolloClient({
  uri: 'https://graphql-pokeapi.vercel.app/api/graphql'
})
let persistor = persistStore(stores);

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={stores}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRoute />
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
