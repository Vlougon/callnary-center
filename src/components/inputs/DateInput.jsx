import { useContext } from "react";
import { FormContext } from "../../contexts/FormContext";

export default function DateInput({ dateValueID, dateText, formUsed, boxLength, disabledDate = false }) {
    const { callData } = useContext(FormContext);
    const { handleCallChange } = useContext(FormContext);

    const handleOnChangeValue = (operation) => {
        let valueToDisplay = '';
        let functionToDo = '';

        switch (formUsed) {
            case 'call':
                valueToDisplay = callData[dateValueID];
                functionToDo = handleCallChange;
                break;
            default:
                valueToDisplay = 'Error';
                functionToDo = console.error('¡Fallo al Renerizar el Valor y su Función!');
                break;
        }

        if (operation === 'onChange') {
            return functionToDo
        } else {
            return valueToDisplay
        }
    }

    const FeedBackRender = () => {
        let feedBackMessage = '';

        switch (formUsed) {
            case 'call': feedBackMessage = `¡Introduza un ${dateText} valido para la Llamada!`;
                break;
            case 'assistant': feedBackMessage = `¡Introduza un ${dateText} valido para el Usuario!`;
                break;
            case 'beneficiary': feedBackMessage = `¡Introduza un ${dateText} valido para el Beneficiario!`;
                break;
            case 'reminder': feedBackMessage = `¡Introduza un ${dateText} valido para el Recordatorio!`;
                break;
            default: feedBackMessage = '¡Introduzca una Hora Válida!'
                break;
        }

        return (
            <div className="invalid-feedback">
                {feedBackMessage}
            </div>
        )
    };

    return (
        <div className={boxLength}>
            <label htmlFor={dateValueID} className="form-label">{dateText}:</label>
            <div className='input-group has-validation'>
                <span className='input-group-text' id={formUsed + dateValueID}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                    </svg>
                </span>
                <input type="date" id={dateValueID} name={dateValueID} value={handleOnChangeValue('value')} className='form-control' aria-describedby={formUsed + dateValueID} onChange={handleOnChangeValue('onChange')} disabled={disabledDate} />

                <FeedBackRender />
            </div>
        </div>
    )
}