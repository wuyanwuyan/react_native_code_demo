import React, {Component} from 'react';
import {connect} from 'react-redux'
import {StackNavigator, TabNavigator, addNavigationHelpers} from 'react-navigation';
import Splash from './pages/Splash';
import Origin from './pages/Origin';
import Origin1, {wrap} from './pages/Origin1';

const Home = TabNavigator(
    {
        index: {
            screen: wrap(Origin1, {hello: 1})
        },
        index2: {
            screen: wrap(Origin1, {hello: 333})
        },
        index3: {
            screen: wrap(Origin1, {hello: 3331111})
        }
    },
    {
        lazy: true,
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        animationEnabled: true,
        tabBarOptions: {
            activeTintColor: '#3e9ce9',
            inactiveTintColor: '#999999',
            showIcon: true,
            style: {
                backgroundColor: '#fff'
            },
            indicatorStyle: {
                opacity: 0
            },
            tabStyle: {
                padding: 0
            }
        },
    });


const App = StackNavigator(
    {
        Splash: {screen: Splash},
        Origin: {screen: Origin},
        Home: {
            screen: Home
        }
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


function AppWithRedux(props) {
    const {dispatch, nav} = props;
    const navigation = addNavigationHelpers({
        dispatch,
        state: nav
    })

    return <App navigation={navigation}/>
}

const mapStateToProps = state => ({ nav: state.nav });
export default connect(mapStateToProps)(AppWithRedux);
export {App};
