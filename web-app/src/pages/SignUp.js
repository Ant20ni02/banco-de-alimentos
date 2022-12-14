import '../styles/TextHeader.css';
import PortalModal from '../components/PortalModal';
import React, { useRef, useId, useState } from 'react';
import icon from '../images/icons/icon.png';
import signup from '../styles/SignUp.module.css';
import url from '../config/API';
import { faUser, faEnvelope, faPhone, faLock, faCircleCheck, faTimesCircle, faExclamationTriangle,  faVenusMars, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import useTabTitle from '../custom-hooks/useTabTitle';

function SignUp() {
    useTabTitle('BAMX - Registro');
    const form = useRef();
    const id = useId();
    const navigate = useNavigate();

    const [showModalCreatedUserSuccess, setShowModalCreatedUserSuccess] = useState(false);
    const [showModalCreatedUserEmailTakenError, setShowModalCreatedUserEmailTakenError] = useState(false);
    const [showModalUnknownError, setShowModalUnknownError] = useState(false);
    const [showModalInvalidPassword, setShowModalInvalidPassword] = useState(false);
    
    const [showInvalidInputPassword, setShowInvalidInputPassword] = useState(false);

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
            let formData = JSON.stringify({ firstName: firstName, lastName: lastName, phoneNumber: phoneNumber, sex: sex, age: age, email: email, password_: password,isActive: 1, userType: 'Admin'});
            const response = await fetch(url+'signup',{ method: 'POST',headers: {
            'Content-Type': 'application/json',
            }, body: formData});
            const data = await response.json();
            if(data.mensaje === 'Usuario insertado correctamente'){
                setShowModalCreatedUserSuccess(true);
                setTimeout(() => {
                    navigate('/inicio-de-sesion', { replace: true });
                }, 4000);
            } else if(data.mensaje === "El usuario ya se encuentra registrado"){
                setShowModalCreatedUserEmailTakenError(true);
            } else{
                setShowModalUnknownError(true);
            }
        } else {
            setShowModalInvalidPassword(true);
        }
    }

    const inputPasswordValidation = (e) => {
        e.preventDefault();
        const password = form.current.password.value;
        const passwordConfirm = form.current.passwordConfirm.value; 

        if (password !== passwordConfirm) {
            setShowInvalidInputPassword(true);
        } else if (password === passwordConfirm) {
            setShowInvalidInputPassword(false);
        }
    }

    /* const [name, setName] = useState('');
 
    const validName = e => {
        const { value } = e.target;
        const regex = /^[A-Z][a-z]*\s?[A-Z]*[a-z]*$/;
        if (value === "" || regex.test(value)) {
            setName(value);
        }
    } */

    /* const [age, setAge] = useState('');
 
    const validAge = (e) => {
        const { value } = e.target;
        const regex = /^[0-9]+$/;
        if (value === "" || regex.test(value)) {
            setAge(value);
        }
    } */

    return (
        <>
            <div className={signup.grid}>

                <header className={signup.formHeader}>
                    <h1>Reg??strate</h1>
                </header>

                <div className={signup.iconContainerSignup}>
                    <Link to="/"><img className={signup.iconSignup} src={icon} alt="Icon"/></Link>
                </div>
                
                <form className={signup.form} ref={form} onSubmit={handleSubmit}>
                    <fieldset className={signup.formGroup}>
                        <label className={signup.formLabel} htmlFor={`${id}-firstName`}>
                            <FontAwesomeIcon icon={faUser} />
                        </label>
                        <div className={signup.formInput}>
                            <input className={signup.inputSignup} id={`${id}-firstName`} name="firstName" placeholder="Nombres" title='Ingrese su nombre.' /* value={name}
        onChange={validName} */ pattern="^[A-Z][a-z]+(\s[A-Z][a-z]+)?$" onInvalid={e => e.target.setCustomValidity('Por favor, ingrese aqu?? el o los nombres suyos que sean v??lidos.')} /* size={16} */ minLength={3} maxLength={16} autoComplete autoFocus required/>
                            <FontAwesomeIcon className={signup.formValidationStatusSuccess} icon={faCircleCheck} />
                            <FontAwesomeIcon className={signup.formValidationStatusError} icon={faTimesCircle} />
                        </div>

                        <span className={signup.formInputError}>El o los nombres solo pueden <b>contener letras</b>, deben tener la <b>primera letra en may??scula</b> y estar <b>separados por un espacio en blanco</b> entre ellos{/* , tener por lo menos 3 letras de longitud y m??ximo 16 */}.</span>
                    </fieldset>

                    <fieldset className={signup.formGroup}>
                        <label className={signup.formLabel} htmlFor={`${id}-lastName`}>
                            <FontAwesomeIcon icon={faUser} />
                        </label>
                        <div className={signup.formInput}>
                            <input className={signup.inputSignup} id={`${id}-lastName`} name="lastName" placeholder="Apellidos" title='Ingrese sus apellidos.' onInvalid={e => e.target.setCustomValidity('Por favor, ingrese aqu?? sus apellidos v??lidos.')} pattern="^[A-Z][a-z]+(\s[A-Z][a-z]+)?$" /* size={32} */ minLength={3} maxLength={32} autoComplete required/>
                            <FontAwesomeIcon className={signup.formValidationStatusSuccess} icon={faCircleCheck} />
                            <FontAwesomeIcon className={signup.formValidationStatusError} icon={faTimesCircle} />
                        </div>

                        <span className={signup.formInputError}>El o los apellidos solo pueden <b>contener letras</b>, deben tener la <b>primera letra en may??scula</b> y estar <b>separados por un espacio en blanco</b> entre ellos{/* , tener por lo menos 3 letras de longitud y m??ximo 16 */}.</span>
                    </fieldset>

                    <fieldset className={signup.formGroup}>
                        <label className={signup.formLabel} htmlFor={`${id}-age`}>
                            {/* Edad */}
                            <FontAwesomeIcon icon={faCalendar} />
                        </label>
                        <div className={signup.formInput}>
                            <input className={signup.inputSignup} id={`${id}-age`} name="age" placeholder="Edad" title='Ingrese su edad.' /* value={age}
        onInput={validAge} */ onInvalid={e => e.target.setCustomValidity('Por favor, ingrese aqu?? su edad que sea v??lida.')} minLength={1} maxLength="2" pattern="^(1[89]|[2-9][0-9])$" required/>
                            <FontAwesomeIcon className={signup.formValidationStatusSuccess} icon={faCircleCheck} />
                            <FontAwesomeIcon className={signup.formValidationStatusError} icon={faTimesCircle} />
                        </div>

                        <span className={signup.formInputError}>La edad solo puede <b>contener n??meros positivos</b> y debe estar entre los 18 y 99 a??os.</span>
                    </fieldset>

                    {/* <input type="number" name="age" size="2" min="1" max="100" data-maxlength="2" pattern="[0-9]{1,100}" onInput={this.value=this.value.slice(0,this.dataset.maxlength);} onInvalid={e => e.target.setCustomValidity('Ingrese una edad valida')} required/> */}

                    <fieldset className={signup.formGroup}>
                        <label className={signup.formLabel} htmlFor={`${id}-email`}>
                            {/* Correo electr??nico */}
                            <FontAwesomeIcon icon={faEnvelope} />
                        </label>
                        <div className={signup.formInput}>
                            <input type="email" className={signup.inputSignup} id={`${id}-email`} name="email" placeholder="Correo electr??nico" title='Ingrese su correo electr??nico institucional.' onInvalid={e => e.target.setCustomValidity('Por favor, ingrese aqu?? un correo electr??nico institucional suyo v??lido.')} pattern="^[a-z0-9._-]+@bamorelos.org$" autoComplete required/>
                            <FontAwesomeIcon className={signup.formValidationStatusSuccess} icon={faCircleCheck} />
                            <FontAwesomeIcon className={signup.formValidationStatusError} icon={faTimesCircle} />
                        </div>

                        <span className={signup.formInputError}>El correo electr??nico institucional solo puede <b>contener letras, n??meros, puntos, guiones, gui??n bajo</b> y debe terminar en el dominio <b>'@bamorelos.org'</b>.</span>
                    </fieldset>

                    <fieldset className={signup.formGroup}>
                        <label className={signup.formLabel} htmlFor={`${id}-phoneNumber`}>
                            {/* N??mero de tel??fono */}
                            <FontAwesomeIcon icon={faPhone} />
                        </label>
                        <div className={signup.formInput}>
                            <input type="tel" className={signup.inputSignup} id={`${id}-phoneNumber`} name="phoneNumber" placeholder="N??mero de tel??fono" title='Ingrese su n??mero de tel??fono.' minLength={10} maxLength={10} pattern='^[0-9]+$' onInvalid={e => e.target.setCustomValidity('Por favor, ingrese aqu?? un n??mero de tel??fono suyo v??lido.')} autoComplete required/>
                            <FontAwesomeIcon className={signup.formValidationStatusSuccess} icon={faCircleCheck} />
                            <FontAwesomeIcon className={signup.formValidationStatusError} icon={faTimesCircle} />
                        </div>

                        <span className={signup.formInputError}>El n??mero de tel??fono solo puede <b>contener n??meros</b> y debe ser de <b>10 digitos</b>.</span>
                    </fieldset>

                    <fieldset className={signup.formGroup}>
                        <label className={signup.formLabel} htmlFor={`${id}-phoneNumber`}>
                            {/* Sexo*/}
                            <FontAwesomeIcon icon={faVenusMars} />
                        </label>
                        <select className={signup.sex} name="sex" title='Seleccione su sexo.' onInvalid={e => e.target.setCustomValidity('Por favor, seleccione aqu?? su sexo.')} required>
                            <option selected disabled hidden>Sexo</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </fieldset>
                        

                    <fieldset className={signup.formGroup} id={`${id}-formGroupPassword`}>
                        <label className={signup.formLabel} htmlFor={`${id}-password`}>
                            {/* Contrase??a */}
                            <FontAwesomeIcon icon={faLock} />
                        </label>
                        <div className={signup.formInput}>
                            <input type="password" className={signup.inputSignup} id={`${id}-password`} name="password" placeholder="Contrase??a" title='Ingrese su contrase??a.' minLength={8} maxLength={16} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$" onInvalid={e => e.target.setCustomValidity('Por favor, ingrese aqu?? una contrase??a valida')} onPaste={(e) => {e.preventDefault(); return false;}} onCopy={(e) => {e.preventDefault(); return false;}} /* onSelectStart={(e) => {e.preventDefault(); return false;}} */ autoComplete required/>
                            <FontAwesomeIcon className={signup.formValidationStatusSuccess} icon={faCircleCheck} />
                            <FontAwesomeIcon className={signup.formValidationStatusError} icon={faTimesCircle} />
                        </div>

                        <span className={signup.formInputError}>La contrase??a tiene que ser de entre <b>8 a 16 d??gitos</b>, debe contener <b>May??sculas, minisculas, simbolos y n??meros</b>.</span>
                    </fieldset>
                        
                    <fieldset className={signup.formGroup}>
                        <label className={signup.formLabel} htmlFor={`${id}-passwordConfirm`}>
                            {/* Confirmar contrase??a */}
                            <FontAwesomeIcon icon={faLock} />
                        </label>
                        <div className={signup.formInput}>
                            <input type="password" className={signup.inputSignup} id={`${id}-passwordConfirm`} name="passwordConfirm" placeholder="Confirmar contrase??a" title='Ingrese la confirmaci??n de su contrase??a.' pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$" onInvalid={e => e.target.setCustomValidity('Por favor, confirme aqu?? correctamente su contrase??a valida.')} onPaste={(e) => {e.preventDefault(); return false;}} onInput={inputPasswordValidation} autoComplete required/>
                            <FontAwesomeIcon className={signup.formValidationStatusSuccess} icon={faCircleCheck} />
                            <FontAwesomeIcon className={signup.formValidationStatusError} icon={faTimesCircle} />
                        </div>
                        {
                            showInvalidInputPassword &&
                            <span className={signup.formInputErrorUseState}>Las contrase??as no coinciden.</span>
                        }
                    </fieldset>

                    <fieldset className={signup.termsAndConditionsAndPrivacyPolicyFormGroup}>
                        <div>
                            <label className={signup.termsAndConditionsAndPrivacyPolicyLabel}>
                                <input type="checkbox" name="termsAndConditions" /* onInvalid={e => e.target.setCustomValidity('Por favor, acepte los t??rminos y condiciones.')} */ required/> Acepto los <Link to='/terminos-y-condiciones'>t??rminos y condiciones ???</Link>.
                            </label>
                            {/* <FontAwesomeIcon className={signup.formValidationStatusError} icon={faTimesCircle} />
                            <span className={signup.formInputError}>Debe aceptar los t??rminos y condiciones.</span> */}
                        </div>

                        <div>
                            <label className={signup.termsAndConditionsAndPrivacyPolicyLabel}>
                                <input type="checkbox" name="privacyPolicy" /* onInvalid={e => e.target.setCustomValidity('Por favor, acepete la po??tica de privacidad.')} */ required/>  Acepto la <Link to='/politica-de-privacidad'>pol??tica de privacidad ???</Link>.
                            </label>
                            {/* <FontAwesomeIcon className={signup.formValidationStatusError} icon={faTimesCircle} />
                            <span className={signup.formInputError}>Debe aceptar la pol??tica de privacidad.</span> */}
                        </div>
                    </fieldset>

                    <span className={signup.oldAccount}>Ya tienes cuenta?, inicia sesi??n <br/> <Link to="/inicio-de-sesion">aqu?? &gt;</Link>.</span>

                    <footer className={signup.formFooter}>
                        <div className={signup.formInvalidSubmitMessage} id={`${id}-formInvalidSubmitMessage`}>
                            <FontAwesomeIcon icon={faExclamationTriangle} />
                            <span> <b>Error:</b> Por favor, revise los campos marcados en rojo.</span>
                        </div>

                        <button className={signup.formBtnSubmit} type="submit">Continuar</button>
                    </footer>                
                </form>
            </div>

            <PortalModal onShow={showModalCreatedUserSuccess} onClose={() => setShowModalCreatedUserSuccess(false)} title="??Cuenta creada exitosamente!" > 
                <p><b>??Ya casi!</b>, a continuaci??n ser??s redirigiado para que <u>inicies sesi??n</u> con tu <b>cuenta nueva.</b></p>
            </PortalModal>

            <PortalModal onShow={showModalCreatedUserEmailTakenError} label="Error" onClose={() => setShowModalCreatedUserEmailTakenError(false)} title="??Usuario ya registrado!" >
                <p><b>??Lo sentimos!</b>, el correo el??ctronico ya est?? <u>registrado</u>, por favor <b>usa otro correo</b> e intenta de nuevo.</p>
            </PortalModal>

            <PortalModal onShow={showModalUnknownError} label="Error" onClose={() => setShowModalUnknownError(false)} title="??Ups, no se pudo crear tu cuenta!" >
                <p><b>??Lo sentimos!</b>, ha ocurrido un error al momento de <u>registarte</u>, por favor, <b>intenta de nuevo</b>.</p>
            </PortalModal>

            <PortalModal onShow={showModalInvalidPassword} label="Error" onClose={() => setShowModalInvalidPassword(false)} title="??Las contrase??as no coinciden!" > 
                <p>Por favor, <b>verifiqu??</b> que sus <u>contrase??as</u> <b>coincidan</b> e intenta de nuevo.</p>
            </PortalModal>
        </>
    );
}

export default SignUp;
