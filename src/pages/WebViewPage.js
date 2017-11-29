import React from 'react';
import {
    StyleSheet,
    WebView,
    BackHandler,
    Dimensions,
    Text,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Modal
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import ToastUtil from '../utils/ToastUtil';
import LoadingView from '../components/LoadingView';

// 单页面网页可能出现title改变
let injectedJavaScript = `
        window.postMessage(document.title,"*")
`;

export default class WebViewPage extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.title,
            headerBackTitle: null,
            headerBackTitleStyle: {
                color: '#3e9ce9'
            },
            headerRight: (
                <Icon.Button
                    name="share"
                    backgroundColor="transparent"
                    underlayColor="transparent"
                    activeOpacity={0.8}
                    onPress={() => {
                        navigation.state.params.handleShare();
                    }}
                />
            )
        }
    };

    constructor(props) {
        super(props);
        this.state = {};
        this.canGoBack = false;
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backHandler);
        this.props.navigation.setParams({handleShare: this.handleShare});
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
    }

    handleShare = () => {
        console.log('share !');
    }

    backHandler = () => {
        if (this.canGoBack) {
            this.webview.goBack();
            return true;
        }
        return false;
    }

    onNavigationStateChange = (navState) => {
        console.log('+++++  ', navState);
        this.canGoBack = navState.canGoBack;
    };

    handleMessage = (message, title) => {
        console.log('title dubu-- ', title, message.nativeEvent, '----====kkkkk')
        this.props.navigation.setParams({title: message.nativeEvent.data})
    }

    render() {
        const {params} = this.props.navigation.state;
        return (
            <WebView
                style={{flex: 1}}
                ref={(ref) => {
                    this.webview = ref;
                }}
                source={{uri: params.url}}
                domStorageEnabled
                scalesPageToFit
                startInLoadingState
                onShouldStartLoadWithRequest={() => true}
                onNavigationStateChange={this.onNavigationStateChange}
                injectedJavaScript={injectedJavaScript}
                onMessage={this.handleMessage}
            />
        );
    }
}