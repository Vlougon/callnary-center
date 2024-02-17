import { useContext, useState } from 'react';
import { FormContext } from '../../context/FormContext';
import TextInput from '../inputs/TextInput';
import PasswordInput from '../inputs/PasswordInput';
import PhoneNumberInput from '../inputs/PhoneNumberInput';

export default function AssistantPersonalDataFieldSet({ passwordConfirmation, setPasswordConfirmation, disabledInput = false }) {
    const { assistantData, handleAssistantData } = useContext(FormContext);

    const handlePasswordConfirmation = (element) => {
        setPasswordConfirmation(element.target.value);
    };

    const handleAssistantInputs = (element) => {
        element.target.className = 'form-control';
        element.target.previousElementSibling.className = 'input-group-text';
        element.target.nextElementSibling.className = 'invalid-feedback';
    };

    return (
        <fieldset>
            <legend>Datos Personales</legend>
            <div className='row g-3'>

                <TextInput nameID={'name'} sublimText={'Nombre Completo'} formUsed={'assistant'}
                    boxLength={'col-md-4'} needFeedback={true}
                />

                <div className='col-md-4'>
                    <label htmlFor="email" className="form-label">Email:</label>
                    <div className='input-group has-validation'>
                        <span className='input-group-text' id='assistantEmail'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"></path>
                            </svg>
                        </span>
                        <input type="email" id='email' name='email' value={assistantData['email']} className='form-control'
                            placeholder='ejemplo@gmail.com' aria-describedby='assistantEmail' autoComplete='off'
                            onClick={handleAssistantInputs} onChange={handleAssistantData} disabled={disabledInput}
                        />
                        <div className="invalid-feedback">
                            ¡Es Necesario Proporcionar un Email!
                        </div>
                    </div>
                </div>

                <div className='col-md-4'>
                    <label htmlFor="role" className="form-label">Rol:</label>
                    <div className='input-group has-validation'>
                        <span className='input-group-text' id='rol'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"></path>
                            </svg>
                        </span>
                        <select aria-label='role' id='role' name='role' value={assistantData['role']} className="form-select"
                            aria-describedby='rol' onClick={handleAssistantInputs} onChange={handleAssistantData}
                        >
                            <option>Rol</option>
                            <option value="supervisor">Supervisor/a</option>
                            <option value="assistant">Asistente</option>
                        </select>
                        <div className="invalid-feedback">
                            ¡Es Necesario Indicar un Rol!
                        </div>
                    </div>
                </div>

                <PasswordInput nameID={'password'} passwordText={'Contraseña'} formUsed={'assistant'} boxLength={'col-md-4'} />

                <div className='col-md-4'>
                    <label htmlFor="assistantPasswordConfirm" className="form-label">Confirmar Contraseña:</label>
                    <div className='input-group has-validation'>
                        <span className='input-group-text' id='psswrdCnfrmtn'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
                                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"></path>
                            </svg>
                        </span>
                        <input type="password" id='assistantPasswordConfirm' value={passwordConfirmation} className='form-control'
                            placeholder='Confirmación de la Contraseña' aria-describedby='psswrdCnfrmtn'
                            onClick={handleAssistantInputs} onChange={handlePasswordConfirmation}
                        />
                        <div className="invalid-feedback">
                            ¡Las Contraseñas deben ser Iguales!
                        </div>
                    </div>
                </div>

                <PhoneNumberInput boxLength={'col-md-4'} />
            </div>
        </fieldset>
    )
}