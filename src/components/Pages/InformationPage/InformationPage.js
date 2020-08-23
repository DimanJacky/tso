import React, { Component } from "react";
import { connect } from "react-redux";
import KeyboardVirtual from "../../KeyboardVirtual/KeyboardVirtual";
import { loginAuth, passAuth,addLoginUser,userAuthExit } from '../../../actions/actionsAuth';
import './informationPage.scss';
import { Redirect } from 'react-router-dom';

class InformationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedToken: false,
            exitAuth: false,
            messageAuth: ""
        }
    }

    //Получаем данные введенные в поле Логин и Пароль
    updateDataLogin = (login, pass) => {
        this.props.actLoginAuth(login)
        this.props.actPassAuth(pass)
    }

    //Кнопка Войти
    handlerLogin = () => {
        this.props.addLogin(this.props.loginAuth, this.props.passAuth); //Передача введенного Логина и Пароль при Авторизации
        this.setState({
            checkedToken: true,
            exitAuth: false,
        });
    }

    //Кнопка Выход
    handlerExit = () => {
        this.props.exitLogin();
        this.setState({
            exitAuth: true,
        })
    }

    render() {
        //Если пришел токен - значит авторизация прошла успешно
        if (this.state.checkedToken) {
            if (this.props.tokenAutUser.accessToken) {
                return <Redirect to="/"/> //Временно редирект на главную страницу
            }
        }
        //Если нажали на Выход
        if (this.state.exitAuth) {
            return <Redirect to="/"/>
        }
        return (
            <div className="informationPage__wrapper">
                <h3 className="informationPage__title">Введите данные</h3>
                <KeyboardVirtual
                    changeLogin={(login, pass) => this.updateDataLogin(login, pass)}
                    authUser={this.props.tokenAutUser.accessToken}
                    activeComponent={"informationPage"}
                    type="TwoInput"
                    keyboardType="number"
                />
                <div className="informationPage__Instruction">
                    <p className="informationPage__Instruction-text">После окончания нажмите кнопку "Войти"</p>
                    <p className={this.props.tokenAutUser.accessToken ? "auth-active" : "no-auth"}>
                        Пользователь уже Авторизован
                    </p>
                    <p className="informationPage__error-auth">
                        {this.props.errorToken}
                    </p>
                    <div className="informationPage__btn-wrapper">
                        <button
                            className="waves-effect waves-light btn btn-exit"
                            onClick={this.handlerExit}
                        >
                            Выход
                        </button>
                        <button
                            className="waves-effect waves-light btn btn-enter"
                            onClick={this.handlerLogin}
                            disabled={!this.props.loginAuth && !this.props.passAuth}
                        >
                            Войти
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        loginAuth: state.AuthReducer.loginAuth,
        passAuth: state.AuthReducer.passAuth,
        errorToken: state.AuthReducer.error,
        tokenAutUser: state.AuthReducer.tokenAutUser
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actLoginAuth: (payload) => dispatch(loginAuth(payload)),
        actPassAuth: (payload) => dispatch(passAuth(payload)),
        addLogin: (loginVal, passVal) => dispatch(addLoginUser(loginVal, passVal)),
        exitLogin: () => dispatch(userAuthExit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InformationPage)