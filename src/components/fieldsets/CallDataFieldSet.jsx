import { useContext } from "react";
import { FormContext } from "../../context/FormContext";
import SelectInput from "../inputs/SelectInput";

export default function CallDataFieldSet() {
    const { callData } = useContext(FormContext);
    const { handleCallChange } = useContext(FormContext);

    const handleInput = (element) => {
        element.target.className = 'form-control';
        element.target.previousElementSibling.className = 'input-group-text';
        element.target.nextElementSibling.className = 'invalid-feedback';
    };

    return (
        <fieldset>
            <legend>Datos de la Llamada</legend>
            <div className="row g-3">
                <SelectInput
                    selectNameID={'answered_call'}
                    selectLabel={'¿Respondió a la Llamada?'}
                    selectValues={
                        [
                            { value: 'true', text: 'Llamada Atendida' }, { value: 'false', text: 'Llamada No Atendida' },
                        ]
                    }
                    formUsed={'call'}
                    boxLength={'col-md-4'}
                    needFeedBack={true}
                />

                <SelectInput
                    selectNameID={'call_type'}
                    selectLabel={'Tipo de Llamada'}
                    selectValues={
                        [
                            { value: 'rutinary', text: 'Rutinaria' }, { value: 'emergency', text: 'Emergencia' },
                        ]
                    }
                    formUsed={'call'}
                    boxLength={'col-md-4'}
                    needFeedBack={true}
                />

                <div className='col-md-4'>
                    <label htmlFor="call_kind" className="form-label">Clase de Llamada:</label>
                    <div className='input-group has-validation'>
                        <span className='input-group-text' id='kind'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                            </svg>
                        </span>
                        <input type="text" id='call_kind' name="call_kind" value={callData['call_kind']} aria-describedby='kind' className='form-control' onClick={handleInput} onChange={handleCallChange} disabled />
                        <div className="invalid-feedback">
                            ¡Itroduzca una Clase de Llamada Adecuada!
                        </div>
                    </div>
                </div>

                <div className='col-12'>
                    <label htmlFor="observations" className="form-label">Observaciones:</label>
                    <div className='input-group has-validation'>
                        <span className='input-group-text' id='callObservations'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                            </svg>
                        </span>
                        <textarea id="observations" name="observations" value={callData['observations']} className="form-control" onClick={handleInput} onChange={handleCallChange}></textarea>
                        <div className="invalid-feedback">
                            ¡Itroduzca Observaciones!
                        </div>
                    </div>
                </div>
            </div>
        </fieldset>
    )
}