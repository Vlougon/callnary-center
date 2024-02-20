import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { FormContext } from "../../context/FormContext";
import ContactPersonalDataFieldSet from "../../components/fieldsets/ContactPersonalDataFieldSet";
import AddresFieldSet from "../../components/fieldsets/AddresFieldSet";
import FlashMessage from '../../components/flashmessages/FlashMessage';
import Spinner from '../../components/ui/Spinner';
import PCGenerator from "../../classes/PCGenerator";
import useAuthContext from '../../hooks/useAuthContext';
import '../../assets/pages/forms/ContactForm.css';

export default function ContactForm() {
    const [globalPhoneId, setGlobalPhoneId] = useState(0);
    const [globalAddressId, setGlobalAddressId] = useState(0);
    const [showFM, setShowFM] = useState({
        render: false,
        message: '',
        type: '',
    });
    const { contactData, setContactData, addressData, setAddressData, phones, setPhones, clearContactData } = useContext(FormContext);
    const { getOneContact, createContact, updateContact, loading } = useAuthContext();
    const { getPhoneContact, createPhoneContact, updatePhoneContact } = useAuthContext();
    const { getContactAddress, createAddress, updateAddress, createBeneficiaryContactLink } = useAuthContext();
    const params = useParams();

    useEffect(() => {
        clearContactData();

        setAddressData((previousAddressData) => ({
            ...previousAddressData,
            addressable_type: 'App\\Models\\Contact',
        }));

        if (params.id) {
            async function setResponse() {
                let succeded = false;

                const getContactResponse = await getOneContact(params.id);

                if (getContactResponse.data.status && getContactResponse.data.status === 'success') {
                    succeded = true;

                    const contactObject = getContactResponse.data.data;
                    contactObject.second_surname = contactObject.second_surname ? contactObject.second_surname : '';

                    delete contactObject.id;

                    setContactData(contactObject);
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

                const phoneResponse = await getPhoneContact(params.id);
                if (phoneResponse.data.status && phoneResponse.data.status === 'success') {

                    const phoneObject = phoneResponse.data.data[0];
                    phoneObject.contact_id = phoneObject.contact_id.id;

                    setGlobalPhoneId(phoneObject.id);
                    delete phoneObject.id;

                    setPhones(phoneObject);
                }

                const addressResponse = await getContactAddress(params.id);
                if (addressResponse.data.status && addressResponse.data.status === 'success') {

                    const addressObject = addressResponse.data.data[0];

                    setGlobalAddressId(addressObject.id);
                    delete addressObject.id;

                    setAddressData(addressObject);
                }
            }
            setResponse();
        }
    }, []);

    const handleSubmit = (element) => {
        element.preventDefault();
        let failed = false;
        let succeded = false;

        for (const key in contactData) {
            if ((!contactData[key] && key !== 'second_surname') ||
                (contactData[key] && key !== 'second_surname' && contactData[key].match(/^(?=\s*$)/)) ||
                (contactData[key] && key === 'second_surname' && contactData[key].match(/^(?=\s*$)/))
            ) {
                failed = true;
                handleFormFieldsValues(document.querySelector('#' + key));
            }
        }

        for (const key in addressData) {
            if ((addressData[key] && key === 'postal_code' && !addressData[key].match(/^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/)) ||
                (addressData[key] && key === 'postal_code' && addressData.province && !PCGenerator.validPC(addressData[key], addressData.province)) ||
                (!addressData[key] && key !== 'addressable_type' && key !== 'addressable_id')
            ) {
                failed = true;
                handleFormFieldsValues(document.querySelector('#' + key));
            }
        }

        for (const key in phones) {
            if ((phones[key] && key === 'phone_number' && !phones[key].match(/^[6][0-9]{8}$/)) ||
                !phones[key]
            ) {
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

        if (params.id) {
            async function getPutResponse() {
                const updatedContact = await updateContact(contactData, params.id);
                if (updatedContact.data.status && updatedContact.data.status === 'success') {
                    succeded = true;

                    setShowFM({
                        ...showFM,
                        render: true,
                        message: updatedContact.data.message,
                        type: updatedContact.data.status,
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

                await updatePhoneContact(phones, globalPhoneId);

                await updateAddress(addressData, globalAddressId);

                clearContactData();

                setAddressData((previousAddressData) => ({
                    ...previousAddressData,
                    addressable_type: 'App\\Models\\Contact',
                }));
            }
            getPutResponse();
        } else {
            async function getPostResponse() {
                const createdContact = await createContact(contactData);
                if (createdContact.data.status && createdContact.data.status === 'success') {
                    succeded = true;

                    setShowFM({
                        ...showFM,
                        render: true,
                        message: createdContact.data.message,
                        type: createdContact.data.status,
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

                await createBeneficiaryContactLink({ beneficiary_id: params.userid, contact_id: createdContact.data.data.id });

                const phone = phones;
                phone['contact_id'] = createdContact.data.data.id;
                await createPhoneContact(phone);

                const address = addressData;
                address['addressable_id'] = createdContact.data.data.id;
                await createAddress(address);

                clearContactData();

                setAddressData((previousAddressData) => ({
                    ...previousAddressData,
                    addressable_type: 'App\\Models\\Contact',
                }));
            }
            getPostResponse();
        }
    };

    const handleFormFieldsValues = (target) => {
        target.className += ' is-invalid';
        target.previousElementSibling.className += ' is-invalid';

        if (target.id === 'postal_code') {
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
        <div id="contactForm" className="container-fluid">
            {showFM.render &&
                <FlashMessage flashMessgae={showFM.message} flashType={showFM.type} closeHandler={hiddeAlert} />
            }

            <form action="#" method="post" onSubmit={handleSubmit}>

                <ContactPersonalDataFieldSet />

                <AddresFieldSet />

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    <Spinner loading={loading} spinnerColor={'light'} spinnerType={'spinner-border'}
                        spinnerStyle={{ width: '1rem', height: '1rem', }}
                    />
                    <span>{params.id ? 'Modificar Datos del Contacto' : 'Añadir Contacto'}</span>
                </button>
            </form>
        </div>
    )
}