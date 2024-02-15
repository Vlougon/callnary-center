import { useContext } from 'react';
import { FormContext } from '../../contexts/FormContext';
import BeneficiaryPersonalDataFieldSet from '../../components/fieldsets/BeneficiaryPersonalDataFieldSet';
import SocialDataFieldSet from '../../components/fieldsets/SocialDataFieldSet';
import AddresFieldSet from '../../components/fieldsets/AddresFieldSet';
import DNIGenerator from '../../classes/DNIGenerator';
import PCGenerator from '../../classes/PCGenerator';
import '../../styles/forms/BeneficiaryForm.css';

export default function BeneficiaryForm() {
    const { beneficiaryData } = useContext(FormContext);
    const { addressData } = useContext(FormContext);
    const { phones } = useContext(FormContext);

    const handleSubmit = (element) => {
        element.preventDefault();

        for (const key in beneficiaryData) {
            if ((beneficiaryData[key] && key === 'dni' && !DNIGenerator.verifyDNI(beneficiaryData[key])) ||
                (beneficiaryData[key] && key === 'birth_date' && beneficiaryData[key] >= (new Date().getFullYear() - 5) + '/' + (new Date().getDay()).toString().padStart(2, '0') + '/' + (new Date().getMonth()).toString().padStart(2, '0')) ||
                beneficiaryData[key] === undefined || beneficiaryData[key] === '----/--/--') {
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
            if ((phones[key] && phones[key].length !== 9 && key === 'phone_number') ||
                phones[key] === undefined) {
                handleFormFieldsValues(document.querySelector('#' + key));
            }
        }

        console.log(beneficiaryData, addressData, phones);
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

    return (
        <div id='beneficiaryForm' className='container-fluid'>
            <form action="#" method="post" onSubmit={handleSubmit}>
                <BeneficiaryPersonalDataFieldSet />

                <SocialDataFieldSet />

                <AddresFieldSet />
                <input type="submit" className='btn btn-primary' value="Dar de Alta" />
            </form>
        </div>
    );
}