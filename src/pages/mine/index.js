import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class Mine extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: '我的',
            tabBarIcon: ({tintColor}) => (
                <Icon name="account" size={25} color={tintColor}/>
            )
        }
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    _login = () => {
        this.props.navigation.navigate('LoginRegister');
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={{alignItems: 'center', marginTop: 50}} onPress={this._login}
                                  activeOpacity={0.8}>
                    <Image source={require('../../assets/head.png')} style={styles.avater}></Image>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                        <Text>登录 | 注册</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avater: {
        width: 74,
        height: 74,
        resizeMode: 'stretch'
    },
})