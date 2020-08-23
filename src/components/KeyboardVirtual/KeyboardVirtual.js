import React, {useRef, useState} from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./keyboardVirtual.scss"

function KeyboardVirtual(props) {
    const [inputs, setInputs] = useState({});
    const [layoutName, setLayoutName] = useState('default');
    const [inputName, setInputName] = useState("default");
    const keyboard = useRef();

    //Клик по каждой кнопке клавиатуры
    const onChangeAll = inputs => {
        setInputs({...inputs});
        // console.log("Inputs changed", inputs);

        //Так как данная клавиатру нужна во многих компонентах (передаем параметр имя компонента где используем клавиатуру)
        if (props.activeComponent === "informationPage") {
            //Вызов функции которая получит данные введенные в поле Логин и Пароль
            props.changeLogin(inputs.login, inputs.password);
        }
        if (props.activeComponent === "quantityFuel") {
            //Вызов функции которая получит данные введенные в поле Сумма и Литры
            props.selectLitres(inputs.sum, inputs.litres)
        }
        if (props.activeComponent === "formCardLoyalties") {
            //Вызов функции которая получит данные введенные в поле Номер карты лояльности
            props.getNumberCard(inputs.numberCard)
        }
        if (props.activeComponent === "formDataCheck") {
            //Вызов функции которая получит данные введенные в поле Телефон и Email
            props.getContact(inputs.phone, inputs.email)
        }
        if (props.activeComponent === "formDeductingPoints") {
            //Вызов функции которая получит данные введенные в поле Сумма баллов к списанию (карта Лояльности)
            props.getPointDeducting (inputs.deductingPoints)
        }
        if (props.activeComponent === "formRequisitesCheck") {
            //Вызов функции которая получит данные Id чека для возврата
            props.getIdCheck (inputs.idCheck)
        }

    };

    const handleShift = () => {
        const newLayoutName = layoutName === "default" ? "shift" : "default";
        setLayoutName(newLayoutName);
    };

    const onKeyPress = button => {
        // console.log("Button pressed", button);
        if (button === "{shift}" || button === "{lock}") handleShift();
    };

    const onChangeInput = event => {
        const inputVal = event.target.value;
        setInputs({
            ...inputs,
            [inputName]: inputVal
        });
        keyboard.current.setInput(inputVal);
    };

    const getInputValue = inputName => {
        return inputs[inputName] || "";
    };

    //Функция отрисовыает форму исходя в каком компоненте используем клавиатура
    function renderForm() {
        let inputNameOne; //Имя первого input
        let inputNameTwo; //Имя второго input
        let changeInputOne; //Имя первого input
        let changeInputTwo; //Имя второго input
        let disabled;
        let actionValueOne; //Функция которая сработает при изменение  первого input
        let actionValueTwo;  //Функция которая сработает при изменение  второго input
        let formType; //Передаем сколько нужно input в зависимости от компонента

        //Если клавиатура используется в компоненте informationPage (авторизация пользователя)
        if (props.activeComponent === "informationPage") {
            inputNameOne = "Логин"
            inputNameTwo = "Пароль"
            changeInputOne = "login"
            changeInputTwo = "password"
            disabled = props.authUser
            formType = props.type
            actionValueOne = getInputValue(changeInputOne)
            actionValueTwo = getInputValue(changeInputTwo)
        }
        //Если клавиатура используется в компоненте QuantityFuel (выбор количества топлива)
        if (props.activeComponent === "quantityFuel") {
            inputNameOne = "Сумма"
            inputNameTwo = "Литры"
            changeInputOne = "sum"
            changeInputTwo = "litres"
            formType = props.type
            actionValueOne = props.totalPrice
            actionValueTwo = props.totalLitres
        }
        //Если клавиатура используется в компоненте FormCardLoyalties
        if (props.activeComponent === "formCardLoyalties") {
            changeInputOne = "numberCard"
            formType = props.type
            actionValueOne = getInputValue(changeInputOne)
        }
        //Если клавиатура используется в компоненте FormDataCheck
        if (props.activeComponent === "formDataCheck") {
            inputNameOne = "Телефон"
            inputNameTwo = "E-mail"
            changeInputOne = "phone"
            changeInputTwo = "email"
            formType = props.type
            actionValueOne = getInputValue(changeInputOne)
            actionValueTwo = getInputValue(changeInputTwo)
        }
        //Если клавиатура используется в компоненте FormDeductingPoints (карта Лояльности списание баллов)
        if (props.activeComponent === "formDeductingPoints") {
            inputNameOne = "Сумма баллов к списанию"
            changeInputOne = "deductingPoints"
            formType = props.type
            actionValueOne = getInputValue(changeInputOne)
        }
        //Если клавиатура используется в компоненте FormRequisitesCheck (возврат по чеку)
        if (props.activeComponent === "formRequisitesCheck") {
            inputNameOne = "ID-чека"
            changeInputOne = "idCheck"
            formType = props.type
            actionValueOne = getInputValue(changeInputOne)
        }

        //Так как есть компоненты где нужна клавиатура с одинм input, а иногда с двумя input
        function renderForm() {
            if (formType === "OneInput") {
                return (
                    <form className="col s12" autoComplete="off">
                        <div className="row">
                            <div className="input-keyboard col s12">
                                <label htmlFor={changeInputOne}>{inputNameOne}</label>
                                <input id={changeInputOne}
                                       type="text"
                                       className="validate"
                                       value={actionValueOne || ''}
                                       onFocus={() => setInputName(changeInputOne)}
                                       onChange={onChangeInput}
                                       autoComplete="off"
                                       disabled={disabled}
                                />
                            </div>
                        </div>
                    </form>
                )
            }
            if (formType === "TwoInput") {
                return (
                    <form className="col s12" autoComplete="off">
                        <div className="row">
                            <div className="input-keyboard col s12">
                                <label htmlFor={changeInputOne}>{inputNameOne}</label>
                                <input id={changeInputOne}
                                       type="text"
                                       className="validate"
                                       value={actionValueOne || ''}
                                       onFocus={() => setInputName(changeInputOne)}
                                       onChange={onChangeInput}
                                       autoComplete="off"
                                       disabled={disabled}
                                />
                            </div>
                            <div className="input-keyboard col s12">
                                <label htmlFor={changeInputTwo}>{inputNameTwo}</label>
                                <input id={changeInputTwo}
                                       type="text"
                                       className="validate"
                                       value={actionValueTwo || ''}
                                       onFocus={() => setInputName(changeInputTwo)}
                                       onChange={onChangeInput}
                                       autoComplete="off"
                                       disabled={disabled}
                                />
                            </div>
                        </div>
                    </form>
                )
            }
        }
        return (
            renderForm()
        )
    }

    //Функция которая отрисовывает виртульную клавиатру
    function renderKeyboard() {
        let keyboardType; //Тип клавиатуры полная или только цифры
        let keyboardBtnClass; //Какой класс применить к кнопкам

        if (props.keyboardType === "full") {
            keyboardBtnClass = "buttons-all";
            keyboardType = {
                'default': [
                    '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
                    'q w e r t y u i o p [ ] \\',
                    '{lock} a s d f g h j k l ; \'',
                    '{shift} z x c v b n m , . / {shift}',
                    '.com .ru @ {space}'
                ],
                'shift': [
                    '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
                    'Q W E R T Y U I O P { } |',
                    '{lock} A S D F G H J K L : "',
                    '{shift} Z X C V B N M < > ? {shift}',
                    '.com .ru @ {space}'
                ]
            }
        }
        if (props.keyboardType === "number") {
            keyboardBtnClass = "buttons-numbers";
            keyboardType = { 'default' : ["1 2 3 4 5 6 7 8 9 0 {bksp}"]}
        }
        return (
            <Keyboard
                keyboardRef={r => (keyboard.current = r)}
                inputName={inputName}
                layoutName={layoutName}
                onChangeAll={onChangeAll}
                onKeyPress={onKeyPress}
                //Здесь переименовываем кнопки
                display={{
                    '{bksp}': '<<',
                    '{shift}': 'Shift',
                    '{lock}': 'Caps',
                    '{space}': ' '
                }}
                buttonTheme={[
                    {
                        class: keyboardBtnClass,
                        buttons: "1 2 3 4 5 6 7 8 9 0 {bksp}"
                    },
                    {
                        class: "btn-dot-ru",
                        buttons: ".ru"
                    }
                ]}
                //Здесь указываем какие кнопки могут быть в клавиатруре (https://hodgef.com/simple-keyboard/documentation/options/layout/)
                layout={
                    keyboardType
                }
            />
        )
    }

    return (
        <div className="keyboardVirtual">
            <div className="row">
                {renderForm()}
            </div>
            <div className="keyboard-wrapper">
                {renderKeyboard()}
            </div>
        </div>
    );
}

export default KeyboardVirtual
