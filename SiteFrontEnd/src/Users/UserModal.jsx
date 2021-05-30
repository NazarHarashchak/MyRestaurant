import React from 'react';

function UserModal(props) {
    return (
        <div className="userModal">
            { props.isEdit ?
                <form>
                    <div className="controls">
                        <div class="form-group row">
                            <div className="col-sm-6">
                                <input type="text" class="form-control" name="name" placeholder="Enter name" value={props.user.name} onChange={props.handler} />
                            </div>
                            <div className="col-sm-6">
                                <input type="text" class="form-control" name="secondName" placeholder="Enter secondname" value={props.user.secondName} onChange={props.handler} />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div className="col-sm-6">
                                <input type="number" class="form-control" name="age" placeholder="Enter age" onChange={props.handler} value={props.user.age} />
                            </div>
                            <div className="col-sm-6">
                                <input type="text" class="form-control" name="phoneNumber" placeholder="Enter phonenumber" onChange={props.handler} value={props.user.phoneNumber} />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div className="col-sm-6">
                                <input type="text" class="form-control" name="city" placeholder="Enter city" value={props.user.city} onChange={props.handler} />
                            </div>
                            <div className="col-sm-6">
                                <input type="text" class="form-control" name="street" placeholder="Enter street" value={props.user.street} onChange={props.handler} />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div className="col-sm-4">
                                <input type="text" class="form-control" name="houseNumber" placeholder="Enter house number" value={props.user.houseNumber} onChange={props.handler} />
                            </div>
                            <div className="col-sm-4 checkboxrow">
                                <input type="checkbox" class="form-control" id="gridCheck2" name="checkbox" onChange={props.handler} checked={props.user.isPrivateHouse} />
                                <label class="form-check-label" for="gridCheck2">Is private house</label>
                            </div>
                            <div className="col-sm-4">
                                <input type="number" class="form-control" name="appartmentsNumber" value={props.user.appartmentsNumber} placeholder="Enter appartments number" onChange={props.handler} />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div className="col-sm-6">
                                <label className="form-check-label">Role</label>
                                <select class="form-control" onChange={props.handler} name="select">
                                    <option value="1">Administrator</option>
                                    <option value="2">Manager</option>
                                    <option value="3">Driver</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div className="col-sm-6">
                                <input type="button" id="registrateBtn" onClick={props.saveHandler} class="btn btn-primary linkButton" value="Зберегти" />
                            </div>
                            <div className="col-sm-6">
                                <input type="button" id="registrateBtn" onClick={props.cancelHandler} class="btn btn-primary linkButton" value="Скасувати" />
                            </div>
                        </div>
                    </div>
                </form>
                :
                <form onSubmit={props.saveHandler}>
                    <div className="controls">
                        <div class="form-group row">
                            <div className="col-sm-6">
                                <input type="text" class="form-control" name="email" placeholder="Enter login" value={props.name} onChange={props.handler} required />
                            </div>
                            <div className="col-sm-6">
                                <input type="password" class="form-control" name="password" placeholder="Enter password" value={props.secondName} onChange={props.handler} required />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div className="col-sm-6">
                                <input type="text" class="form-control" name="name" placeholder="Enter name" value={props.name} onChange={props.handler} required />
                            </div>
                            <div className="col-sm-6">
                                <input type="text" class="form-control" name="secondName" placeholder="Enter secondname" value={props.secondName} onChange={props.handler} required />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div className="col-sm-6">
                                <input type="number" class="form-control" name="age" placeholder="Enter age" onChange={props.handler} value={props.age} required />
                            </div>
                            <div className="col-sm-6">
                                <input type="text" class="form-control" name="phoneNumber" placeholder="Enter phonenumber" onChange={props.handler} value={props.phoneNumber} required />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div className="col-sm-6">
                                <input type="text" class="form-control" name="city" placeholder="Enter city" value={props.city} onChange={props.handler} required />
                            </div>
                            <div className="col-sm-6">
                                <input type="text" class="form-control" name="street" placeholder="Enter street" value={props.street} onChange={props.handler} required />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div className="col-sm-4">
                                <input type="text" class="form-control" name="houseNumber" placeholder="Enter house number" value={props.houseNumber} onChange={props.handler} required />
                            </div>
                            <div className="col-sm-4 checkboxrow">
                                <input type="checkbox" class="form-control" id="gridCheck2" name="checkbox" onChange={props.handler} />
                                <label class="form-check-label" for="gridCheck2">Is private house</label>
                            </div>
                            <div className="col-sm-4">
                                <input type="number" class="form-control" name="appartmentsNumber" value={props.appartmentsNumber} placeholder="Enter appartments number" onChange={props.handler} />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div className="col-sm-6">
                                <label className="form-check-label">Role</label>
                                <select class="form-control" onChange={props.handler} name="select" required>
                                    <option value="1">Administrator</option>
                                    <option value="2">Manager</option>
                                    <option value="3">Driver</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div className="col-sm-6">
                                <input type="submit" id="registrateBtn" class="btn btn-primary linkButton" value="Зберегти" />
                            </div>
                            <div className="col-sm-6">
                                <input type="button" id="registrateBtn" onClick={props.cancelHandler} class="btn btn-primary linkButton" value="Скасувати" />
                            </div>
                        </div>
                    </div>
                </form>
            }
        </div>
    );
}

export default (UserModal);