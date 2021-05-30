import React from 'react';
import Banner from './Banner';
import logo1 from '../Site files/insignia.webp';
import logo2 from '../Site files/banner-image1.jpg';

class Home extends React.Component {
    render() {
        return (
            <div className="homePage">
                <Banner logo1={logo1} logo2={logo2} />
            </div>
        )
    }
}

export default Home;