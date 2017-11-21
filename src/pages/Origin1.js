import React, {Component} from 'react';

import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Separator from '../components/Separator';
import ListEmptyComponent from '../components/ListEmptyComponent';
import ListFooterLoadMore from '../components/ListFooterLoadMore';
import ListFooterNoMore from '../components/ListFooterNoMore';
import {fetchGetTest} from '../utils/fetchUtil';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const total = 200;
const limit = 50;
const fakeGet = (startIndex) => {
    let data = [];
    for (var i = 0; i < limit; i++) {
        data.push({text: Math.random()})
    }

    return {
        total,
        limit,
        data,
    }


}

const wrap = (Component, params) => class Origin2 extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: params.hello,
            tabBarIcon: ({tintColor}) => (
                <Icon name="home" size={25} color={tintColor}/>
            ),
            headerLeft: <Icon.Button iconStyle='menu' onPress={() => navigation.navigate('DrawerOpen')} />
        }
    }

    componentDidMount(){
        console.log('wrap componentDidMount');

    }

    componentWillUnmount(){
        console.log('wrap componentWillUnmount');
    }

    render() {
        console.log('this.props  ',this.props);
        return (
            <Component {...this.props} />
        );
    }
}

export default class Origin1 extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        console.log('----', navigation, screenProps);
        return {
            title: '首页',
            tabBarIcon: ({tintColor}) => (
                <Icon name="home" size={25} color={tintColor}/>
            ),
        }
    }

    constructor() {
        super(...arguments);
        this.state = {
            data: [],
            refreshing: false,
            fetchingMore: false,
            hasMore: true,
        }
    }

    componentDidMount() {
        fetchGetTest('000', fakeGet(0)).then(content => {
            let appendData = content.data || [];
            let data = this.state.data.concat(appendData);
            this.setState({data, offset: 0, hasMore: data.length < content.total});
        })
    }

    refresh = () => {
        this.setState({refreshing: true});
        fetchGetTest('111', [1, 2, 3]).then(data => {
            console.log('refreshing  ', data);
            this.setState({refreshing: false});
        })
    }

    loadMore = (info) => {
        if (this.state.data.length === 0 || !this.state.hasMore) return;
        console.log('---- loadMore');
        fetchGetTest('000', fakeGet(this.state.offset + limit)).then(content => {
            let appendData = content.data || [];
            let data = this.state.data.concat(appendData);
            this.setState({data, offset: this.state.offset + limit, hasMore: data.length < content.total});
        })
    }

    _renderItem = ({item, index}) => {
        return <Text style={{width: '100%', textAlign: 'center'}}>{item.text + '-' + index}</Text>;
    }

    render() {
        const {hasMore, data, refreshing, firstLoaded} = this.state;
        console.log('hasMore   ', hasMore);
        let isEmpty = !hasMore && data.length === 0;
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
                <ActivityIndicator size="small" color="#3e9ce9"/>
                <Icon name="rocket" size={30} color="#900"/>
                <Separator/>
                <FlatList
                    style={{width: '100%'}}
                    data={data}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={Separator}
                    ListEmptyComponent={ isEmpty ? ListEmptyComponent : null}
                    refreshing={refreshing}
                    onRefresh={this.refresh}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={0}
                    ListFooterComponent={(hasMore) ? ListFooterLoadMore : ListFooterNoMore}
                />
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