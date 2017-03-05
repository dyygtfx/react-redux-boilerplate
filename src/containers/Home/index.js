import React, { Component } from 'react';
import { Link } from 'react-router';
import './home.less';


class Home extends Component {
    render() {
        return (
            <div>
                首页
                
                <Link to={`/about`} activeClassName="active">关于</Link>
                <section>这是首页</section>
                <h4>logo</h4>
            </div>
            
        );
    }
}

export default Home;
