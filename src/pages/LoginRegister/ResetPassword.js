import React from "react";
import {Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import mStyles from "./style";
import NextBtn from "./components/NextBtn";

export default class ResetPassword extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: '修改密码',
            headerBackTitle: null,
            headerBackTitleStyle: {
                color:'#3e9ce9'
            },
            headerRight: Platform.OS === 'ios' ? null : <View/>,
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: '',
            passwordAgain: '',
            captcha: '',
            sms_code: '',
            captcha_url: '',
            countDown: 0,
        }
    }

    _onChangeText = (type) => (value) => {
        this.setState({[type]: value});
    }


    componentWillUnmount() {
    }

    render() {
        const {phone, password, passwordAgain, sms_code} = this.state;

        return (
            <ScrollView
                style={styles.container}
                keyboardShouldPersistTaps='handled'
            >
                <TextInput
                    value={phone}
                    style={[mStyles.input, {marginTop: 16}]}
                    keyboardType="numeric"
                    placeholder="请输入手机号"
                    placeholderTextColor="#aaaaaa"
                    underlineColorAndroid="transparent"
                    maxLength={20}
                    onChangeText={this._onChangeText('phone')}
                />

                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 16}}>
                    <TextInput
                        value={sms_code}
                        style={[mStyles.input, {width: '100%'}]}
                        keyboardType="numeric"
                        placeholder="请输入短信验证码"
                        placeholderTextColor="#aaaaaa"
                        underlineColorAndroid="transparent"
                        maxLength={8}
                        onChangeText={this._onChangeText('sms_code')}
                    />
                    <TouchableOpacity onPress={this._getCacha} style={styles.getCaptcha}>
                        <Text>获取短信验证码</Text>
                    </TouchableOpacity>
                </View>


                <TextInput
                    value={password}
                    style={[mStyles.input, {marginTop: 16}]}
                    secureTextEntry={true}
                    placeholder="请输入新密码"
                    placeholderTextColor="#aaaaaa"
                    underlineColorAndroid="transparent"
                    maxLength={20}
                    onChangeText={this._onChangeText('password')}
                />
                <TextInput
                    value={passwordAgain}
                    style={[mStyles.input, {marginTop: 16}]}
                    secureTextEntry={true}
                    placeholder="请再次输入新密码"
                    placeholderTextColor="#aaaaaa"
                    underlineColorAndroid="transparent"
                    maxLength={20}
                    onChangeText={this._onChangeText('passwordAgain')}
                />
                <View style={mStyles.nextBtnContainer}>
                    <NextBtn onPress={this._resetPassword}/>
                </View>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 40,
    },

    imgCaptcha: {
        width: 80,
        height: 48,
        resizeMode: 'stretch'
    },
    getCaptcha: {
        position: 'absolute',
        right: 10,
        height: '100%',
        justifyContent: 'center',

    }
});