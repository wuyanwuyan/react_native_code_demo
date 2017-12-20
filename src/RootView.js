import React, {Component} from 'react';
import {BackHandler} from 'react-native';
import {connect} from 'react-redux'
import {StackNavigator, TabNavigator, DrawerNavigator, addNavigationHelpers, NavigationActions} from 'react-navigation';
import Splash from './pages/Splash';
import Origin from './pages/Origin';
import Origin1, {wrap} from './pages/Origin1';
import Home from './pages/home';
import Content from './pages/content';
import Mine from './pages/mine';
import WebViewPage from './pages/webView/index';
import ToastUtil from './utils/ToastUtil';

import DrawerContainer from './Containers/DrawerContainer'
import CandleStickChartScreen from './components/CandleStickChartScreen';
import RNExitApp from 'react-native-exit-app';

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
            labelStyle:{
                marginTop:0,
                marginBottom:2
            },
            indicatorStyle: {
                opacity: 0
            },
            tabStyle: {
                padding: 0
            }
        },
    });

//再包裹一层StackNavigator，是因为我需要StackNavigator的header，https://reactnavigation.org/docs/intro/headers
const DrawHome = StackNavigator(
    {
        DrawHome: {
            screen: Tab
        }
    },
    {
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
    }
);

const DrawerNav = DrawerNavigator({
    DrawerNav: {
        screen: DrawHome
    }
}, {
    drawerWidth: 300,
    contentComponent: (props) => <DrawerContainer {...props} />
})


const App = StackNavigator(
    {
        Splash: {screen: Splash},
        Home: {
            screen: DrawerNav,
            navigationOptions: { // 避免StackNavigator添加两个header，这里设置为空
                header: null,
            }
        },
        WebViewPage: {
            screen: WebViewPage
        },
        CandleStickChartScreen:{
            screen:CandleStickChartScreen
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


class AppWithRedux extends Component {
    constructor(props) {
        super(...arguments);
        this.lastBackPressed = null;
    }

    // https://github.com/react-community/react-navigation/issues/117
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    onBackPress = () => {
        const {dispatch, nav} = this.props;
        if (nav.index === 0) {
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                // BackHandler.exitApp();
                RNExitApp.exitApp();
                return false;
            }
            this.lastBackPressed = Date.now();
            ToastUtil.showShort('再按一次退出应用');
            return true;
        } else {
            dispatch(NavigationActions.back());
            return true;
        }
    };

    render() {
        const {dispatch, nav} = this.props;
        const navigation = addNavigationHelpers({
            dispatch,
            state: nav
        })

        return <App navigation={navigation}/>
    }
}

const mapStateToProps = state => ({nav: state.nav});
export default connect(mapStateToProps)(AppWithRedux);
export {App};
