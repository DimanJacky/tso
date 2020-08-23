import React, {Component} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {getParamsGasFuel} from "../../actions/actionsSelectFuel";
import "./selectTypePay.scss"

//Компонент выбора способа оплаты
class SelectTypePay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fuelCard: false,
            bankCard: false,
            cash: false,
            fuelCardDisabled: false,
            bankCardDisabled: false,
            cashDisabled: false,
            typePay: "FLEET"
        }
    }

    componentDidMount() {
        const {idGas} = this.props.match.params; //id выбранной колонки
        const {numberPistol} = this.props.match.params; //Получим id выбраного топлива из url
        const {idGradePistol} = this.props.match.params; //Получим id выбраного топлива из url
        this.props.getParamsGasFuel(idGas, numberPistol, idGradePistol);

        if (this.props.statusDevice) {
            this.checkedDeviceStatus();
        }
    }

    checkedDeviceStatus() {
        for (let i = 0; i < this.props.statusDevice.length; i++) {
            if (this.props.statusDevice[i].type === "CASH" && this.props.statusDevice[i].isEnable === false) {
                this.setState({
                    cashDisabled: true
                })
            }
            if (this.props.statusDevice[i].type === "FLEET" && this.props.statusDevice[i].isEnable === false) {
                this.setState({
                    fuelCardDisabled: true
                })
            }
            if (this.props.statusDevice[i].type === "BANK" && this.props.statusDevice[i].isEnable === false) {
                console.log('BANK')
                this.setState({
                    bankCardDisabled: true
                })
            }
        }
    }

    handlerBankCard = () => {
        console.log('handlerBankCard')
    }

    handlerCash = () => {

    }

    render() {
        return (
            //Рабочий код с валидацией
            <div className="selectTypePay__wrapper">
  {/*              <div className={this.state.fuelCard ? 'selectTypePay__section no-visible' : 'selectTypePay__section'}>
                    <h3 className="selectTypePay__title">Выбирите тип оплаты</h3>
                    <button onClick={this.handlerBankCard} className="waves-effect waves-light btn btn-bank-card" disabled={this.state.bankCardDisabled}>
                        <Link to={`/stationPage/checkDat`} className="selectTypePay__link">
                            Банковская карта
                        </Link>
                        <span className={this.state.cashDisabled ? "selectTypePay__error-device isVisible" : "selectTypePay__error-device"}>Невозможно</span>
                    </button>
                    <button onClick={this.handlerFuelCard} className="waves-effect waves-light btn btn-fuel-card" disabled={this.state.fuelCardDisabled}>
                        <Link
                            className="selectTypePay__link"
                            to={`/stationPage/quantityFuel/${this.props.paramsGasFuel.numberGasParams}/${this.props.paramsGasFuel.numberFuelParams}/${this.props.paramsGasFuel.idGradesFuel}/${this.state.typePay}`}>
                            Топливная карта
                        </Link>
                        <span className={this.state.cashDisabled ? "selectTypePay__error-device isVisible" : "selectTypePay__error-device"}>Невозможно</span>
                    </button>
                    <button onClick={this.handlerCash} className="waves-effect waves-light btn btn-cash" disabled={this.state.cashDisabled}>
                        Наличными
                        <span className={this.state.cashDisabled ? "selectTypePay__error-device isVisible" : "selectTypePay__error-device"}>Невозможно</span>
                    </button>
                </div>*/}
           {/*     Временно*/}
                <div className={this.state.fuelCard ? 'selectTypePay__section no-visible' : 'selectTypePay__section'}>
                    <h3 className="selectTypePay__title">Выбирите тип оплаты</h3>
                    <button onClick={this.handlerBankCard} className="waves-effect waves-light btn btn-bank-card">
                        <Link to={`/stationPage/checkDat`} className="selectTypePay__link">
                            Банковская карта
                        </Link>
                        <span className={this.state.cashDisabled ? "selectTypePay__error-device isVisible" : "selectTypePay__error-device"}>Невозможно</span>
                    </button>
                    <button onClick={this.handlerFuelCard} className="waves-effect waves-light btn btn-fuel-card">
                        <Link
                            className="selectTypePay__link"
                            to={`/stationPage/quantityFuel/${this.props.paramsGasFuel.numberGasParams}/${this.props.paramsGasFuel.numberFuelParams}/${this.props.paramsGasFuel.idGradesFuel}/${this.state.typePay}`}>
                            Топливная карта
                        </Link>
                        <span className={this.state.cashDisabled ? "selectTypePay__error-device isVisible" : "selectTypePay__error-device"}>Невозможно</span>
                    </button>
                    <button onClick={this.handlerCash} className="waves-effect waves-light btn btn-cash">
                        Наличными
                        <span className={this.state.cashDisabled ? "selectTypePay__error-device isVisible" : "selectTypePay__error-device"}>Невозможно</span>
                    </button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        statusDevice: state.StatusDeviceReducer.statusDevice,
        paramsGasFuel: state.SelectFuelReducer.paramsGasFuel,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getParamsGasFuel: (numberGas, numberFuel, idGradePistol) => dispatch(getParamsGasFuel(numberGas, numberFuel, idGradePistol)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectTypePay);