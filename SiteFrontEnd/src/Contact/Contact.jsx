import React from 'react';
import logo1 from '../Site files/contact1.webp';
import logo2 from '../Site files/contact2.jpg';
import logo3 from '../Site files/contact3.jpg';
import logo4 from '../Site files/contact4.webp';

class Contact extends React.Component {
    render() {
        return (
            <div className="contactPage ">
                <div className="twopictureBlock">
                    <div className="leftSide">
                        <div className="images">
                            <img src={logo1} alt="food" />
                            <img src={logo2} alt="food" />
                        </div>
                        <div className="textZone">
                            <div className="description">
                                Справжній ресторан світової кухні. У нас ви можете посмакувати різноманітними стравами із цілого світу.
                                Затишна атмосфера допоможе вам відпочити від буденних справ. Також у нас ви можете посмакувати чудовою кавою разом із десартами, що полонили весь світ.
                                Якщо ж більше подобається ласувати смаколиками з дому, тоді робіть замовлення на доставку і ми довеземо вам страви якнайшвидше.
                        </div>
                            <a href="/products" className="btn btr-primary linkButton">
                                Замовити
                        </a>
                        </div>
                    </div>
                    <div className="imageSide">
                        <img src={logo3} alt="food" />
                    </div>
                </div>
                <div className="contactForm">
                    <div className="description">
                        <h2>
                            Залиште відгук
                        </h2>
                        <p>
                            Для нас важлива ваша думка
                        </p>
                    </div>
                    <form>
                        <div class="form-group row">
                            <div className="col-sm-6">
                                <input type="text" class="form-control" name="name" placeholder="Enter name" onChange={this.changeHandler} />
                            </div>
                            <div className="col-sm-6">
                                <input type="text" class="form-control" name="secondName" placeholder="Enter secondname" onChange={this.changeHandler} />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div className="col-sm-6">
                                <input type="text" class="form-control" name="email" placeholder="Enter email" onChange={this.changeHandler} />
                            </div>
                            <div className="col-sm-6">
                                <input type="text" class="form-control" name="phoneNumber" placeholder="Enter phonenumber" onChange={this.changeHandler} />
                            </div>
                        </div>
                        <div class="form-group row">
                            <div className="col-sm-12">
                                <textarea className="form-control" placeholder="Enter message" name="message"></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div className="col-sm-12">
                                <input type="button" id="registrateBtn" onClick={this.saveUser} class="btn btn-primary linkButton" value="Надіслати" />
                            </div>
                        </div>
                    </form>
                </div>
                <div className="zoneWithBackground">
                    <div className="image">
                        <img src={logo4} alt="background" />
                    </div>
                    <div className="description">
                        <h2>
                            Резервація
                        </h2>
                        <p>
                            Зарезервувати столик можна за номером +380999999999
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default (Contact);