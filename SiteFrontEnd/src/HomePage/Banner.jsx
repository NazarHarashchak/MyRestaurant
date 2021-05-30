import React from 'react';

function Banner(props) {
    return (
        <div className="bannerHome">
            <div className="backImage">
                <img src={props.logo2} />
            </div>
            <div className="logo">
                <img src={props.logo1} />
            </div>
        </div>
    );
}

export default Banner;