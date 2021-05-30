import React from 'react'

function Payment(props) {
    return (
        <div className="payment">
            <form>
                <div class="form-group row">
                    <div className="col-sm-6">
                        <label>До сплати</label>
                        <input type="text" class="form-control" value={props.price + " грн"} disabled />
                    </div>
                    <div className="col-sm-6">
                        <label>Оберіть тип розрахунку</label>
                        <select className="form-control" onChange={props.handler}>
                            <option value="1">Карткою</option>
                            <option value="2">Готівкою</option>
                        </select>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Payment;