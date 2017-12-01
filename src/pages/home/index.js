import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import cStyles from '../../styles/common';
import ArticleList from './ArticleList';
import {firstLoad, loadMoreArticle} from '../../actions/articles';
import LoadingView from '../../components/LoadingView';
import codePush from 'react-native-code-push';

class Home extends React.Component {
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
    }

    componentDidMount() {
        this.props.firstLoad();
        codePush.sync({
            updateDialog: {
                appendReleaseDescription: true,
                descriptionPrefix: '\n\n更新内容：\n',
                title: '更新',
                mandatoryUpdateMessage: '',
                mandatoryContinueButtonLabel: '更新',
            },
            mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
            deploymentKey: "vn1L8Hn4AIVLmbImJOxyUafkKFAaf09d6585-c32c-4359-8b28-0c1d7984bedb",
        });
    }

    render() {
        const {articles: {cateList, articleList}} = this.props;

        if (cateList.length === 0) return <LoadingView/>;
        return (
            <ScrollableTabView
                tabBarBackgroundColor="#fcfcfc"
                tabBarActiveTextColor="#3e9ce9"
                tabBarInactiveTextColor="#aaaaaa">
                {
                    cateList.map(v =>
                        <ArticleList
                            navigation={this.props.navigation}
                            tabLabel={v.type}
                            key={v.id}
                            categoryId={v.id}
                            articles={articleList[v.id]}
                            loadMoreArticle={this.props.loadMoreArticle}
                        />
                    )
                }
            </ScrollableTabView>
        )
    }
}

const mapStateToProps = (state) => {
    const {articles} = state;
    return {
        articles
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        firstLoad: bindActionCreators(firstLoad, dispatch),
        loadMoreArticle: bindActionCreators(loadMoreArticle, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);