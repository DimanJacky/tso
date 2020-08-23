import React, {Component} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getOpt } from "../../../actions/actionsOperatingMode";
import Preloader from "../../Preloader/Preloader";
import { addLoginUser } from "../../../actions/actionsAuth";
import {actionClearCart, clearPayment, getWidgetClear} from "../../../actions/actionsPayOrder";
import {unlockGas} from "../../../actions/actionsFuelPumps";
import './homePage.scss';
//RxJs
import {interval} from "rxjs";
import {takeWhile} from 'rxjs/operators'
import {clearOrderData} from "../../../actions/actionsOrderFuel";

class HomePage extends Component {
    componentDidMount() {
        setTimeout(function() { //Для искуственой задержки
            this.checkedOptMode();
        }.bind(this), 1500)
        //Если вернулись на стартовый экран (надо почистить корзину)
        //this.props.clearPayment(this.props.widgetId); //widgetId - получаем когда нажимаем на кнопку оплатить
        //this.props.actionClearCart();
        this.props.getWidgetClear();
        this.props.actionClearDataOrder();

        //Если вернулись назад и колонку которую выбрали ранее нужно вывести из режима налива (потому что оплата)
        if (this.props.numberSelectGas) {
            this.props.unlockGas(this.props.numberSelectGas)
        }

        console.log(this.props.infoCart);
    }

    //Данная функция проверяет статус "Проверка режима работы" (если OPTMODE не приходит от api - значит делаем запрос повторно пока не получим ответ OPTMODE)
    checkedOptMode() {
        this.props.actionOpt();
        const stream$ = interval(1000)
            .pipe(
                takeWhile(v => this.props.opt.state !== "OPTMODE") //takeWhile - это условие по которому вызываеться стрим
            )
        //Данный стрим будет выполняться пока не сработает takeWhile
        stream$.subscribe({
            next: v => this.props.actionOpt()
        })
    }

    //Функция которая отрисовывает контент
    renderHomePage() {
        if (this.props.opt.state === "OPTMODE") {
            return (
                <div className="homePage__section-action">
                    <Link to="/stationPage" className="link__wrapper">
                        <div className="homePage__action homePage__action_fuel">
                            <p>Заправка</p>
                        </div>
                    </Link>
                    <Link to="/returnPage" className="link__wrapper">
                        <div className="homePage__action homePage__action_check">
                            <p>Возврат</p>
                        </div>
                    </Link>
                    <Link to="/informationPage" className="link__wrapper">
                        <div className="homePage__action-information">
                            <p>Информация</p>
                        </div>
                    </Link>
                </div>
            )
        } else {
            return <Preloader/>
        }
    }

    render() {
        return (
            <div className="homePage__wrapper">
                {this.renderHomePage()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        opt: state.OptModeReducer.optMode,
        widgetId: state.PayOrderReducer.widgetId,
        numberSelectGas: state.FuelPumpsReducer.numberSelectGas,
        infoCart: state.PayOrderReducer.cart,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actionOpt: () => dispatch(getOpt()),
        addLoginUser: () => dispatch(addLoginUser()),
        actionClearCart: () => dispatch(actionClearCart()),
        clearPayment: (payload) => dispatch(clearPayment(payload)),
        getWidgetClear: () => dispatch(getWidgetClear()),
        actionClearDataOrder: () => dispatch(clearOrderData()),
        unlockGas: (payload) => dispatch(unlockGas(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
