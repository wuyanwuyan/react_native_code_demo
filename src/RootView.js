import React, {Component} from "react";
import {BackHandler, Platform} from "react-native";
import {connect} from "react-redux";
import {addNavigationHelpers, DrawerNavigator, NavigationActions, StackNavigator, TabNavigator} from "react-navigation";
import Splash from "./pages/Splash";
import Home from "./pages/home";
import Content from "./pages/content";
import Mine from "./pages/mine";
import LoginRegister from "./pages/LoginRegister";
import ResetPassword from "./pages/LoginRegister/ResetPassword";
import WebViewPage from "./pages/webView/index";
import ToastUtil from "./utils/ToastUtil";

import DrawerContainer from "./Containers/DrawerContainer";
import RNExitApp from "react-native-exit-app";
import getSlideFromRightTransition from "./utils/react-navigation-slide-from-right-transition";

const Tab = TabNavigator(
    {
        index: {
            screen: Home
        },
        // index2: {
        //     screen: Content
        // },
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
                backgroundColor: '#fff',
                ...Platform.select({
                    ios: {height: 46},
                    android: {}
                })
            },
            labelStyle: Platform.OS === 'ios' ? {paddingBottom: 2} : {
                marginTop: 0,
                marginBottom: 2,
                fontSize: 10,
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
        LoginRegister: {
            screen: LoginRegister
        },
        ResetPassword: {
            screen: ResetPassword
        }
    },
    {
        headerMode: 'screen',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#3e9ce9',
            },
            headerTitleStyle: {
                color: '#fff',
                ...Platform.select({
                    ios: null,
                    android: {
                        textAlign: 'center',
                        alignSelf: 'center',
                    }
                }),
            },
            headerTintColor: '#fff'
        },
        cardStyle: {
            backgroundColor: '#fff',
        },
        transitionConfig: Platform.OS === 'ios' ? null : getSlideFromRightTransition
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
