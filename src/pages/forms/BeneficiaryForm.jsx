import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormContext } from '../../context/FormContext';
import BeneficiaryPersonalDataFieldSet from '../../components/fieldsets/BeneficiaryPersonalDataFieldSet';
import SocialDataFieldSet from '../../components/fieldsets/SocialDataFieldSet';
import AddresFieldSet from '../../components/fieldsets/AddresFieldSet';
import FlashMessage from '../../components/flashmessages/FlashMessage';
import Spinner from '../../components/ui/Spinner';
import DNIGenerator from '../../classes/DNIGenerator';
import PCGenerator from '../../classes/PCGenerator';
import useAuthContext from '../../hooks/useAuthContext';
import '../../assets/pages/forms/BeneficiaryForm.css';

export default function BeneficiaryForm() {
    const [globalPhoneId, setGlobalPhoneId] = useState(0);
    const [globalAddressId, setGlobalAddressId] = useState(0);
    const [showFM, setShowFM] = useState({
        render: false,
        message: '',
        type: '',
    });
    const {
        beneficiaryData, setBeneficiaryData, addressData, setAddressData,
        phones, setPhones, aviableUsers, setAvaiableUsers, clearBeneficiaryForm
    } = useContext(FormContext);
    const { getOneBeneficiary, createBeneficiary, updateBeneficiary, loading } = useAuthContext();
    const { getPhoneBeneficiary, createPhoneBeneficiary, updatePhoneBeneficiary } = useAuthContext();
    const { getBeneficiaryAddress, createAddress, updateAddress } = useAuthContext();
    const { getUsersByCenter } = useAuthContext();
    const beneficiaryID = useParams();
    const userID = useParams();
    const assistantObject = sessionStorage.getItem('assistant')
        ? JSON.parse(sessionStorage.getItem('assistant'))
        : { id: null, role: "assistant", name: "Anon" };

    useEffect(() => {
        clearBeneficiaryForm();

        setAddressData((previousAddressData) => ({
            ...previousAddressData,
            addressable_type: 'App\\Models\\Beneficiary',
        }));

        if (beneficiaryID.id || userID.id) {
            async function setGetResponse() {
                let succeded = false;
                const getBeneficiaryResponse = await getOneBeneficiary(beneficiaryID.id);

                if (getBeneficiaryResponse.data.status && getBeneficiaryResponse.data.status === 'success') {
                    succeded = true;

                    const beneficiaryObject = { ...getBeneficiaryResponse.data.data };

                    setAvaiableUsers([{ value: beneficiaryObject.user_id.id, text: beneficiaryObject.user_id.name }]);

                    beneficiaryObject.birth_date = beneficiaryObject.birth_date.split('T')[0];
                    beneficiaryObject.second_surname = beneficiaryObject.second_surname ? beneficiaryObject.second_surname : '';
                    beneficiaryObject.rutine = beneficiaryObject.rutine ? beneficiaryObject.rutine : '';
                    beneficiaryObject.audio_text = beneficiaryObject.audio_text ? beneficiaryObject.audio_text : '';
                    beneficiaryObject.user_id = beneficiaryObject.user_id ? beneficiaryObject.user_id.id : '0';

                    delete beneficiaryObject.id;

                    setBeneficiaryData(beneficiaryObject);
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

                const phoneResponse = await getPhoneBeneficiary(beneficiaryID.id);
                if (phoneResponse.data.status && phoneResponse.data.status === 'success') {

                    const phoneObject = phoneResponse.data.data[0];
                    phoneObject.beneficiary_id = phoneObject.beneficiary_id.id;

                    setGlobalPhoneId(phoneObject.id);
                    delete phoneObject.id;

                    setPhones(phoneObject);
                }

                const addressResponse = await getBeneficiaryAddress(beneficiaryID.id);
                if (addressResponse.data.status && addressResponse.data.status === 'success') {

                    const addressObject = addressResponse.data.data[0];

                    setGlobalAddressId(addressObject.id);
                    delete addressObject.id;

                    setAddressData(addressObject);
                }
            }
            setGetResponse();

        } else {
            async function getCenterUsers() {
                let succeded = false;
                const getCenterUsersResponse = assistantObject.role === 'supervisor'
                    ? await getUsersByCenter(assistantObject.id)
                    : assistantObject.id;

                if (getCenterUsersResponse.data && getCenterUsersResponse.data.status && getCenterUsersResponse.data.status === 'success') {
                    succeded = true;

                    console.log(getCenterUsersResponse);
                } else if ((getCenterUsersResponse === assistantObject.id)) {
                    succeded = true;

                    setAvaiableUsers([{ value: getCenterUsersResponse, text: assistantObject.name }]);
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


            }
            getCenterUsers();
        }
    }, []);

    const handleSubmit = (element) => {
        element.preventDefault();
        let failed = false;

        for (const key in beneficiaryData) {
            if ((beneficiaryData[key] && key === 'dni' && !DNIGenerator.verifyDNI(beneficiaryData[key])) ||
                (beneficiaryData[key] && key === 'birth_date' && beneficiaryData[key] >= (new Date().getFullYear() - 5) + '/' + (new Date().getDay()).toString().padStart(2, '0') + '/' + (new Date().getMonth()).toString().padStart(2, '0')) ||
                (beneficiaryData[key] && key === 'second_surname' && beneficiaryData[key].match(/^(?=\s*$)/)) ||
                (beneficiaryData[key] && key === 'rutine' && beneficiaryData[key].match(/^(?=\s*$)/)) ||
                (beneficiaryData[key] && key === 'audio_text' && beneficiaryData[key].match(/^(?=\s*$)/)) ||
                (!beneficiaryData[key] && key !== 'second_surname' && key !== 'rutine' && key !== 'audio_text') ||
                beneficiaryData[key] === '----/--/--') {
                failed = true;
                handleFormFieldsValues(document.querySelector('#' + key));
            }
        }

        for (const key in addressData) {
            if ((addressData[key] && key === 'postal_code' && !addressData[key].match(/^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/)) ||
                (addressData[key] && key === 'postal_code' && addressData.province && !PCGenerator.validPC(addressData[key], addressData.province)) ||
                (!addressData[key] && key !== 'addressable_type' && key !== 'addressable_id')) {
                failed = true;
                handleFormFieldsValues(document.querySelector('#' + key));
            }
        }

        for (const key in phones) {
            if ((phones[key] && key === 'phone_number' && !phones[key].match(/^[6][0-9]{8}$/)) ||
                !phones[key]) {
                failed = true;
                handleFormFieldsValues(document.querySelector('#' + key));
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

        if (beneficiaryID.id) {

            async function setPutResponse() {
                const updatedBenficiary = await updateBeneficiary(beneficiaryData, beneficiaryID.id);
                if (!updatedBenficiary || updatedBenficiary.data.status !== 'success') {
                    failed = true;
                }

                if (!failed) {
                    const updatedPhone = await updatePhoneBeneficiary(phones, globalPhoneId);
                    if (!updatedPhone || updatedPhone.data.status !== 'success') {
                        failed = true;
                    }
                }

                if (!failed) {
                    const updatedAddress = await updateAddress(addressData, globalAddressId);
                    if (!updatedAddress || updatedAddress.data.status !== 'success') {
                        failed = true;
                    }
                }

                if (failed) {
                    setShowFM({
                        ...showFM,
                        render: true,
                        message: '¡Error al Actualizar los Datos!',
                        type: 'danger',
                    });
                    return
                }

                setShowFM({
                    ...showFM,
                    render: true,
                    message: updatedBenficiary.data.message,
                    type: updatedBenficiary.data.status,
                });
            }
            setPutResponse();

        } else {
            async function setPostResponse() {
                const createdBeneficiary = await createBeneficiary(beneficiaryData);
                if (!createdBeneficiary || createdBeneficiary.data.status !== 'success') {
                    failed = true;
                }

                if (!failed) {
                    const phone = phones;
                    phone['beneficiary_id'] = createdBeneficiary.data.data.id;
                    const createdPhones = await createPhoneBeneficiary(phone);
                    if (!createdPhones || createdPhones.data.status !== 'success') {
                        failed = true;
                    }
                }

                if (!failed) {
                    const address = addressData;
                    address['addressable_id'] = createdBeneficiary.data.data.id;
                    const createdAddress = await createAddress(address);
                    if (!createdAddress || createdAddress.data.status !== 'success') {
                        failed = true;
                    }
                }

                if (failed) {
                    setShowFM({
                        ...showFM,
                        render: true,
                        message: '¡Error al Enviar los Datos!',
                        type: 'danger',
                    });
                    return
                }

                setShowFM({
                    ...showFM,
                    render: true,
                    message: createdBeneficiary.data.message,
                    type: createdBeneficiary.data.status,
                });

                clearBeneficiaryForm();

                setAddressData((previousAddressData) => ({
                    ...previousAddressData,
                    addressable_type: 'App\\Models\\Beneficiary',
                }));
            }
            setPostResponse();
        }
    };

    const handleFormFieldsValues = (target) => {
        target.className += ' is-invalid';
        target.previousElementSibling.className += ' is-invalid';

        if (target.id === 'dni' || target.id === 'social_security_number' || target.id === 'postal_code') {
            target.nextElementSibling.className += ' is-invalid';
            target.nextElementSibling.nextElementSibling.className += ' d-block';
            return
        }

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

    return (
        <div id='beneficiaryForm' className='container-fluid'>
            {showFM.render &&
                <FlashMessage flashMessgae={showFM.message} flashType={showFM.type} closeHandler={hiddeAlert} />
            }

            <form action="/api/V1/beneficiaries" method="POST" onSubmit={handleSubmit}>
                <BeneficiaryPersonalDataFieldSet beneficiaryId={beneficiaryID.id} />

                <SocialDataFieldSet />

                <AddresFieldSet />

                <button type="submit" className='btn btn-primary' disabled={loading}>
                    <Spinner loading={loading} spinnerColor={'light'} spinnerType={'spinner-border'}
                        spinnerStyle={{ width: '1rem', height: '1rem', }}
                    />
                    <span>{beneficiaryID.id ? 'Modificar Datos del Beneficiario' : 'Añadir Beneficiario'}</span>
                </button>
            </form>
        </div>
    );
}