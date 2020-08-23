import React, {Component} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import FormDataCheck from "../Forms/FormDataCheck/FormDataCheck";
import "./checkData.scss";

//Компонент Для ввода данных для получения чека
class CheckData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            typePay: "BANK"
        }
    }

    componentDidMount() {
        console.log(this.props.paramsGasFuel)
    }

    handlerDismiss = () => {
        console.log('handlerDismiss')
    }

    handlerSubmit = () => {
        console.log('handlerSubmit')
    }

    render() {
        return(
            <div className="checkData__wrapper">
                <h3 className="checkData__title">Введите данные для получения электронной копии чека</h3>
                <FormDataCheck/>
                <div className="checkData__btn-wrapper">
                    <Link to={`/stationPage/quantityFuel/${this.props.paramsGasFuel.numberGasParams}/${this.props.paramsGasFuel.numberFuelParams}/${this.props.paramsGasFuel.idGradesFuel}/${this.state.typePay}`}
                          className="waves-effect waves-light btn btn-dismiss"
                          onClick={this.handlerDismiss}
                    >
                        Пропустить
                    </Link>
                    <Link to={`/stationPage/quantityFuel/${this.props.paramsGasFuel.numberGasParams}/${this.props.paramsGasFuel.numberFuelParams}/${this.props.paramsGasFuel.idGradesFuel}/${this.state.typePay}`}
                          className="waves-effect waves-light btn btn-submit"
                          onClick={this.handlerSubmit}
                    >
                        Отправить
                    </Link>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        paramsGasFuel: state.SelectFuelReducer.paramsGasFuel,
    }
}

export default connect(mapStateToProps, null)(CheckData);