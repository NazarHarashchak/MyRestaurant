import React from 'react';
import logo1 from '../Site files/about-us-banner.jpg';
import Title from '../general/Title';
import UsersTable from './UsersTable';

class AdminUsers extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let user = JSON.parse(localStorage.getItem("AuthentificateUser"));
        if (!user) {
            user = JSON.parse(sessionStorage.getItem("AuthentificateUser"));
        }
        if (user) {
            if (user.roleID !== 1) {
                window.location.href = '/';
            }
        }
        else {
            window.location.href = '/';
        }
    }
    render() {
        return (
            <div className="allUsersPage">
                <Title logo={logo1} title="Користувачі" />
                <UsersTable />
            </div>
        );
    }
}

export default (AdminUsers);