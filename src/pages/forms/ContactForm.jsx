// import { useParams, Link } from 'react-router-dom';
import { useContext } from "react";
import { FormContext } from "../../context/FormContext";
import ContactPersonalDataFieldSet from "../../components/fieldsets/ContactPersonalDataFieldSet";
import AddresFieldSet from "../../components/fieldsets/AddresFieldSet";
import PCGenerator from "../../classes/PCGenerator";
import '../../assets/pages/forms/ContactForm.css';

export default function ContactForm() {
    const { contactData } = useContext(FormContext);
    const { addressData } = useContext(FormContext);
    const { phones } = useContext(FormContext);

    const handleSubmit = (element) => {
        element.preventDefault();

        for (const key in contactData) {
            if ((key !== 'second_surname' && contactData[key] === undefined) ||
                (key !== 'second_surname' && contactData[key].match(/^(?=\s*$)/))) {
                handleFormFieldsValues(document.querySelector('#' + key));
            }
        }

        for (const key in addressData) {
            if ((addressData[key] && key === 'postal_code' && !addressData[key].match(/^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/)) ||
                (addressData[key] && key === 'postal_code' && addressData.province && !PCGenerator.validPC(addressData[key], addressData.province)) ||
                addressData[key] === undefined) {
                handleFormFieldsValues(document.querySelector('#' + key));
            }
        }

        for (const key in phones) {
            if ((phones[key] && key === 'phone_number' && !phones[key].match(/^[6][0-9]{8}$/)) ||
                phones[key] === undefined) {
                handleFormFieldsValues(document.querySelector('#' + key));
            }
        }

        console.log(contactData, addressData, phones);
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

    return (
        <div id="contactForm" className="container-fluid">
            <form action="#" method="post" onSubmit={handleSubmit}>

                <ContactPersonalDataFieldSet />

                <AddresFieldSet />

                <input type="submit" className="btn btn-primary" value="Asignar Contacto" />
            </form>
        </div>
    )
}