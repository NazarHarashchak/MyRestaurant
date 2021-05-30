import React, { useState, useEffect } from "react";
import logo from '../Site files/cafe_logo2.webp';

import Cart from '../Cart/Cart';

function pageScroll() {
    let scroll = window.scrollY;
    let height = document.querySelector(".headerStick").offsetHeight - window.innerHeight + 6;
    if (scroll <= height) {
        document.querySelector(".headerStick").setAttribute("style", "margin-top: -" + scroll + "px");
    }
}
function Header() {
    const [isLogined, setLogined] = useState(false);
    const [userDB, setUser] = useState(null);

    const finishAuthentification = () => {
        localStorage.removeItem("AuthentificateUser");
        sessionStorage.removeItem("AuthentificateUser");
        localStorage.removeItem("CartProducts");
        setLogined(false);
        setUser(null);
        window.location.href = "";
    }

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("AuthentificateUser"));
        if (!user) {
            user = JSON.parse(sessionStorage.getItem("AuthentificateUser"));
        }
        if (userDB && userDB.email == user.email) {
            return;
        }
        if (user) {
            setLogined(true);
            setUser(user);
        }
    });

    useEffect(() => {
        let href = document.location.href;
        let elements = document.querySelectorAll(".headerMenu .menu li a");
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].href === href) {
                elements[i].parentElement.classList.add("active");
            }
            else {
                elements[i].parentElement.classList.remove("active");
            }
        }
        window.addEventListener("scroll", pageScroll);
    });

    const getMenuForUser = () => {
        if (!userDB) {
            return (
                <ul className="menu">
                    <li>
                        <a href="/">
                            Головна
                    </a>
                    </li>
                    <li>
                        <a href="/products">
                            Їжа та напої
                    </a>
                    </li>
                    <li>
                        <a href="/location">
                            Локації
                    </a>
                    </li>
                    <li>
                        <a href="  /contact">
                            Контакти
                    </a>
                    </li>
                    <li>
                        <a href="/login">
                            Вхід та реєстрація
                        </a>
                    </li>
                </ul>
            );
        }
        switch (userDB.roleID) {
            case 1:
                return (
                    <ul className="menu">
                        <li>
                            <a href="/">
                                Головна
                                </a>
                        </li>
                        <li>
                            <a href="/allusers">
                                Всі користувачі
                            </a>
                        </li>
                        <li>
                            <a onClick={finishAuthentification}>
                                Вийти
                             </a>
                        </li>
                    </ul>
                );
            case 2:
                return (
                    <ul className="menu">
                        <li>
                            <a href="/">
                                Головна
                        </a>
                        </li>
                        <li>
                            <a href="/orders">
                                Замовлення
                        </a>
                        </li>
                        <li>
                            <a href="/editproducts">
                                Редагувати меню
                            </a>
                        </li>
                        <li>
                            <a href="/products">
                                Їжа та напої
                        </a>
                        </li>
                        <li>
                            <a href="/contact">
                                Контакти
                        </a>
                        </li>
                        <li>
                            <a href="/mypage">
                                Редагувати профіль
                        </a>
                        </li>
                        <li>
                            <a onClick={finishAuthentification}>
                                Вийти
                             </a>
                        </li>
                    </ul>
                );
            case 3:
                return (
                    <ul className="menu">
                        <li>
                            <a href="/">
                                Головна
                            </a>
                        </li>
                        <li>
                            <a href="/driverorders">
                                Замовлення
                            </a>
                        </li>
                        <li>
                            <a href="/mypage">
                                Редагувати профіль
                        </a>
                        </li>
                        <li>
                            <a onClick={finishAuthentification}>
                                Вийти
                                 </a>
                        </li>
                    </ul>
                );
            case 4:
                return (
                    <ul className="menu">
                        <li>
                            <a href="/">
                                Головна
                            </a>
                        </li>
                        <li>
                            <a href="/products">
                                Їжа та напої
                        </a>
                        </li>
                        <li className="checkoutItem">
                            <a href="/checkout">
                                Кошик <Cart />
                            </a>
                        </li>
                        <li>
                            <a href="/location">
                                Локації
                        </a>
                        </li>
                        <li>
                            <a href="/contact">
                                Контакти
                        </a>
                        </li>
                        <li>
                            <a href="/mypage">
                                Редагувати профіль
                        </a>
                        </li>
                        <li>
                            <a onClick={finishAuthentification}>
                                Вийти
                                 </a>
                        </li>
                    </ul>
                );
            default:
                return (
                    <ul className="menu">
                        <li>
                            <a href="/">
                                Головна
                        </a>
                        </li>
                        <li>
                            <a href="/products">
                                Їжа та напої
                        </a>
                        </li>
                        <li>
                            <a href="/location">
                                Локації
                        </a>
                        </li>
                        <li>
                            <a href="/contact">
                                Контакти
                        </a>
                        </li>
                        <li>
                            <a href="/login">
                                Вхід та реєстрація
                            </a>
                        </li>
                    </ul>
                );
        }
    }

    return (
        <header>
            <div className="headerStick">
                <div className="logo">
                    <img src={logo} />
                </div>
                <div className="headerMenu">
                    {
                        getMenuForUser()
                    }
                </div>
                <div className="headerSocial">
                    <ul className="social">
                        <li>
                            <a href="http://facebook.com" target="_blank">
                                <i className="fa fa-facebook"></i>
                            </a>
                        </li>
                        <li>
                            <a href="http://twitter.com" target="_blank">
                                <i className="fa fa-twitter"></i>
                            </a>
                        </li>
                        <li>
                            <a href="http://instagram.com" target="_blank">
                                <i className="fa fa-instagram"></i>
                            </a>
                        </li>
                        <li>
                            <a href="http://youtube.com" target="_blank">
                                <i className="fa fa-youtube"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;