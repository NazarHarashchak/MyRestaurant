import React from 'react'

function ProductItem(props) {
    return (
        <div className="cartItem">
            <a onClick={() => props.deleteHandler(props.product)}>
                <i className="fa fa-close"></i>
            </a>
            <div className="image">
                <img src={props.product.image} alt="product image" />
            </div>
            <div className="description">
                <h2>
                    {props.product.name}
                </h2>
                <p>
                    Ціна: {props.product.price} грн
                </p>
                <div className="counts">
                    <label className="form-label">Кількість</label>
                    <input type="number" min="1" className="form-group" value={props.product.count} onChange={(event) => props.countHandler(props.product, event)} />
                </div>
            </div>
        </div>
    );
}

export default (ProductItem)