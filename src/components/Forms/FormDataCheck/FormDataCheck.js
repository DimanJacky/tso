import React, {Component} from "react";
import "./formDataCheck.scss"
import KeyboardVirtual from "../../KeyboardVirtual/KeyboardVirtual";

//Форма для указания контактов для отправки чека
class FormDataCheck extends Component {

    //Полуичм номер карты введенный пользователм
    getContact(phone, email) {
        console.log(phone);
        console.log(email);
    }

    render() {
        return(
            <div className="formDataCheck__wrapper">
                <div className="row">
                    <KeyboardVirtual
                        activeComponent="formDataCheck"
                        getContact={(phone, email) => this.getContact(phone, email)}
                        type="TwoInput"
                        keyboardType="full"
                    />
                </div>
            </div>
        )
    }
}

export default FormDataCheck;