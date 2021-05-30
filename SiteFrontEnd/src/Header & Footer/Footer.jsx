import React from "react"
import logo from '../Site files/avada-cafe-logo-footer.webp';

function Footer() {
    return (
        <footer>
            <div className="footerLogo">
                <img src={logo} alt="logo" />
            </div>
            <div className="footerContact">
                <div className="col-sm-4 footerContainer">
                    <i className="fa fa-envelope"></i>
                    <a href="#">Email</a>
                </div>
                <div className="col-sm-4 footerContainer">
                    <i className="fa fa-comments"></i>
                    <a href="#">Call</a>
                    <p className="description">+380999999999</p>
                </div>
                <div className="col-sm-4 footerContainer">
                    <i className="fa fa-map-marker"></i>
                    <a href="#">Find us</a>
                    <p className="description">Львів, вулиця Генерала Чупринки, 137</p>
                </div>
            </div>
            <div className="copyrightZone">
                <div className="col-sm-6 copyrigthText">
                    <p>@Copyrigth 2021 |  Avada    |   Всі права захищено | </p>
                </div>
                <div className="col-sm-6 socialZone">
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
        </footer >
    );
}

export default Footer;