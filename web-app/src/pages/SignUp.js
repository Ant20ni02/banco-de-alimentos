import React, { useRef, useId, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUp.css';
import '../styles/scrollbar.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faLock, faCircleCheck, faTimesCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

function SignUp() {
    const form = useRef();
    const id = useId();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const firstName = form.current.firstName.value;
        const lastName = form.current.lastName.value;
        const age = form.current.age.value;
        const email = form.current.email.value;
        const phoneNumber = form.current.phoneNumber.value;
        const sex = form.current.sex.value;
        const password = form.current.password.value;
        const passwordConfirm = form.current.passwordConfirm.value;

        if (password === passwordConfirm) {
            let formData = JSON.stringify({ firstName: firstName, lastName: lastName, phoneNumber: phoneNumber, sex: sex, age: age, email: email, password_: password, userType: 'Admin'});
            const response = await fetch('http://localhost:4000/signup',{ method: 'POST',headers: {
            'Content-Type': 'application/json',
            }, body: formData});
            const data = await response.json();
            if(data.mensaje === 'Usuario insertado correctamente'){
                navigate('/login', { replace: true });
            } else if(data.mensaje === "El usuario ya se encuentra registrado"){
                alert('El usuario ya se encuentra registrado');
            } else{
                alert('Error al registrarse');
            }
        } else {
            alert('Las contraseñas no coinciden');
        }
    }

    const [show, setShow] = useState(false);

    const passwordValidation = (e) => {
        e.preventDefault();
        const password = form.current.password.value;
        const passwordConfirm = form.current.passwordConfirm.value; 

        if (password !== passwordConfirm) {
            setShow(true);
        } else if (password === passwordConfirm) {
            setShow(false);
        } else {
            setShow(false);
        }
    }
    return (
        <>
            <h1 className="form-header">Registrarse</h1>
            <div className="grid">
                <form className="form" ref={form} onSubmit={handleSubmit}>

                    <fieldset className="form-group">
                        <label className="form-label" htmlFor={`${id}-firstName`}>
                            <FontAwesomeIcon icon={faUser} className="form-icon"/>
                        </label>
                        <div className="form-input">
                            <input className="input-signup" id={`${id}-firstName`} name="firstName" placeholder="Nombres" pattern="/^[a-zA-ZÀ-ÿ\s]{1,40}$/" autoComplete autoFocus required/>
                            <FontAwesomeIcon className="form-validation-status-success" icon={faCircleCheck} />
                            <FontAwesomeIcon className="form-validation-status-error" icon={faTimesCircle} />
                        </div>

                        <span className="form-input-error">El nombre solo puede contener<br/> letras.</span>
                    </fieldset>

                    <fieldset className="form-group" id={`${id}-formGroupLastName`}>
                        <label className="form-label" htmlFor={`${id}-lastName`}>
                            <FontAwesomeIcon icon={faUser} className="form-icon"/>
                        </label>
                        <div className="form-input">
                            <input className="input-signup" id={`${id}-lastName`} name="lastName" placeholder="Apellidos" pattern="/^[a-zA-ZÀ-ÿ\s]{1,40}$/" autoComplete required/>
                            <FontAwesomeIcon className="form-validation-status-success" icon={faCircleCheck} />
                            <FontAwesomeIcon className="form-validation-status-error" icon={faTimesCircle} />
                        </div>

                        <span className="form-input-error">El apellido solo puede contener<br/> letras.</span>
                    </fieldset>

                    <fieldset className="form-group" id={`${id}-formGroupAge`}>
                        <label className="form-label" htmlFor={`${id}-age`}>
                            {/* Edad */}
                            <FontAwesomeIcon icon={faUser} className="form-icon"/>
                        </label>
                        <div className="form-input">
                            <input className="input-signup" id={`${id}-age`} name="age" placeholder="Edad" maxLength="2" pattern="/^\d{7,14}$/" required/>
                            <FontAwesomeIcon className="form-validation-status-success" icon={faCircleCheck} />
                            <FontAwesomeIcon className="form-validation-status-error" icon={faTimesCircle} />
                        </div>

                        <span className="form-input-error">La edad solo puede contener<br/> números.</span>
                    </fieldset>

                    {/* <input type="number" name="age" size="2" min="1" max="100" data-maxlength="2" pattern="[0-9]{1,100}" onInput={this.value=this.value.slice(0,this.dataset.maxlength);} onInvalid={e => e.target.setCustomValidity('Ingrese una edad valida')} required/> */}

                    <fieldset className="form-group" id={`${id}-formGroupEmail`}>
                        <label className="form-label" htmlFor={`${id}-email`}>
                            {/* Correo electrónico */}
                            <FontAwesomeIcon icon={faEnvelope} className="form-icon"/>
                        </label>
                        <div className="form-input">
                            <input type="email" className="input-signup" id={`${id}-email`} name="email" placeholder="Correo electrónico" pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?" /* onInvalid={e => e.target.setCustomValidity('Ingrese un correo e')} */ autoComplete required/>
                            <FontAwesomeIcon className="form-validation-status-success" icon={faCircleCheck} />
                            <FontAwesomeIcon className="form-validation-status-error" icon={faTimesCircle} />
                        </div>

                        <span className="form-input-error">El correo institucional solo puede <br/>contener letras, números, puntos,<br/> guiones y guión bajo.</span>
                    </fieldset>

                    <fieldset className="form-group" id={`${id}-formGroupPhoneNumber`}>
                        <label className="form-label" htmlFor={`${id}-phoneNumber`}>
                            {/* Número de teléfono */}
                            <FontAwesomeIcon icon={faPhone} className="form-icon"/>
                        </label>
                        <div className="form-input">
                            <input type="tel" className="input-signup" id={`${id}-phoneNumber`} name="phoneNumber" placeholder="Número de teléfono" maxLength="10" pattern="[0-9]{10}" onInvalid={e => e.target.setCustomValidity('Ingrese un número de teléfono válido')} autoComplete required/>
                            <FontAwesomeIcon className="form-validation-status-success" icon={faCircleCheck} />
                            <FontAwesomeIcon className="form-validation-status-error" icon={faTimesCircle} />
                        </div>

                        <span className="form-input-error">El número de teléfono <br/> solo puede contener números <br/> y máximo 10 digitos.</span>
                    </fieldset>

                    {/* Identity */}
                    <select name="sex" required>
                        <option selected disabled hidden>Identidad de género</option>
                        <option value="m">Masculino</option>
                        <option value="f">Femenino</option>
                        <option value="o">No especificar</option>
                    </select>

                    <fieldset className="form-group" id={`${id}-formGroupPassword`}>
                        <label className="form-label" htmlFor={`${id}-password`}>
                            {/* Contraseña */}
                            <FontAwesomeIcon icon={faLock} className="form-icon"/>
                        </label>
                        <div className="form-input">
                            <input type="password" className="input-signup" id={`${id}-password`} name="password" placeholder="Contraseña" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$" onInvalid={e => e.target.setCustomValidity('Ingrese una contraseña valida')} onPaste={(e) => {e.preventDefault(); return false;}} onCopy={(e) => {e.preventDefault(); return false;}} /* onSelectStart={(e) => {e.preventDefault(); return false;}} */ autoComplete required/>
                            <FontAwesomeIcon className="form-validation-status-success" icon={faCircleCheck} />
                            <FontAwesomeIcon className="form-validation-status-error" icon={faTimesCircle} />
                        </div>

                        <span className="form-input-error">La contraseña tiene que ser de<br/> 4 a 12 dígitos.</span>
                    </fieldset>
                    
                    <fieldset className="form-group" id={`${id}-formGroupPasswordConfirm`}>
                        <label className="form-label" htmlFor={`${id}-passwordConfirm`}>
                            {/* Confirmar contraseña */}
                            <FontAwesomeIcon icon={faLock} className="form-icon"/>
                        </label>
                        <div className="form-input">
                            <input type="password" className="input-signup" id={`${id}-passwordConfirm`} name="passwordConfirm" placeholder="Confirmar contraseña" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$" onInvalid={e => e.target.setCustomValidity('Confirme correctamente su contraseña valida')} onPaste={(e) => {e.preventDefault(); return false;}} onKeyUp={passwordValidation} autoComplete required/>
                            <FontAwesomeIcon className="form-validation-status-success" icon={faCircleCheck} />
                            <FontAwesomeIcon className="form-validation-status-error" icon={faTimesCircle} />
                        </div>
                        {
                            show && <span className="form-input-error-useState">Las contraseñas no coinciden.</span>
                        }
                    </fieldset>
                    
                    <hr/>

                    <footer className="form-footer">
                        <div className="form-group" id={`${id}-formGroupTermsAndConditions`}>
                            <label className="form-label">
                                <input className="form-checkbox" type="checkbox" id={`${id}-termsAndConditions`} name="termsAndConditions" required/>Acepto los <a href="#">términos y condiciones</a>.
                            </label>
                            <FontAwesomeIcon className="form-validation-status-error" icon={faTimesCircle} />
                            <span className="form-input-error">Debe aceptar los términos y condiciones.</span>
                        </div>

                        <div id={`${id}-formGroupPrivacyPolicy`}>
                            <label className="form-label">
                                <input className="form-checkbox" type="checkbox" id={`${id}-privacyPolicy`} name="privacyPolicy" required/>Acepto la <a href="#">política de privacidad</a>.
                            </label>
                            <FontAwesomeIcon className="form-validation-status-error" icon={faTimesCircle} />
                            <span className="form-input-error">Debe aceptar la política de privacidad.</span>
                        </div>

                        <div className="form-invalid-submit-message" id={`${id}-formInvalidSubmitMessage`}>
                            <FontAwesomeIcon icon={faExclamationTriangle} />
                            <span> <b>Error:</b> Por favor, revise los campos marcados en rojo.</span>
                        </div>

                        <button className="form-btn-submit" type="submit">Continuar</button>
                    </footer>                
                </form>
            </div>
        </>
    );
}

export default SignUp;