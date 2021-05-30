import React from 'react'

function CategoryModal(props) {
    return (
        <div className="categoryModal">
            {
                props.isEdit ?
                    <form>
                        <div class="form-group row">
                            <div className="col-sm-6 image">
                                <img src={props.category.image} alt="image" />
                                <input type="file" onChange={props.imageChanged} class="form-control" required />
                            </div>
                            <div className="col-sm-6">
                                <input type="text" class="form-control" name="name" value={props.category.name} placeholder="Enter category name" onChange={props.handler} required />
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
                    <form >
                        <div class="form-group row">
                            <div className="col-sm-6 image">
                                <img src={props.category.image} alt="image" />
                                <input type="file" onChange={props.imageChanged} class="form-control" required />
                            </div>
                            <div className="col-sm-6">
                                <input type="text" class="form-control" name="name" placeholder="Enter category name" onChange={props.handler} required />
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

export default CategoryModal;