import React, {Component} from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import KeyboardVirtual from "../../KeyboardVirtual/KeyboardVirtual";
import { getLoyaltyCard } from "../../../actions/actionsCardLoyalties";
import "./formCardLoyalties.scss";

//Фррма для ввода данных карты Лояльности
class FormCardLoyalties extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authorizationCard: false
        }
    }

    componentDidMount() {
        this.setState({
            authorizationCard: false
        })
    }

    //Полуичм номер карты введенный пользователм
    getNumberCard(numberCard) {
        console.log(numberCard)
    }

    handlerAuthorization = () => {
        this.setState({
            authorizationCard: true
        })
        this.props.getLoyaltyCard(this.props.widgetId.id)
    }

    render() {
        if (this.state.authorizationCard) {
            return <Redirect to="/stationPage/deductingPoints/"/>
        }
        return (
            <div className="formCardLoyalties__wrapper">
                <div className="formCardLoyalties__title">
                    Приготовьте бонусную карту
                </div>
                <div className="formCardLoyalties__img-wrapper">
                    <div className="formCardLoyalties__info tryCard">
                        <p>Если у Вас физическая карта, <br/> следуйте инструкции на ПИН-паде</p>
                    </div>
                    <div className="formCardLoyalties__info virtualCard">
                        <p>Если у Вас виртуальная карта, <br/> отсканируйте шрих-код</p>
                    </div>
                </div>
                <div className="row">
                    <div className="formCardLoyalties__keyboard-label">
                        Или введите номер виртуальной карты
                    </div>
                    <div className="formCardLoyalties__keyboard-wrapper">
                        <KeyboardVirtual
                            activeComponent="formCardLoyalties"
                            getNumberCard={(numberCard) => this.getNumberCard(numberCard)}
                            type="OneInput"
                            keyboardType="number"
                        />
                    </div>
                </div>
                <div className="formCardLoyalties__btn-wrapper">
                    <buttonb
                        className="waves-effect waves-light btn #45b667 formCardLoyalties__btnNext"
                        onClick={this.handlerAuthorization}
                    >
                        Авторизовать
                    </buttonb>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        widgetId: state.PayOrderReducer.widgetId
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getLoyaltyCard: (widgetId) => (dispatch(getLoyaltyCard(widgetId)))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormCardLoyalties);