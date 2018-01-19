import React from "react";
import {SafeAreaView, StyleSheet, View} from "react-native";
import ScrollableTabView, {DefaultTabBar} from "react-native-scrollable-tab-view";
import Register from "./Register";
import Login from "./Login";
import Icon from "react-native-vector-icons/MaterialIcons";


export default class LoginRegister extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            header: null,
        }
    }

    constructor(props) {
        super(props);

    }

    _goBack = () => {
        this.props.navigation.goBack();
    }


    render() {
        const {navigation} = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Icon.Button
                        name="close"
                        size={26}
                        color="black"
                        backgroundColor="transparent"
                        underlayColor="transparent"
                        onPress={this._goBack}/>
                </View>
                <View style={{flex: 1}}>
                    <ScrollableTabView
                        // scrollWithoutAnimation={true}
                        style={{flex: 1}}
                        renderTabBar={() => <DefaultTabBar />}
                        tabBarBackgroundColor="white"
                        tabBarUnderlineStyle={{backgroundColor: '#3e9ce9'}}
                        tabBarActiveTextColor='#3e9ce9'
                        tabBarInactiveTextColor='gray'
                    >
                        <Login navigation={navigation} tabLabel="登录"/>
                        <Register navigation={navigation} tabLabel="注册"/>
                    </ScrollableTabView>
                </View>
            </SafeAreaView>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})