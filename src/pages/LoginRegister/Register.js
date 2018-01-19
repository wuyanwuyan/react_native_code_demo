import React from "react";
import {Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import mStyles from "./style";
import NextBtn from "./components/NextBtn";
import ToastUtil from "../../utils/ToastUtil";
import {fetchPost} from "../../utils/fetchUtil";

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: '',
            passwordAgain: '',
            captcha: '',
            sms_code: '',
            countDown: 0,
        }
    }

    _onChangeText = (type) => (value) => {
        this.setState({[type]: value});
    }

    componentWillUnmount() {
    }

    render() {
        const {phone, password, passwordAgain, sms_code, countDown} = this.state;

        return (
            <ScrollView
                style={styles.container}
                keyboardShouldPersistTaps='handled'
            >
                <ScrollView
                    style={{flex: 1}}
                    ref={r => this.scrollView = r}
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    alwaysBounceHorizontal={false}
                    keyboardShouldPersistTaps='handled'
                >
                    <View style={styles.sectionContainer}>
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
                            {countDown <= 0 ? <TouchableOpacity onPress={this._getCacha} style={styles.getCaptcha}>
                                <Text>获取短信验证码</Text>
                            </TouchableOpacity> :
                                <View style={styles.getCaptcha}><Text
                                    style={{color: 'gray'}}>{`${countDown}秒后重新发送`}</Text></View>
                            }
                        </View>

                        <TextInput
                            value={password}
                            style={[mStyles.input, {marginTop: 16}]}
                            secureTextEntry={true}
                            placeholder="请输入密码"
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            maxLength={20}
                            onChangeText={this._onChangeText('password')}
                        />
                        <TextInput
                            value={passwordAgain}
                            style={[mStyles.input, {marginTop: 16}]}
                            secureTextEntry={true}
                            placeholder="请再次输入密码"
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            maxLength={20}
                            onChangeText={this._onChangeText('passwordAgain')}
                        />

                        <View style={mStyles.nextBtnContainer}>
                            <NextBtn onPress={f=>f}/>
                        </View>

                    </View>

                </ScrollView>
            </ScrollView>
        )
    }
}

let screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    sectionContainer: {
        flex: 1,
        width: screenWidth,
        paddingHorizontal: 40,
    },
    getCaptcha: {
        position: 'absolute',
        right: 10,
        height: '100%',
        justifyContent: 'center',

    }
});