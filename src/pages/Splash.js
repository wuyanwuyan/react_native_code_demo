import React from 'react';
import {View, Image, Button, StyleSheet, Dimensions, Text, TouchableOpacity} from 'react-native';
import NavigationUtil from '../utils/NavigationUtil';
import commomStyles from '../styles/common';

export default class Splash extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            countDown: 4
        }
        this.key = null;
    }


    componentDidMount() {
        this.key = setInterval(() => {
            if (this.state.countDown <= 0) {
                clearInterval(this.key);
                this.key = null;
                this.navigate2Main();
            }else{
                let countDown = this.state.countDown - 1;
                this.setState({countDown})
            }
        }, 1000);
    }

    componentWillUnmount() {
        console.log('--componentWillUnmount----');
        this.key && clearInterval(this.key);
    }

    navigate2Main = () => {
        // const {navigate} = this.props.navigation;
        // navigate('Home', {parrrr: '1111133', url: '11111'});
        NavigationUtil.reset(this.props.navigation, 'Home');
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/splash.png')} style={styles.img}/>
                <TouchableOpacity style={styles.pass} onPress={this.navigate2Main}>
                    <Text style={commomStyles.fontSizeNormal}>{`跳过(${this.state.countDown}s)`}</Text>
                </TouchableOpacity>
                <View>
                    <Button onPress={this.navigate2Main} title='进入' color="#000"/>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imgContainer: {
        width: 375,
        height: 300,
        position: 'relative'
    },
    img: {
        width: '100%',
        maxHeight: '90%',
        resizeMode: 'cover',
    },
    pass: {
        position: 'absolute',
        top: 20,
        right: 10,
        backgroundColor: '#ffffff55',
        borderRadius: 4,
        padding: 6
    },
    enterBtn: {}

});
