import React from 'react';

function Title(props) {
    return (
        <div className="titleBanner">
            <div className="image">
                <img src={props.logo} alt="logo" />
            </div>
            <div className="description">
                <h2>{props.title}</h2>
                <p>{props.description}</p>
            </div>
        </div>
    );
}

export default Title;