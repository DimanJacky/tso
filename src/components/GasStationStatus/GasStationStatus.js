import React, {Component} from "react";
import { connect } from "react-redux";
import { unlockGas } from "../../actions/actionsFuelPumps";
import './gasStationStatus.scss'

//Компонент визуализации колонки с выводом статуса колонки на АЗС
class GasStationStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusGas: "",
            returnUnlockGas: false
        }
    }

    componentDidMount() {
        this.statusGasStation();
        this.setState({
            statusGas: this.statusGasStation(),
            returnUnlockGas: true
        })
        //Если вернулись назад и колонку которую выбрали ранее нужно вывести из режима налива
        if (this.props.numberSelectGas) {
            this.props.unlockGas(this.props.numberSelectGas)
        }
    }

    componentWillUnmount() {
        this.setState({
            returnUnlockGas: false
        })
    }

    statusGasStation() {
        let status;
        if (this.props.gasStationStatus) {
            switch(this.props.gasStationStatus) {
                case 'Idle':
                    status = "Свободно"
                    break;
                case 'Calling':
                    status = "Свободно"
                    break;
                case 'Authorised':
                    status = "Занята"
                    break;
                case 'Started':
                    status = "Занята"
                    break;
                case 'Started_susp':
                    status = "Занята"
                    break;
                case 'Fuelling':
                    status = "Занята"
                    break;
                case 'Fuelling_susp':
                    status = "Занята"
                    break;
                case 'Inoperative':
                    status = "Не работает"
                    break;
                case 'Close':
                    status = "Не работает"
                    break;
                case 'Non_reachable':
                    status = "Не работает"
                    break;
                case 'Error - 255':
                    status = "Не работает"
                    break;
                case 'Error - 254/253':
                    status = "Не работает"
                    break;
                default:
                    status = "Не работает"
            }
        }
        return status;
    }

    render() {
        return (
            <div className={this.state.statusGas === "Свободно" ? "gasStation-item__wrapper freeGas" : "gasStation-item__wrapper"}>
                <div className="gasStation-item__number-wrapper">
                    <p className="gasStation-item__number">{this.props.numberGasStation}</p>
                </div>
                <div className="gasStation-item__status-wrapper">
                    <p className="gasStation-item__status">{this.state.statusGas}</p>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        numberSelectGas: state.FuelPumpsReducer.numberSelectGas
    }
}

function mapDispatchToProps(dispatch) {
    return {
        unlockGas: (payload) => dispatch(unlockGas(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GasStationStatus);