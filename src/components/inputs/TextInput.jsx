import { useContext } from "react";
import { FormContext } from "../../context/FormContext";

export default function TextInput({ nameID, sublimText, formUsed, boxLength, needFeedback = false }) {
    const { assistantData } = useContext(FormContext);
    const { beneficiaryData } = useContext(FormContext);
    const { addressData } = useContext(FormContext);
    const { contactData } = useContext(FormContext);
    const { handleAssistantData } = useContext(FormContext);
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
            case 'assistant':
                valueToDisplay = assistantData[nameID];
                functionToDo = handleAssistantData;
                break;
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
            case 'assistant': feedBackMessage = `¡Introduza un ${sublimText} valido para el Usuario!`;
                break;
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
                    {(nameID === 'name' || nameID === 'first_surname' || nameID === 'second_surname') &&
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                        </svg>
                    }

                    {nameID !== 'name' && nameID !== 'first_surname' && nameID !== 'second_surname' &&
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"></path>
                        </svg>
                    }
                </span>
                <input type="text" id={nameID} name={nameID} value={handleOnChangeValue('value')} className='form-control' placeholder={sublimText} aria-describedby={formUsed + nameID} autoComplete="off" onChange={handleOnChangeValue('onChange')} onClick={handleTextInput} />

                <FeedBackRender />
            </div>
        </div >
    )
}