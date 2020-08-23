import React, {Component} from "react";
import { Link } from "react-router-dom";
import Clock from "../Clock/Clock";
import './header.scss'

class Header extends Component{


    render() {
        return (
            <div className="header__wrapper">
                <Clock/>
                <div className="header__release-application">
                    <p>( 26/05/2020 [1] )</p>
                </div>
                <div className="header__logo-wrapper">
                    <img src='images/logo.svg' alt="trk" className="header__logo"/>
                    <Link to="/">
                        <h2 className="header__logo-text">БАШНЕФТЬ</h2>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Header
