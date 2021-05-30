import React from 'react'

function OrderForm(props) {
    return (
        <div className="orderForm">
            <form>
                <div class="form-group row">
                    <div className="col-sm-6">
                        <input type="text" class="form-control" onChange={props.handler} name="city" placeholder="Enter city" required />
                    </div>
                    <div className="col-sm-6">
                        <input type="text" class="form-control" onChange={props.handler} name="street" placeholder="Enter street" required />
                    </div>
                </div>
                <div class="form-group row">
                    <div className="col-sm-4">
                        <input type="text" class="form-control" onChange={props.handler} name="houseNumber" placeholder="Enter house number" required />
                    </div>
                    <div className="col-sm-4 checkboxrow">
                        <input type="checkbox" class="form-control" onChange={props.handler} id="gridCheck2" name="checkbox" />
                        <label class="form-check-label" for="gridCheck2">Is private house</label>
                    </div>
                    <div className="col-sm-4">
                        <input type="number" class="form-control" onChange={props.handler} name="appartmentsNumber" placeholder="Enter appartments number" />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-12">
                        <textarea className="form-control" onChange={props.handler} name="message" placeholder="Leave your message here"></textarea>
                    </div>
                </div>
                <div class="form-group row">
                    <div className="col-sm-12">
                        <input type="button" onClick={props.save} id="registrateBtn" class="btn btn-primary linkButton" value="Зберегти" />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default OrderForm;