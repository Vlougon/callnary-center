import { useContext, useState } from "react";
import { FormContext } from '../../context/FormContext';

export default function SelectInput({ selectNameID, selectLabel, selectValues, formUsed, boxLength, needFeedBack = false }) {
    const [options] = useState([{ value: '', text: selectLabel }]);
    const { beneficiaryData } = useContext(FormContext);
    const { addressData } = useContext(FormContext);
    const { contactData } = useContext(FormContext);
    const { callData } = useContext(FormContext);
    const { handlePersonalDataChange } = useContext(FormContext);
    const { handleAddressChange } = useContext(FormContext);
    const { handleContactChange } = useContext(FormContext);
    const { handleCallChange } = useContext(FormContext);

    const handleSelectInput = (element) => {
        if (!needFeedBack) {
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
                valueToDisplay = beneficiaryData[selectNameID];
                functionToDo = handlePersonalDataChange;
                break;
            case 'address':
                valueToDisplay = addressData[selectNameID];
                functionToDo = handleAddressChange;
                break;
            case 'contact':
                valueToDisplay = contactData[selectNameID];
                functionToDo = handleContactChange;
                break;
            case 'call':
                valueToDisplay = callData[selectNameID];
                functionToDo = handleCallChange;
                break;
            default:
                valueToDisplay = 'Error';
                functionToDo = console.error('!Fallo al Renderizar el Valor y su Función¡');
                break;
        }

        if (operation === 'onChange') {
            return functionToDo
        } else {
            return valueToDisplay
        }
    }

    const OptionsRender = () => {
        let tempID = 1;

        return (
            <>
                {
                    options.concat(selectValues).map((option) => {
                        tempID++;
                        return < option key={tempID} value={option.value} > {option.text}</option >
                    })
                }
            </>
        )

    };

    const FeedBackRender = () => {
        let feedBackMessage = '';

        switch (formUsed) {
            case 'beneficiary': feedBackMessage = `¡Introduza un ${selectLabel} valido para el Beneficiario!`;
                break;
            case 'contact': feedBackMessage = `¡Introduza un ${selectLabel} valido!`;
                break;
            default: feedBackMessage = '¡Introduzca Datos Validos!'
                break;
        }

        if (needFeedBack) {
            return (
                <div className="invalid-feedback">
                    {feedBackMessage}
                </div>
            )
        }
    };

    return (
        <div className={boxLength}>
            <label htmlFor={selectNameID} className="form-label">{selectLabel}:</label>
            <div className={needFeedBack ? 'input-group has-validation' : 'input-group'}>
                <span className='input-group-text' id={formUsed + selectNameID}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 448 512">
                        <path d="M128 136c0-22.1-17.9-40-40-40L40 96C17.9 96 0 113.9 0 136l0 48c0 22.1 17.9 40 40 40H88c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40H40c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40H88c22.1 0 40-17.9 40-40V328zm32-192v48c0 22.1 17.9 40 40 40h48c22.1 0 40-17.9 40-40V136c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM288 328c0-22.1-17.9-40-40-40H200c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40h48c22.1 0 40-17.9 40-40V328zm32-192v48c0 22.1 17.9 40 40 40h48c22.1 0 40-17.9 40-40V136c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM448 328c0-22.1-17.9-40-40-40H360c-22.1 0-40 17.9-40 40v48c0 22.1 17.9 40 40 40h48c22.1 0 40-17.9 40-40V328z" />
                    </svg>
                </span>
                <select id={selectNameID} name={selectNameID} value={handleOnChangeValue('value')} aria-label={selectNameID} className="form-select" aria-describedby={formUsed + selectNameID} onChange={handleOnChangeValue('onChange')} onClick={handleSelectInput}>
                    <OptionsRender />
                </select>
                <FeedBackRender />
            </div>
        </div>
    )
}