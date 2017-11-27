import React from 'react';
import {View, Text, FlatList, ActivityIndicator, TouchableOpacity, Image, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import commomStyles from '../../styles/common';
import {fetchGet} from '../../utils/fetchUtil';

import Separator from '../../components/Separator';
import ListEmptyComponent from '../../components/ListEmptyComponent';
import ListFooterLoadMore from '../../components/ListFooterLoadMore';
import ListFooterNoMore from '../../components/ListFooterNoMore';
import LoadingView from '../../components/LoadingView';
// import Swiper from 'react-native-swiper';

export default class ArticleList extends React.Component {
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
        getTopArticle().then(swiperData => {
            this.setState({swiperData});
        })
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
            this.setState({data: dataNew, hasMore: this.state.data.length < data.total});
        })
    }

    _openWebView = (url, title = '') => () => {
        this.props.navigation.navigate('WebViewPage', {url, title})
    }

    _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity onPress={this._openWebView(`http://www.cqaso.com/zhuanlan/a/${item.id}`)}
                              style={styles.articleContainer}>
                <Image source={{uri: item.thumbnail}} style={styles.articleImg}/>
                <View style={commomStyles.flex1}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.desc} numberOfLines={2}>{item.desc}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const {data, swiperData, hasMore, refreshing} = this.state;
        let isEmpty = !hasMore && data.length === 0;
        return (
            <View style={commomStyles.flex1}>
                {/*<View style={styles.swiperWrapper}>*/}
                    {/*{ swiperData.length > 0 ?*/}
                        {/*<Swiper autoplay={true} paginationStyle={{bottom: 6}} height="100%">*/}
                            {/*{*/}
                                {/*swiperData.map((v, i) => {*/}
                                        {/*return (*/}
                                            {/*<TouchableOpacity activeOpacity={0.9} style={commomStyles.flex1} key={i}*/}
                                                              {/*onPress={this._openWebView(`http://www.cqaso.com/zhuanlan/a/${v.articleId}`)}>*/}
                                                {/*<Image source={{uri: v.thumbnail} } style={commomStyles.flex1}/>*/}
                                                {/*<Text style={styles.swiperTxt}>{v.title}</Text>*/}
                                            {/*</TouchableOpacity>*/}
                                        {/*)*/}
                                    {/*}*/}
                                {/*)*/}
                            {/*}*/}
                        {/*</Swiper> : <LoadingView/>}*/}
                {/*</View>*/}
                <Separator/>
                <FlatList
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

let sreenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    swiperWrapper: {
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
    },
    swiperTxt: {
        position: 'absolute',
        bottom: 30,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '100%',
        fontSize: 16,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0
    },
    articleContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 6
    },
    articleImg: {
        width: 120,
        height: 75,
        marginRight: 10,
        resizeMode: 'cover'
    },
    title: {
        flex: 1,
        fontSize: 14,
        flexWrap: 'wrap'

    },
    desc: {
        flex: 1,
        fontSize: 12,
        color: '#9A9898'
    },

    wrapper: {},
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }

})

//state 全部：-1 草稿：0 已发布：1
function getArticles(offset = 0, limit = 10) {
    var query = {state: 1, offset, limit};
    return fetchGet("/column/articles", query);
}

// 获取前三篇文章，用于滚动显示
function getTopArticle() {
    return fetchGet("/column/mainPage/imageInfo");
}

