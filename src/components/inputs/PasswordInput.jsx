import { useContext } from "react";
import { FormContext } from "../../context/FormContext";

export default function PasswordInput({ nameID, passwordText, formUsed, boxLength }) {
    const { assistantData } = useContext(FormContext);
    const { handleAssistantData } = useContext(FormContext);

    const handlePasswordInput = (element) => {
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

        switch (formUsed) {
            case 'assistant': feedBackMessage = `¡Introduza una ${passwordText} valida para el Usuario (Mínimo 10 letras, sin espacios)!`;
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
            <label htmlFor={nameID} className="form-label">{passwordText}:</label>
            <div className='input-group has-validation'>
                <span className='input-group-text' id={nameID + passwordText}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"></path>
                    </svg>
                </span>
                <input type="password" id={nameID} name={nameID} value={handleOnChangeValue('value')} className='form-control' placeholder={passwordText} aria-describedby={nameID + passwordText} onChange={handleOnChangeValue('onChange')} onClick={handlePasswordInput} />

                <FeedBackRender />
            </div>
        </div>
    )
}