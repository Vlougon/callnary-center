import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormContext } from '../../context/FormContext';
import AssistantPersonalDataFieldSet from '../../components/fieldsets/AssistntPersonalDataFieldSet';
import FlashMessage from '../../components/flashmessages/FlashMessage';
import Spinner from '../../components/ui/Spinner';
import useAuthContext from '../../hooks/useAuthContext';
import '../../assets/pages/forms/AssistantForm.css';

export default function AssistantForm() {
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [showFM, setShowFM] = useState({
        render: false,
        message: '',
        type: '',
    });
    const { getOneUser, createUser, updateUser, getPhoneUser, createPhoneUser, updatePhoneUser, loading } = useAuthContext();
    const { assistantData, setAssistantData, phones, setPhones } = useContext(FormContext);
    const assistantID = useParams();

    useEffect(() => {
        clearForm(true);

        if (assistantID.id) {
            async function setGetResponse() {
                let succeded = false;
                const getAssistantResponse = await getOneUser(assistantID.id);

                if (getAssistantResponse.data.status && getAssistantResponse.data.status === 'success') {
                    succeded = true;

                    setAssistantData({
                        name: getAssistantResponse.data.data.name,
                        email: getAssistantResponse.data.data.email,
                        password: '',
                        role: getAssistantResponse.data.data.role,
                    });
                }

                if (!succeded) {
                    setShowFM({
                        ...showFM,
                        render: true,
                        message: '¡Error al Cargar los Datos!',
                        type: 'danger',
                    });

                    return
                }

                const phoneResponse = await getPhoneUser(getAssistantResponse.data.data.id);

                if (phoneResponse.data.status && phoneResponse.data.status === 'success') {
                    setPhones(phoneResponse.data.data[0]);
                }

            }
            setGetResponse();
        }
    }, []);

    const handleSubmit = (element) => {
        element.preventDefault();
        let failed = false;
        let succeded = false;

        if (!passwordConfirmation || passwordConfirmation.match(/^(?=\s*$)/) ||
            passwordConfirmation !== assistantData['password']
        ) {
            handleFormFieldsValues(document.querySelector('#assistantPasswordConfirm'));
            failed = true;
        }

        for (const key in assistantData) {
            if (!assistantData[key] || assistantData[key].match(/^(?=\s*$)/) ||
                (assistantData[key] && key === 'password' && !assistantData[key].match(/^(?=.{10,})\S*$/))) {
                handleFormFieldsValues(document.querySelector('#' + key));
                failed = true;
            }
        }

        for (const key in phones) {
            if ((phones[key] && key === 'phone_number' && !phones[key].match(/^[6][0-9]{8}$/)) ||
                !phones[key]) {
                handleFormFieldsValues(document.querySelector('#' + key));
                failed = true;
            }
        }

        if (failed) {
            setShowFM({
                ...showFM,
                render: true,
                message: '¡Hay Campos del Formulario que Requieren Revisión!',
                type: 'danger',
            });
            return
        }

        if (assistantID.id) {
            async function setPutResponse() {
                const updatedUser = await updateUser(assistantData, assistantID.id);

                if (updatedUser.data.status && updatedUser.data.status === 'success') {
                    succeded = true;

                    setShowFM({
                        ...showFM,
                        render: true,
                        message: updatedUser.data.message,
                        type: updatedUser.data.status,
                    });
                }

                if (!succeded) {
                    setShowFM({
                        ...showFM,
                        render: true,
                        message: '¡Error al Actualizar los Datos!',
                        type: 'danger',
                    });

                    return
                }

                await updatePhoneUser({ user_id: updatedUser.data.data.id, phone_number: phones.phone_number }, phones.id);

                clearForm();
            }
            setPutResponse();
        } else {
            async function setPostResponse() {
                const createdUser = await createUser(assistantData);

                if (createdUser.data.status && createdUser.data.status === 'success') {
                    succeded = true;

                    setShowFM({
                        ...showFM,
                        render: true,
                        message: createdUser.data.message,
                        type: createdUser.data.status,
                    });
                }

                if (!succeded) {
                    setShowFM({
                        ...showFM,
                        render: true,
                        message: '¡Error al Enviar los Datos!',
                        type: 'danger',
                    });

                    return
                }

                await createPhoneUser({ user_id: createdUser.data.data.id, phone_number: phones.phone_number });

                clearForm();
            }
            setPostResponse();
        }
    };

    const handleFormFieldsValues = (target) => {
        target.className += ' is-invalid';
        target.previousElementSibling.className += ' is-invalid';
        target.nextElementSibling.className += ' d-block';
    };

    const hiddeAlert = () => {
        setShowFM({
            ...showFM,
            render: false,
            message: '',
            type: '',
        });
    };

    const clearForm = (start = false) => {
        setPasswordConfirmation('');
        setAssistantData({
            name: '',
            email: '',
            password: '',
            role: '',
        });
        setPhones({
            phone_number: '',
        });
    }

    return (
        <div id='assistantForm' className="container-fluid">
            {showFM.render &&
                <FlashMessage flashMessgae={showFM.message} flashType={showFM.type} closeHandler={hiddeAlert} />
            }

            <form action="/api/V1/users" method="POST" onSubmit={handleSubmit}>

                <AssistantPersonalDataFieldSet
                    passwordConfirmation={passwordConfirmation}
                    setPasswordConfirmation={setPasswordConfirmation}
                    disabledInput={assistantID.id ? true : false}
                />

                <button type="submit" className='btn btn-primary' disabled={loading}>
                    <Spinner loading={loading} spinnerColor={'light'} spinnerStyle={{ width: '1rem', height: '1rem', }} />
                    <span>{assistantID.id ? 'Modificar Datos del Asistente' : 'Añadir Asistente'}</span>
                </button>
            </form>
        </div >
    )
}