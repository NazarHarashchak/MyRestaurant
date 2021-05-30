import React from 'react'

class OrderTable extends React.Component {
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
                                    Замовник
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
                                <td>
                                    Додати у роботу
                                </td>
                                <td>
                                    Скасувати
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
                                                {item.name + " " + item.secondName}
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
                                                        <p>
                                                            {product.count + " " + product.name}
                                                        </p>
                                                    )
                                                }
                                            </td>
                                            <td>
                                                {item.status == "Створено" ?
                                                    <button className="btn btn-primary linkButton" onClick={() => this.props.add(item)}>
                                                        Додати кур'єра
                                                    </button>
                                                    : null
                                                }
                                            </td>
                                            <td>
                                                {item.status == "Створено" ?
                                                    <button className="btn btn-primary linkButton" onClick={() => this.props.discard(item)}>
                                                        Скасувати
                                                    </button>
                                                    : null
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

export default OrderTable;