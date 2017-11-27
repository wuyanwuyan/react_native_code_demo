import React from 'react';
import {bindActionCreators} from 'redux';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import ArticleList from './ArticleList';

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

    }

    render() {
        return (
            <ScrollableTabView>
                <ArticleList tabLabel="React"/>
                <ArticleList tabLabel="Flow"/>
                <ArticleList tabLabel="Jest"/>
            </ScrollableTabView>
        )
    }
}

const mapStateToProps = (state) => {
    const { categorys } = state;
    return {
        categorys
    };
};

const mapDispatchToProps = (dispatch) => {
    const readActions = bindActionCreators(readCreators, dispatch);
    return {
        readActions
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);