import React, { PureComponent } from 'react';
import { Link } from 'react-router';
class About extends PureComponent {
    render() {
        return (
            <div>
                关于
                <Link to={`/`}>回到首页</Link>
                <img style={{ display: 'block' }} src={require('../../images/logo.png')} alt="logo" />
                <section>关于页面</section>
            </div>
        );
    }
}

export default About;
