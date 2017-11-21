import React, {Component} from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux'
import {StackNavigator, TabNavigator, DrawerNavigator, addNavigationHelpers} from 'react-navigation';
import Splash from './pages/Splash';
import Origin from './pages/Origin';
import Origin1, {wrap} from './pages/Origin1';
import Home from './pages/home';
import Content from './pages/content';
import Mine from './pages/mine';
import WebViewPage from './pages/WebViewPage';

import Screen1 from './Containers/Screen1'
import Screen2 from './Containers/Screen2'
import Screen3 from './Containers/Screen3'
import DrawerContainer from './Containers/DrawerContainer'


const Tab = TabNavigator(
    {
        index: {
            screen: Home
        },
        index2: {
            screen: Content
        },
        index3: {
            screen: Mine
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


const sreenStack = StackNavigator(
    {
        Tab: {
            screen: Tab
        },
        screen1: {
            screen: Screen1
        },
        screen2: {
            screen: Screen2
        },
        mine: {
            screen: Mine
        },
        WebViewPage: {
            screen: WebViewPage
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


const DrawerNav = DrawerNavigator({
    DrawerNav: {
        screen: sreenStack
    }
}, {
    drawerWidth: 300,
    contentComponent: (props) => <DrawerContainer {...props} />
})


const App = StackNavigator(
    {
        Splash: {screen: Splash},
        Home: {
            screen: DrawerNav
        }
    },
    {
        headerMode: 'none'
    });


function AppWithRedux(props) {
    const {dispatch, nav} = props;
    const navigation = addNavigationHelpers({
        dispatch,
        state: nav
    })

    return <App navigation={navigation}/>
}

const mapStateToProps = state => ({nav: state.nav});
export default connect(mapStateToProps)(AppWithRedux);
export {App};
