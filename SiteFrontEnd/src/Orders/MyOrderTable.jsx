import React from 'react'

class MyOrderTable extends React.Component {
    render() {
        return (
            <div className="usersTable">
                <div className="tableContainer">
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    Номер замовлення
                                </td>
                                <td>
                                    Створено
                                </td>
                                <td>
                                    Статус
                                </td>
                                <td>
                                    Ціна
                                </td>
                                <td>
                                    Продукти
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.orders
                                    && this.props.orders.length > 0 ?
                                    this.props.orders.map((item) =>
                                        <tr>
                                            <td>
                                                {item.id}
                                            </td>
                                            <td>
                                                {item.createdDate}
                                            </td>
                                            <td>
                                                {item.status}
                                            </td>
                                            <td>
                                                {item.price} грн
                                            </td>
                                            <td>
                                                {
                                                    item.products.map((product) =>
                                                        product.name + ', '
                                                    )
                                                }
                                            </td>
                                        </tr>
                                    )
                                    : null
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default MyOrderTable;