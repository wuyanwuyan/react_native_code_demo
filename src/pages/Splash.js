import React from 'react';
import {View,Image,Button} from 'react-native';

export default class Splash extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);

    }

    navigate2Main = () =>{
        const { navigate } = this.props.navigation;
        navigate('Origin',{parrrr:'1111133',url:'11111'});
    }

    render() {
        return (
            <View>
                {/*<Image source={require('../assets/splash.png')} />*/}
                <Button onPress={this.navigate2Main} title='跳转'/>
            </View>
        )
    }
}