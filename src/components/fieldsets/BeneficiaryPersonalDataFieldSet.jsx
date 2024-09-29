import { useContext } from 'react';
import { FormContext } from '../../context/FormContext';
import SelectInput from "../inputs/SelectInput";
import PhoneNumberInput from '../inputs/PhoneNumberInput';
import TextInput from '../inputs/TextInput';
import DNIGenerator from '../../classes/DNIGenerator';
import SSNGenerator from '../../classes/SSNGenerator';

export default function BeneficiaryPersonalDataFieldSet() {
    const { beneficiaryData, aviableUsers } = useContext(FormContext);
    const { handlePersonalDataChange } = useContext(FormContext);

    const dniGenerator = (element) => {
        handleTriggerInput(element.target.previousElementSibling, DNIGenerator.generateDNI());
    };

    const ssGenerator = (element) => {
        handleTriggerInput(element.target.previousElementSibling, SSNGenerator.generateSSN());
    };

    const handleTriggerInput = (target, enteredValue) => {
        const lastValue = target.value;
        target.value = enteredValue;
        const event = new Event("change", { bubbles: true });
        const tracker = target._valueTracker;
        if (tracker) {
            tracker.setValue(lastValue);
        }
        target.dispatchEvent(event);
    };

    const handlePersonalDataInputs = (element) => {
        if (element.target.tagName === 'svg' || element.target.tagName === 'path' || element.target.tagName === 'DIV') {
            return
        }

        if (element.target.tagName === 'SPAN') {
            const target = element.target.previousElementSibling ? element.target.previousElementSibling : element.target.nextElementSibling;

            target.className = 'form-control';
            target.previousElementSibling.className = 'input-group-text';
            target.nextElementSibling.className = 'input-group-text btn btn-orange';
            target.nextElementSibling.nextElementSibling.className = 'invalid-feedback';

            return
        }

        element.target.className = 'form-control';
        element.target.previousElementSibling.className = 'input-group-text';

        if (element.target.id === 'dni' || element.target.id === 'social_security_number') {
            element.target.nextElementSibling.className = 'input-group-text btn btn-orange';
            element.target.nextElementSibling.nextElementSibling.className = 'invalid-feedback';
            return
        }

        element.target.nextElementSibling.className = 'invalid-feedback';
    };

    return (
        <fieldset>
            <legend>Datos Personales</legend>
            <div className='row g-3'>

                <TextInput nameID={'name'} sublimText={'Nombre'} formUsed={'beneficiary'} boxLength={'col-md-4'} needFeedback={true} />

                <TextInput nameID={'first_surname'} sublimText={'Primer Apellido'} formUsed={'beneficiary'} boxLength={'col-md-4'} needFeedback={true} />

                <TextInput nameID={'second_surname'} sublimText={'Segundo Apellido'} formUsed={'beneficiary'} boxLength={'col-md-4'} needFeedback={true} />

                <div className='col-md-4'>
                    <label htmlFor="dni" className="form-label">DNI:</label>
                    <div className='input-group has-validation' onClick={handlePersonalDataInputs}>
                        <span className='input-group-text' id='beneficiaryDNI'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                            </svg>
                        </span>
                        <input type="text" id='dni' name="dni" value={beneficiaryData.dni} className='form-control' placeholder='DNI' aria-describedby='beneficiaryDNI' onChange={handlePersonalDataChange} />
                        <span className="input-group-text btn btn-orange" onClick={dniGenerator}>Generar DNI</span>
                        <div className="invalid-feedback">
                            ¡Introduza un DNI apropiado!
                        </div>
                    </div>
                </div>

                <div className='col-md-5'>
                    <label htmlFor="social_security_number" className="form-label">Código de la Seguridad Social:</label>
                    <div className='input-group has-validation' onClick={handlePersonalDataInputs}>
                        <span className='input-group-text' id='beneficiarySS'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                            </svg>
                        </span>
                        <input type="text" id='social_security_number' name="social_security_number" value={beneficiaryData.social_security_number} className='form-control' placeholder='Código de la Seguridad Social' aria-describedby='beneficiarySS' onChange={handlePersonalDataChange} />
                        <span className="input-group-text btn btn-orange" onClick={ssGenerator}>Generar CSS</span>
                        <div className="invalid-feedback">
                            ¡Introduza un Código de la Seguridad Social apropiado!
                        </div>
                    </div>
                </div>

                <div className='col-md-3'>
                    <label htmlFor="birth_date" className="form-label">Fecha de Nacimiento:</label>
                    <div className='input-group has-validation'>
                        <span className='input-group-text' id='beneficiaryBirthDate'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 448 512">
                                <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z" />
                            </svg>
                        </span>
                        <input type="date" id='birth_date' name="birth_date" value={beneficiaryData.birth_date} className='form-control' aria-describedby='beneficiaryBirthDate' onChange={handlePersonalDataChange} onClick={handlePersonalDataInputs} />
                        <div className="invalid-feedback">
                            ¡Introduza una fecha de Nacimiento Válida!
                        </div>
                    </div>
                </div>

                <SelectInput
                    selectNameID={'user_id'}
                    selectLabel={'Usuario Encargado'}
                    selectValues={
                        aviableUsers && aviableUsers.length >= 1 ? aviableUsers : [{ value: '0', text: 'No se ha Encontrado nigún Usuario' }]
                    }
                    formUsed={'beneficiary'}
                    boxLength={'col-md-4'}
                    needFeedBack={true}
                />

                <PhoneNumberInput boxLength={'col-md-4'} />

                <div className='col-12'>
                    <label htmlFor="rutine" className="form-label">Rutina:</label>
                    <div className='input-group has validation'>
                        <span className='input-group-text' id='beneficiaryRutine'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                            </svg>
                        </span>
                        <textarea id="rutine" name="rutine" value={beneficiaryData.rutine} className="form-control" placeholder="Rutina del Beneficiario" onChange={handlePersonalDataChange} onClick={handlePersonalDataInputs}></textarea>
                        <div className='invalid-feedback'>
                            ¡La Rutina debe ser Coherente!
                        </div>
                    </div>
                </div>

                <div className='col-12'>
                    <label htmlFor="audio_text" className="form-label">Texto para Audio:</label>
                    <div className='input-group has validation'>
                        <span className='input-group-text' id='beneficiaryAudioText'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                            </svg>
                        </span>
                        <textarea id="audio_text" name="audio_text" value={beneficiaryData.audio_text} className="form-control" placeholder="Rutina del Beneficiario" onChange={handlePersonalDataChange} onClick={handlePersonalDataInputs}></textarea>
                        <div className='invalid-feedback'>
                            ¡La Rutina debe ser Coherente!
                        </div>
                    </div>
                </div>
            </div>
        </fieldset>
    )
}