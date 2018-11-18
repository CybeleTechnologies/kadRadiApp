import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createHistory from 'history/createMemoryHistory';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {
  Text,
  View,
  AppRegistry,
  Animated,
  UIManager,
  findNodeHandle,
  NativeMethodsMixin,
  Button,
} from 'react-native';
import reducer from './reducers/index.js';
import Routes from './routes/Routes.js';
import {styles} from './Styles/Styles.js';
import ApolloClient, { createNetworkInterface, createBatchingNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo'

/* REDUX STARTS */
let history = createHistory();
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });
function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
      routerMiddleware(history),
    ),
  );
  return createStore(reducer, initialState, enhancer);
}
const store = configureStore({});
/* REDUX  ENDS */
const options = { uri: 'https://kadradi-backend.ml/graphql', cachePolicy: { query: false, data: false } };
const networkInterface = createBatchingNetworkInterface(options);

// const networkInterface = createNetworkInterface({
//   cachePolicy: { query: false, data: false },
//   uri: 'https://kadradi-backend.herokuapp.com/graphql',
// });
const client = new ApolloClient({
  networkInterface
});
export default class App  extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
       <Provider store={store}>
        <ApolloProvider  client={client}>
          <Routes  {...store}  history={history}/>
        </ApolloProvider>
       </Provider>
    );
  }
}
