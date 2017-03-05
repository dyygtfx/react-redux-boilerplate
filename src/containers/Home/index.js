import React, { Component } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as HomeActions from '../../actions/home';

import './home.less';


class Home extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.getHomeService();
    }
    render() {
        return (
            <div>
                首页
                
                <Link to={`/about`} activeClassName="active">关于</Link>
                <section>这是首页</section>
                <h3>下面的http请求加载的内容</h3>
                <pre>{this.props.home}</pre>
                <h4>logo</h4>
            </div>
            
        );
    }
}

const mapStateToProps = state => {
    console.log(state);

    return {
        home: state.homeReducer.home,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators(HomeActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
