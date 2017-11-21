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

import Icon from 'react-native-vector-icons/Ionicons';
import ToastUtil from '../utils/ToastUtil';
import LoadingView from '../components/LoadingView';

export default class WebViewPage extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.name,
        }
    };

    constructor(props) {
        super(props);
        this.state = {};

    }

    componentDidMount() {
        // this.props.navigation.setParams({handleShare: this.onActionSelected});
        BackHandler.addEventListener('hardwareBackPress', this.goBack);

    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.goBack);
    }

    onNavigationStateChange = (navState) => {
        console.log('onNavigationStateChange ',navState)
    };

    render() {
        const {params} = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <WebView
                    ref={(ref) => {
                        this.webview = ref;
                    }}
                    style={styles.base}
                    source={{uri: 'https://www.baidu.com/'}}
                    javaScriptEnabled
                    domStorageEnabled
                    scalesPageToFit
                    decelerationRate="normal"
                    onShouldStartLoadWithRequest={() => true}
                    onNavigationStateChange={this.onNavigationStateChange}
                    renderLoading={() => <LoadingView />}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    base: {
        flex: 1
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFF'
    },
    spinner: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.65)'
    },
    spinnerContent: {
        justifyContent: 'center',
        width: Dimensions.get('window').width * (7 / 10),
        height: Dimensions.get('window').width * (7 / 10) * 0.68,
        backgroundColor: '#fcfcfc',
        padding: 20,
        borderRadius: 5
    },
    spinnerTitle: {
        fontSize: 18,
        color: '#313131',
        textAlign: 'center',
        marginTop: 5
    },
    shareParent: {
        flexDirection: 'row',
        marginTop: 20
    },
    shareContent: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    shareIcon: {
        width: 40,
        height: 40
    }
});
