import React, {Component} from 'react';

import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const wrap = (Component,params) => class Origin2 extends Component{
    static navigationOptions = ({navigation,screenProps}) => {
        console.log('----',navigation,'--params ',params);
        return {
            title: params.hello,
            tabBarIcon: ({tintColor}) => (
                <Icon name="home" size={25} color={tintColor}/>
            ),
        }
    }


    render() {
        return (
            <Component {...this.props} />
        );
    }
}

export default class Origin1 extends Component {
    static navigationOptions = ({navigation,screenProps}) => {
        console.log('----',navigation,screenProps);
        return {
            title: '首页',
            tabBarIcon: ({tintColor}) => (
                <Icon name="home" size={25} color={tintColor}/>
            ),
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit App.js
                </Text>
                <Text style={styles.instructions}>
                    {instructions + Math.random()}
                </Text>
                <Icon name="rocket" size={30} color="#900"/>
            </View>
        );
    }
}

export {wrap};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});