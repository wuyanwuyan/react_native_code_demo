import React from 'react';
import {View, Text, FlatList, ActivityIndicator,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import commomStyles from '../../styles/common';
import {fetchGet} from '../../utils/fetchUtil';

import Separator from '../../components/Separator';
import ListEmptyComponent from '../../components/ListEmptyComponent';
import ListFooterLoadMore from '../../components/ListFooterLoadMore';
import ListFooterNoMore from '../../components/ListFooterNoMore';

export default class Home extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title: '首页',
            tabBarIcon: ({tintColor}) => (
                <Icon name="home" size={25} color={tintColor}/>
            ),
            headerLeft: (<Icon.Button name="menu" size={30} backgroundColor="transparent" onPress={() => {
                navigation.navigate('DrawerOpen')
            }}></Icon.Button>)
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            total: Infinity,
            swiperData: [],
            data: [],
            refreshing: false,
            hasMore: true,
        }

    }

    componentDidMount() {
        // getArticles().then(data => {
        //     let newData = this.state.data.concat(data.contents);
        //     this.setState({data: newData, total: data.total});
        // })
    }


    refresh = () => {
        this.setState({refreshing: true});
        getArticles(this.state.data.length).then(data => {
            this.setState({refreshing: false});
        })
    }

    loadMore = (info) => {
        if (!this.state.hasMore) return;
        getArticles(this.state.data.length).then(data => {
            let appendData = data.contents || [];
            let dataNew = this.state.data.concat(appendData);
            this.setState({data:dataNew, hasMore: data.length < data.total});
        })
    }

    _openWebView = (name,url) => () =>{
        this.props.navigation.navigate('WebViewPage',{name,url})
    }

    _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity onPress={this._openWebView('helllllll--','www.baidu.com')}>
                <Text style={{width: '100%', textAlign: 'center'}}>{item.id + '-' + index}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        const {data, swiperData,hasMore,refreshing} = this.state;
        let isEmpty = !hasMore && data.length === 0;
        return (
            <View>
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
        )
    }
}


//state 全部：-1 草稿：0 已发布：1
function getArticles(offset = 0, limit = 10) {
    var query = {state: 1, offset, limit};
    return fetchGet("/column/articles", query);
}

