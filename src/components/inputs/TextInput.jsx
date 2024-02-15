import { useContext } from "react";
import { FormContext } from "../../context/FormContext";

export default function TextInput({ nameID, sublimText, formUsed, boxLength, needFeedback = false }) {
    const { beneficiaryData } = useContext(FormContext);
    const { addressData } = useContext(FormContext);
    const { contactData } = useContext(FormContext);
    const { handlePersonalDataChange } = useContext(FormContext);
    const { handleAddressChange } = useContext(FormContext);
    const { handleContactChange } = useContext(FormContext);

    const handleTextInput = (element) => {
        if (!needFeedback) {
            return
        }

        element.target.className = 'form-control';
        element.target.previousElementSibling.className = 'input-group-text';
        element.target.nextElementSibling.className = 'invalid-feedback';
    };

    const handleOnChangeValue = (operation) => {
        let valueToDisplay = '';
        let functionToDo = '';

        switch (formUsed) {
            case 'beneficiary':
                valueToDisplay = beneficiaryData[nameID];
                functionToDo = handlePersonalDataChange;
                break;
            case 'address':
                valueToDisplay = addressData[nameID];
                functionToDo = handleAddressChange;
                break;
            case 'contact':
                valueToDisplay = contactData[nameID];
                functionToDo = handleContactChange;
                break;
            default:
                valueToDisplay = 'Error';
                functionToDo = console.error('!Fallo al Renerizar el Valor y su Función¡');
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

        if (!needFeedback) {
            return
        }

        switch (formUsed) {
            case 'beneficiary': feedBackMessage = `¡Introduza un ${sublimText} valido para el Beneficiario!`;
                break;
            case 'user': feedBackMessage = `¡Introduza un ${sublimText} valido para el Usuario!`;
                break;
            case 'contact': feedBackMessage = `¡Introduza un ${sublimText} valido para el Contacto!`;
                break;
            case 'reminder': feedBackMessage = `¡Introduza un ${sublimText} valido para el Recordatorio!`;
                break;
            default: feedBackMessage = '¡Introduzca Datos Validos!'
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
            <label htmlFor={nameID} className="form-label">{sublimText}:</label>
            <div className={needFeedback ? 'input-group has-validation' : 'input-group'}>
                <span className='input-group-text' id={formUsed + nameID}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                    </svg>
                </span>
                <input type="text" id={nameID} name={nameID} value={handleOnChangeValue('value')} className='form-control' placeholder={sublimText} aria-describedby={formUsed + nameID} autoComplete="off" onChange={handleOnChangeValue('onChange')} onClick={handleTextInput} />

                <FeedBackRender />
            </div>
        </div >
    )
}