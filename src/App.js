import React, {Component} from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import './scss/app.scss';
//Components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePages from "./components/Pages/HomePage/HomePage";
import StationPage from "./components/Pages/StationPage/StationPage";
import ReturnPage from "./components/Pages/ReturnPage/ReturnPage";
import InformationPage from "./components/Pages/InformationPage/InformationPage";

class App extends Component {
    render() {
        const { history } = this.props
        return (
            <div className="App">
                <Header/>
                <div className="content">
                    <Switch>
                        <Route history={history}  path="/" component={HomePages} exact />
                        <Route history={history}  path="/returnPage" component={ReturnPage} />
                        <Route history={history}  path="/informationPage" component={InformationPage} exact />
                        <Route history={history}  path="/stationPage" component={StationPage} />
                        <Redirect to="/"/>
                    </Switch>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(App)
