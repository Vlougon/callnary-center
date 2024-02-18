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
    const [showFM, setShowFM] = useState({
        render: false,
        message: '',
        type: '',
    });
    const { beneficiaryData, addressData, setAddressData, phones, clearBeneficiaryForm } = useContext(FormContext);
    const { getOneBeneficiary, createBeneficiary, updateBeneficiary, loading } = useAuthContext();
    const { getPhoneBeneficiary, createPhoneBeneficiary, updatePhoneBeneficiary } = useAuthContext();
    const { createAddress } = useAuthContext();
    const beneficiaryID = useParams();

    useEffect(() => {
        clearBeneficiaryForm();

        setAddressData({
            ...addressData,
            addressable_type: 'Beneficiary',
        });

        if (beneficiaryID.id) {
            async function setGetResponse() {
                let succeded = false;
                const getBeneficiaryResponse = await getOneBeneficiary(beneficiaryID.id);

                console.log(getBeneficiaryResponse);

                // if (getBeneficiaryResponse.data.status && getBeneficiaryResponse.data.status === 'success') {
                //     succeded = true;

                //     setBeneficiaryData({
                //         name: getAssistantResponse.data.data.name,
                //         email: getAssistantResponse.data.data.email,
                //         password: '',
                //         role: getAssistantResponse.data.data.role,
                //     });
                // }

                // if (!succeded) {
                //     setShowFM({
                //         ...showFM,
                //         render: true,
                //         message: '¡Error al Cargar los Datos!',
                //         type: 'danger',
                //     });

                //     return
                // }
            }
            setGetResponse();
        }
    }, []);

    const handleSubmit = (element) => {
        element.preventDefault();
        let failed = false;
        let succeded = false;

        for (const key in beneficiaryData) {
            if ((beneficiaryData[key] && key === 'dni' && !DNIGenerator.verifyDNI(beneficiaryData[key])) ||
                (beneficiaryData[key] && key === 'birth_date' && beneficiaryData[key] >= (new Date().getFullYear() - 5) + '/' + (new Date().getDay()).toString().padStart(2, '0') + '/' + (new Date().getMonth()).toString().padStart(2, '0')) ||
                (beneficiaryData[key] && key === 'second_surname' && beneficiaryData[key].match(/^(?=\s*$)/)) ||
                (beneficiaryData[key] && key === 'rutine' && beneficiaryData[key].match(/^(?=\s*$)/)) ||
                (!beneficiaryData[key] && key !== 'second_surname' && key !== 'rutine') ||
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

        console.log(beneficiaryData, addressData, phones);

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

        } else {
            async function setPostResponse() {
                const createdBeneficiary = await createBeneficiary(beneficiaryData);

                if (createdBeneficiary.data.status && createdBeneficiary.data.status === 'success') {
                    succeded = true;

                    setShowFM({
                        ...showFM,
                        render: true,
                        message: createdBeneficiary.data.message,
                        type: createdBeneficiary.data.status,
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

                const phone = phones;
                phone['beneficiary_id'] = createdBeneficiary.data.data.id;
                await createPhoneBeneficiary(phone);

                const address = addressData;
                address['addressable_id'] = createdBeneficiary.data.data.id;
                await createAddress(address);
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
                <BeneficiaryPersonalDataFieldSet />

                <SocialDataFieldSet />

                <AddresFieldSet />

                <button type="submit" className='btn btn-primary' disabled={loading}>
                    <Spinner loading={loading} spinnerColor={'light'} spinnerStyle={{ width: '1rem', height: '1rem', }} />
                    <span>{beneficiaryID.id ? 'Modificar Datos del Beneficiario' : 'Añadir Beneficiario'}</span>
                </button>
            </form>
        </div>
    );
}