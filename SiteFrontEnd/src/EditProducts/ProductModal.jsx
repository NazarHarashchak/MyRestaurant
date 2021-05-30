import React from 'react'

function ProductModal(props) {
    return (
        <div className="productModal">
            {
                props.isEdit ?
                    <form>
                        <div class="form-group row">
                            <div className="col-sm-6 image">
                                <img src={props.product.image} alt="image" />
                                <input type="file" onChange={props.imageChanged} class="form-control" required />
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label">
                                    Назва
                            </label>
                                <input type="text" class="form-control" name="name" value={props.product.name} placeholder="Enter product name" onChange={props.handler} required />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div className="col-sm-6">
                                <label className="form-label">
                                    Вага (грами)
                            </label>
                                <input type="text" class="form-control" name="weight" value={props.product.weight} placeholder="Enter product weight" onChange={props.handler} required />
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label">
                                    Склад
                            </label>
                                <textarea class="form-control" name="productContent" placeholder="Enter product content" onChange={props.handler} required >
                                    {props.product.productContent}
                                </textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div className="col-sm-6">
                                <label className="form-label">
                                    Ціна (грн)
                            </label>
                                <input type="text" class="form-control" name="price" value={props.product.price} placeholder="Enter product price" onChange={props.handler} required />
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label">
                                    Категорія
                            </label>
                                <select class="form-control" name="category" value={props.product.productTypeID} onChange={props.handler} required>
                                    {
                                        props.categories && props.categories.length > 0 ?
                                            props.categories.map((item, key) =>
                                                <option value={item.id} id={key}>
                                                    {item.name}
                                                </option>
                                            )
                                            : null
                                    }
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div className="col-sm-6">
                                <input type="button" onClick={props.save} class="btn btn-primary linkButton" value="Зберегти" />
                            </div>
                            <div className="col-sm-6">
                                <input type="button" onClick={props.cancel} class="btn btn-primary linkButton" value="Скасувати" />
                            </div>
                        </div>
                    </form>
                    :
                    <form>
                        <div class="form-group row">
                            <div className="col-sm-6 image">
                                <img src={props.product.image} alt="image" />
                                <input type="file" onChange={props.imageChanged} class="form-control" required />
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label">
                                    Назва
                        </label>
                                <input type="text" class="form-control" name="name" value={props.product.name} placeholder="Enter product name" onChange={props.handler} required />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div className="col-sm-6">
                                <label className="form-label">
                                    Вага (грами)
                        </label>
                                <input type="text" class="form-control" name="weight" value={props.product.weight} placeholder="Enter product weight" onChange={props.handler} required />
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label">
                                    Склад
                        </label>
                                <textarea class="form-control" name="productContent" placeholder="Enter product content" onChange={props.handler} required >
                                    {props.product.productContent}
                                </textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div className="col-sm-6">
                                <label className="form-label">
                                    Ціна (грн)
                        </label>
                                <input type="text" class="form-control" name="price" value={props.product.price} placeholder="Enter product price" onChange={props.handler} required />
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label">
                                    Категорія
                        </label>
                                <select class="form-control" name="category" value={props.product.productTypeID} onChange={props.handler} required>
                                    <option selected>Оберіть категорію</option>
                                    {
                                        props.categories && props.categories.length > 0 ?
                                            props.categories.map((item, key) =>
                                                <option value={item.id} id={key}>
                                                    {item.name}
                                                </option>
                                            )
                                            : null
                                    }
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div className="col-sm-6">
                                <input type="button" onClick={props.save} class="btn btn-primary linkButton" value="Зберегти" />
                            </div>
                            <div className="col-sm-6">
                                <input type="button" onClick={props.cancel} class="btn btn-primary linkButton" value="Скасувати" />
                            </div>
                        </div>
                    </form>
            }
        </div>
    );
}

export default ProductModal;