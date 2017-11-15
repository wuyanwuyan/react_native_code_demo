import React, {Component} from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation';
import Splash from './pages/Splash';
import Origin from './pages/Origin';

const App = StackNavigator(
    {
        Splash: {screen: Splash},
        Origin: {screen: Origin}
    },
    {
        headerMode: 'screen',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#3e9ce9'
            },
            headerTitleStyle: {
                color: '#fff',
                fontSize: 20
            },
            headerTintColor: '#fff'
        }
    });

export default App;
