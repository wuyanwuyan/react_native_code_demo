/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider ,connect} from 'react-redux';
import RootView from "./RootView";
import configureStore from './configureStore';

import rootSaga from './sagas';

let store = configureStore({});
store.runSaga(rootSaga);

export default Root = () => (
    <Provider store={store}>
      <RootView screenProps={{themeColor:'red'}}/>
    </Provider>
)



