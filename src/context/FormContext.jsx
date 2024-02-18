import { createContext, useState } from 'react';

export const FormContext = createContext({});

export function FormProvider({ children }) {
    const [assistantData, setAssistantData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
    });

    const [medicalFormValues, setMedicalFormValues] = useState({
        beneficiary_id: 0,
        allergies: '',
        illnesses: '',
        morning_medication: '',
        afternoon_medication: '',
        night_medication: '',
        preferent_morning_calls_hour: '--:--',
        preferent_afternoon_calls_hour: '--:--',
        preferent_night_calls_hour: '--:--',
        emergency_room_on_town: null,
        firehouse_on_town: null,
        police_station_on_town: null,
        outpatient_clinic_on_town: null,
        ambulance_on_town: null,
    });

    const [beneficiaryData, setBeneficiaryData] = useState({
        name: undefined,
        first_surname: undefined,
        second_surname: '',
        dni: undefined,
        birth_date: '----/--/--',
        social_security_number: undefined,
        rutine: '',
        gender: undefined,
        marital_status: undefined,
        beneficiary_type: undefined,
    });

    const [addressData, setAddressData] = useState({
        locality: undefined,
        postal_code: undefined,
        province: undefined,
        number: undefined,
        street: undefined,
        addressable_type: '',
        addressable_id: 0
    });

    const [phones, setPhones] = useState({
        phone_number: '',
    });

    const [contactData, setContactData] = useState({
        name: '',
        first_surname: '',
        second_surname: '',
        contact_type: '',
    });

    const [callData, setCallData] = useState({
        user_id: 0,
        beneficiary_id: 0,
        date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1).toString().padStart(2, '0') + '-' + new Date().getDate().toString().padStart(2, '0'),
        time: new Date().getHours().toString().padStart(2, '0') + ':' + new Date().getMinutes().toString().padStart(2, '0'),
        turn: undefined,
        duration: 0,
        call_type: undefined,
        call_kind: undefined,
        answered_call: undefined,
        observations: undefined,
        description: '',
        contacted_112: false,
    });

    const [reminderData, setReminderData] = useState([]);

    const handleAssistantData = (element) => {
        setAssistantData({
            ...assistantData,
            [element.target.name]: element.target.value,
        });
    }

    const handlePersonalDataChange = (element) => {
        setBeneficiaryData({
            ...beneficiaryData,
            [element.target.name]: element.target.value,
        });
    };

    const handleAddressChange = (element) => {
        setAddressData({
            ...addressData,
            [element.target.name]: element.target.value,
        });
    };

    const handlePhonesChange = (element) => {
        setPhones({
            ...phones,
            [element.target.name]: element.target.value,
        });
    };

    const handleContactChange = (element) => {
        setContactData({
            ...contactData,
            [element.target.name]: element.target.value,
        });
    };

    const handleCallChange = (element) => {
        setCallData({
            ...callData,
            [element.target.name]: element.target.value,
        });
    };

    const handleReminderDataChange = (reminder) => {
        setReminderData([
            ...reminderData,
            reminder,
        ]);
    };

    return (
        <FormContext.Provider
            value={{
                assistantData, setAssistantData,
                medicalFormValues, setMedicalFormValues,
                beneficiaryData, setBeneficiaryData,
                addressData, setAddressData,
                phones, setPhones,
                contactData, setContactData,
                callData, setCallData,
                reminderData, setReminderData,
                handlePersonalDataChange, handleAddressChange, handlePhonesChange, handleContactChange,
                handleCallChange, handleReminderDataChange, handleAssistantData,
            }}
        >
            {children}
        </FormContext.Provider>
    )
}