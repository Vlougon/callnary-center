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
        emergency_room_on_town: '',
        firehouse_on_town: '',
        police_station_on_town: '',
        outpatient_clinic_on_town: '',
        ambulance_on_town: '',
    });

    const [beneficiaryData, setBeneficiaryData] = useState({
        name: '',
        first_surname: '',
        second_surname: '',
        dni: '',
        birth_date: '----/--/--',
        social_security_number: '',
        rutine: '',
        gender: '',
        marital_status: '',
        beneficiary_type: '',
    });

    const [addressData, setAddressData] = useState({
        locality: '',
        postal_code: '',
        province: '',
        number: '',
        street: '',
        addressable_type: '',
        addressable_id: 0,
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
        turn: '',
        duration: 0,
        call_type: '',
        call_kind: '',
        answered_call: false,
        observations: '',
        description: '',
        contacted_112: false,
    });

    const [reminderData, setReminderData] = useState([]);



    /* ############################################################################################ */
    /* ####################################    HANDLERS    ######################################## */
    /* ############################################################################################ */
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
        const value = element.target.value === 'true' ? true : element.target.value === 'false' ? false : element.target.value;

        setCallData({
            ...callData,
            [element.target.name]: value,
        });
    };

    const handleReminderDataChange = (reminder) => {
        setReminderData([
            ...reminderData,
            reminder,
        ]);
    };



    /* ############################################################################################ */
    /* ####################################    CLEARERS    ######################################## */
    /* ############################################################################################ */
    const clearAssitantForm = () => {
        setAssistantData({
            name: '',
            email: '',
            password: '',
            role: '',
        });

        setPhones({
            phone_number: '',
        });
    };

    const clearBeneficiaryForm = () => {
        setBeneficiaryData({
            name: '',
            first_surname: '',
            second_surname: '',
            dni: '',
            birth_date: '----/--/--',
            social_security_number: '',
            rutine: '',
            gender: '',
            marital_status: '',
            beneficiary_type: '',
        });

        setAddressData({
            locality: '',
            postal_code: '',
            province: '',
            number: '',
            street: '',
            addressable_type: '',
            addressable_id: 0,
        });

        setPhones({
            phone_number: '',
        });
    };

    const clearContactData = () => {
        setContactData({
            name: '',
            first_surname: '',
            second_surname: '',
            contact_type: '',
        });

        setAddressData({
            locality: '',
            postal_code: '',
            province: '',
            number: '',
            street: '',
            addressable_type: '',
            addressable_id: 0,
        });

        setPhones({
            phone_number: '',
        });
    };

    const clearMedicalData = () => {
        setMedicalFormValues({
            beneficiary_id: 0,
            allergies: '',
            illnesses: '',
            morning_medication: '',
            afternoon_medication: '',
            night_medication: '',
            preferent_morning_calls_hour: '--:--',
            preferent_afternoon_calls_hour: '--:--',
            preferent_night_calls_hour: '--:--',
            emergency_room_on_town: '',
            firehouse_on_town: '',
            police_station_on_town: '',
            outpatient_clinic_on_town: '',
            ambulance_on_town: '',
        });
    };

    const clearCallForm = () => {
        setCallData({
            user_id: 0,
            beneficiary_id: 0,
            date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1).toString().padStart(2, '0') + '-' + new Date().getDate().toString().padStart(2, '0'),
            time: new Date().getHours().toString().padStart(2, '0') + ':' + new Date().getMinutes().toString().padStart(2, '0'),
            turn: '',
            duration: 0,
            call_type: '',
            call_kind: '',
            answered_call: false,
            observations: '',
            description: '',
            contacted_112: false,
        });
    };

    const clearReminderForm = () => {
        setReminderData({

        });
    };



    /* ############################################################################################ */
    /* ####################################     RETURN     ######################################## */
    /* ############################################################################################ */
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
                clearAssitantForm, clearBeneficiaryForm, clearCallForm, clearContactData,
                clearMedicalData, clearReminderForm,
            }}
        >
            {children}
        </FormContext.Provider>
    )
}