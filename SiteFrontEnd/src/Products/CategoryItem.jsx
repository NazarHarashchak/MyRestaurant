import React from 'react';

function CategoryItem(props) {
    return (
        <div className="categoryItem">
            <div className="image">
                <img src={props.category.image} alt="category image" />
            </div>
            <div className="description">
                <h2>
                    {props.category.name}
                </h2>
            </div>
        </div>
    );
}

export default (CategoryItem);