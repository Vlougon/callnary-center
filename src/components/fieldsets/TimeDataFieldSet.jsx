import { useContext } from "react";
import { FormContext } from "../../contexts/FormContext";
import TimeInput from "../inputs/TimeInput";
import DateInput from "../inputs/DateInput";

export default function TimeDataFieldSet() {
    const { callData } = useContext(FormContext);
    const { handleCallChange } = useContext(FormContext);

    const handleInput = (element) => {
        element.target.className = 'form-control';
        element.target.previousElementSibling.className = 'input-group-text';
        element.target.nextElementSibling.className = 'invalid-feedback';
    };


    return (
        <fieldset>
            <legend>Datos de Tiempo</legend>
            <div className="row g-3">
                <div className='col-md-3'>
                    <label htmlFor="turn" className="form-label">Turno Horario:</label>
                    <div className='input-group has-validation'>
                        <span className='input-group-text' id='callTurn'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 448 512">
                                <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z" />
                            </svg>
                        </span>
                        <input type="text" id='turn' name="turn" value={callData['turn']} className='form-control' aria-describedby='callTurn' onClick={handleInput} onChange={handleCallChange} disabled />
                        <div className="invalid-feedback">
                            ¡Itroduzca un Turno Horario adecuado!
                        </div>
                    </div>
                </div>

                <DateInput dateValueID={'date'} dateText={'Fecha'} formUsed={'call'} boxLength={'col-md-3'} disabledDate={true} />

                <TimeInput timeValueID={'time'} timeText={'Hora'} formUsed={'call'} boxLength={'col-md-3'} disabledTime={true} />

                <div className='col-md-3'>
                    <label htmlFor="duration" className="form-label">Duración (s):</label>
                    <div className='input-group has-validation'>
                        <span className='input-group-text' id='callDuration'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                            </svg>
                        </span>
                        <input type="text" id='duration' name="duration" value={callData['duration']} className='form-control' aria-describedby='callDuration' onClick={handleInput} onChange={handleCallChange} disabled />
                        <div className="invalid-feedback">
                            ¡Itroduzca una Duración adecuada!
                        </div>
                    </div>
                </div>
            </div>
        </fieldset>
    )
}