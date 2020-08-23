import React, {Component} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getFuelPumps } from "../../actions/actionsFuelPumps";
import { stageActive } from "../../actions/actionsStageProgress"
import Preloader from "../Preloader/Preloader";
import GasStationStatus from "../GasStationStatus/GasStationStatus";
import "./gasSelect.scss"

//Компонент вывода всех доступных колонок на АЗС
class GasSelect extends Component {
    componentDidMount() {
        this.props.actionGetFuelPumps(true);
        this.props.actionStageActive("selectGas", true)
    }

    //Рендер всех колонок на АЗС со статусами
    renderGasStation() {
        if (this.props.FuelPumps.pumps) {
            return (
                this.props.FuelPumps.pumps.map((item, index) => {
                    return (
                        <Link to={`/stationPage/gasFuelSelect/${item.number}`} className="gasSelect__link-wrapper" key={index}>
                            <GasStationStatus key={item.number} numberGasStation={item.number} gasStationStatus={item.status}/>
                        </Link>
                    )
                })

            )
        } else {
            return (
                <div className="gasSelect__error">
                    <p>Сервис недоступен</p>
                </div>
            )
        }
    }

    //Рендер всего компонента
    renderStationPage() {
        if (this.props.FuelPumps.pumps) {
            return (
                <>
                    <div className="gasSelect__gasStation-wrapper">
                        <ul className="gasSelect__gasStation-list">
                            {this.renderGasStation()}
                        </ul>
                    </div>
                </>
            )
        } else {
            return <Preloader/>
        }
    }

    render() {
        return (
            <div className="gasSelect__wrapper">
                {this.renderStationPage()}
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        FuelPumps: state.FuelPumpsReducer.fuelPumps,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actionGetFuelPumps: (payload) => dispatch(getFuelPumps(payload)),
        actionStageActive: (nameStage, payload) => dispatch(stageActive(nameStage, payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GasSelect)