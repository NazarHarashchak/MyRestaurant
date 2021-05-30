import React from 'react'

class DriverTable extends React.Component {
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
                                    Адреса
                                </td>
                                <td>
                                    Завершити
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
                                                {item.fullAddress}
                                            </td>
                                            <td>
                                                {
                                                    <button className="btn btn-primary linkButton" onClick={() => this.props.discard(item)}>
                                                        Завершити
                                                    </button>
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

export default DriverTable;