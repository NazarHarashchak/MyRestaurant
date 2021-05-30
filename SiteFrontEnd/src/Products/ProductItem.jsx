import React, { useState, useEffect } from 'react';

function ProductItem(props) {

    const [logined, setLogined] = useState(false);

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("AuthentificateUser"));
        if (!user) {
            user = JSON.parse(sessionStorage.getItem("AuthentificateUser"));
        }
        if (user && user.roleID === 4) {
            setLogined(true);
        }
    });

    return (
        <div className="product">
            <div className="image">
                <img src={props.product.image} alt="category image" />
            </div>
            <div className="description">
                <h2>
                    {props.product.name}
                </h2>
                {props.product.productContent && props.product.productContent != "" ?
                    <p>
                        Склад: {props.product.productContent}
                    </p>
                    : null
                }
                <p>
                    Вага: {props.product.weight}
                </p>
                <p>
                    Ціна: {props.product.price}
                </p>
                {
                    logined ?
                        <button className="btn btn-primary linkButton" onClick={() => props.addHandle(props.product)}>
                            Додати у кошик
                        </button>
                        : null
                }
            </div>
        </div>
    );
}

export default ProductItem;